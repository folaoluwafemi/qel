/**
 * OG Auth SSO Client Integration for Qel
 * Interacts with https://og-auth.folabuilds.workers.dev
 */

const OG_AUTH_URL = "https://og-auth.folabuilds.workers.dev";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
}

/**
 * Parses JWT payload without external library
 */
function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

/**
 * Checks for session token from URL callback, localStorage, or cookies
 */
export function getAuthSession(): { token: string | null; user: AuthUser | null } {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  // 1. Check for token passed back from OG Auth redirect query params (?token=... or ?session=...)
  const params = new URLSearchParams(window.location.search);
  const callbackToken = params.get("token") || params.get("session");
  const callbackEmail = params.get("email");
  const callbackName = params.get("name");
  const callbackId = params.get("id");

  if (callbackToken) {
    localStorage.setItem("og_auth_token", callbackToken);
    if (callbackEmail) {
      localStorage.setItem("og_auth_user", JSON.stringify({
        id: callbackId || "user_owner",
        email: callbackEmail,
        name: callbackName || callbackEmail.split("@")[0],
      }));
    }
    // Clean up URL without reloading
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  // 2. Retrieve from localStorage
  const token = localStorage.getItem("og_auth_token");
  if (!token) {
    // Check if session cookie exists
    const match = document.cookie.match(/better-auth\.session_token=([^;]+)/);
    if (match) {
      return {
        token: match[1],
        user: { id: "user_session", email: "user@ogment.inc", name: "OG Member" },
      };
    }
    return { token: null, user: null };
  }

  // 3. Decode user profile from localStorage or JWT payload
  let savedUser: AuthUser | null = null;
  const savedUserJson = localStorage.getItem("og_auth_user");
  if (savedUserJson) {
    try {
      savedUser = JSON.parse(savedUserJson);
    } catch {}
  }

  const payload = parseJwt(token);
  const user: AuthUser = {
    id: savedUser?.id || payload?.sub || payload?.id || "user_owner",
    email: savedUser?.email || payload?.email || "user@ogment.inc",
    name: savedUser?.name || payload?.name || payload?.user?.name || (savedUser?.email ? savedUser.email.split("@")[0] : "OG Member"),
    avatarUrl: savedUser?.avatarUrl || payload?.image || payload?.picture,
  };

  return { token, user };
}

/**
 * Redirects the user to OG Auth login page with return URL
 */
export function redirectToOgAuth(returnPath: string = "/app") {
  if (typeof window === "undefined") return;

  const currentOrigin = window.location.origin;
  const redirectTarget = encodeURIComponent(`${currentOrigin}${returnPath}`);
  window.location.href = `${OG_AUTH_URL}/login?redirectTo=${redirectTarget}`;
}

/**
 * Clears the session and signs out
 */
export function signOut(returnPath: string = "/") {
  if (typeof window === "undefined") return;

  localStorage.removeItem("og_auth_token");
  localStorage.removeItem("og_auth_user");
  document.cookie = "better-auth.session_token=; Max-Age=0; path=/;";
  window.location.href = returnPath;
}
