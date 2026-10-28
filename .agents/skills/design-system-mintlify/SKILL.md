---
name: design-system-mintlify
description: Canonical design system rules based on Mintlify. Mandates the dual-mode atmospheric sky/teal gradient aesthetic, signature Mintlify green (#00d4a4), black-pill primary buttons, Inter display typography with tight negative tracking, Geist Mono for code/tags, and clean 12px rounded cards.
---

# Mintlify Design System — Canonical Rules & Architecture

All UI in this codebase must strictly adhere to the **Mintlify Design System** specified in `design.mds/mintlify/DESIGN.md`.

## 1. Core Color Palette

### Signature Brand & Accents
- **Mintlify Mint**: `#00d4a4` — Primary accent for CTAs, active states, checkmarks, and featured borders.
- **Deep Mint**: `#00b48a` — Hover / pressed state for mint buttons.
- **Soft Mint**: `#7cebcb` — Subtle background tint for success confirmations.
- **Brand Tag Blue**: `#3772cf` — For documentation tags, chip badges, and type annotations.
- **Testimonial Coral**: `#f55a3c` — Warm coral used on featured callout / quote surfaces.
- **Brand Error**: `#d45656` — Validation and required field tags.

### Surfaces & Gradients
- **Canvas White**: `#ffffff` — Primary page, card, and background surface.
- **Surface**: `#f7f7f7` — Secondary background, search pills, sidebar active state.
- **Surface Soft**: `#fafafa` — Quieter section backgrounds, accordion panels.
- **Surface Code**: `#1c1c1e` — Dark developer code-block wrapper.
- **Canvas Dark**: `#0a0a0a` — Dark band inversions, promo banners.
- **Atmospheric Sky Hero**: `linear-gradient(to bottom, #87a8c8, #f5e9d8)` — Homepage marketing hero wash.
- **Atmospheric Dark Hero**: `linear-gradient(to bottom, #1a3d4a, #2d5a4f)` — Startup / developer hero band.

### Hairlines & Borders
- **Hairline**: `#e5e5e5` — Standard 1px divider and card border.
- **Hairline Soft**: `#ededed` — Quieter table dividers.
- **Hairline Dark**: `#1f1f1f` — 1px divider on dark surfaces.

### Text Inks
- **Primary Ink**: `#0a0a0a` — Headlines and high-contrast text.
- **Charcoal**: `#1c1c1e` — Primary body copy.
- **Slate**: `#3a3a3c` — Secondary text.
- **Steel**: `#5a5a5c` — Tertiary text, table headers, inactive navigation.
- **Stone**: `#888888` — Captions and muted labels.
- **On Dark**: `#ffffff` — Text on dark hero bands or code blocks.
- **On Dark Muted**: `#b3b3b3` — Metadata on dark surfaces.

---

## 2. Typography Rules

### Font Families
- **Inter**: Mandatory for all UI prose, headings, navigation, button labels, and body text.
- **Geist Mono**: Mandatory for code blocks, inline code, type signatures, and property tags.
- **Never** use uncalibrated fonts or ad-hoc italics.

### Hierarchy & Negative Tracking
- **Hero Display (72px)**: `font-weight: 600`, `line-height: 1.05`, `letter-spacing: -2px`.
- **Display Large (56px)**: `font-weight: 600`, `line-height: 1.10`, `letter-spacing: -1.5px`.
- **Heading 1 (48px)**: `font-weight: 600`, `line-height: 1.10`, `letter-spacing: -1px`.
- **Heading 2 (36px)**: `font-weight: 600`, `line-height: 1.20`, `letter-spacing: -0.5px`.
- **Heading 3 (28px)**: `font-weight: 600`, `line-height: 1.25`, `letter-spacing: 0`.
- **Heading 4 (22px)**: `font-weight: 600`, `line-height: 1.30`.
- **Body Medium (16px)**: `line-height: 1.50`.
- **Body Small (14px)**: `line-height: 1.50`.
- **Code (13px - 14px)**: Geist Mono.

---

## 3. Button Archetypes

1. **Black Pill Button (Primary)**:
   - `bg-[#0a0a0a] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#1c1c1e] transition-all`
2. **Mint Accent Button**:
   - `bg-[#00d4a4] text-[#0a0a0a] rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#00b48a] shadow-[0_4px_20px_rgba(0,212,164,0.25)] transition-all`
3. **Secondary Pill Button**:
   - `border border-[#e5e5e5] bg-white text-[#0a0a0a] rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#f7f7f7] transition-all`
4. **White Pill on Dark Hero**:
   - `bg-white text-[#0a0a0a] rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#f7f7f7] transition-all`

---

## 4. Radius Scale

- **Pill Elements**: `rounded-full` (9999px) for all primary buttons, search pills, and badges.
- **Cards & Containers**: `rounded-xl` (12px) or `rounded-2xl` (16px).
- **Small Chips / Badges**: `rounded-md` (8px) or `rounded-sm` (6px).
