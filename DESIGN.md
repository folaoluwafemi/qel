---
version: alpha
name: Qel-Design-System
description: |
  Qel's design system unites Resend's high-precision developer aesthetic (near-pure inky black canvas, subtle 6–9% atmospheric depth glows, translucent 1px hairline borders, and strict rounded-12px container vocabulary) with Mintlify's iconic editorial elegance (Arizona Flare editorial serif headings). The dark graphite base (#111318 / #000000) is electrified by Qel's signature fiery orange-red accent (#FF4D00 / #ff801f) and soft coral highlights (#FF8360). There is no decorative clutter — just type, visual artifacts, fluid canvases, and atmospheric depth.

colors:
  primary: "#fcfdff"
  primary-on: "#000000"
  ink: "#fcfdff"
  body: "rgba(252,253,255,0.86)"
  charcoal: "rgba(252,253,255,0.7)"
  mute: "#a1a4a5"
  ash: "#888e90"
  stone: "#464a4d"
  on-light: "#000000"
  on-light-mute: "rgba(0,0,51,0.7)"
  
  # Canvas & Surfaces
  canvas: "#111318"             # Qel Dark Charcoal / Inky Graphite
  canvas-pure: "#000000"        # Pure Black Canvas
  surface-card: "#0a0a0c"       # Resend Card Surface
  surface-elevated: "#101012"   # Elevated Modal / Popover Surface
  surface-deep: "#06060a"       # Deep Recessed Area
  surface-light: "#F7F7F9"      # Qel Airy Light Canvas
  
  # Hairlines & Dividers
  hairline: "rgba(255,255,255,0.06)"
  hairline-strong: "rgba(255,255,255,0.14)"
  divider-soft: "rgba(255,255,255,0.04)"
  
  # Brand Accents
  accent-orange: "#FF4D00"      # Qel Fiery Orange-Red Accent
  accent-orange-glow: "rgba(255,77,0,0.22)"
  accent-coral: "#FF8360"       # Qel Soft Coral
  accent-yellow: "#ffc53d"
  accent-blue: "#3b9eff"
  accent-blue-glow: "rgba(0,117,255,0.34)"
  accent-green: "#11ff99"
  accent-green-glow: "rgba(34,255,153,0.18)"

typography:
  # Editorial & Headings (Mintlify Arizona Flare Serif)
  display-xxl:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 96px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.96px
  display-xl:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 76.8px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.768px
  display-lg:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 56px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -1.5px
  heading-1:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -1.0px
  heading-2:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.5px
  heading-3:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.25
  heading-4:
    fontFamily: Arizona Flare, Domaine Display, serif
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.3
    
  # Body & UI Prose (Geist / Inter)
  body-lg:
    fontFamily: Geist, Inter, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Geist, Inter, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.2px
  body-sm:
    fontFamily: Geist, Inter, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Geist, Inter, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    
  # Code & Telemetry (Geist Mono)
  code:
    fontFamily: Geist Mono, monospace
    fontSize: 13px
    lineHeight: 1.6

radii:
  sm: "6px"
  md: "10px"
  lg: "12px"                    # Resend Standard Container Radius
  xl: "16px"
  full: "9999px"

shadows:
  glow-orange: "0 0 32px rgba(255, 77, 0, 0.18)"
  glow-subtle: "0 0 24px rgba(255, 255, 255, 0.04)"
  card: "0 1px 2px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4)"
