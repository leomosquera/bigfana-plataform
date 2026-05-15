# BigFana - Design System

## Design Philosophy

BigFana uses a premium cinematic sports-tech visual language.

The interface should feel:

- immersive
- emotional
- modern
- restrained
- elegant
- dark-first
- spacious
- touch-friendly

The visual system combines:

- Apple simplicity
- Airbnb spacing
- Linear consistency
- modern sports broadcast atmosphere
- premium fintech clarity

The interface should never feel:

- noisy
- crowded
- enterprise-heavy
- generic SaaS
- gaming-chaotic
- neon cyberpunk
- Bootstrap-like

---

# Color System

## Philosophy

The UI is neutral-first.

Accent colors are used sparingly to create:

- emotional emphasis
- live moments
- CTA hierarchy
- fan energy

The interface should remain mostly dark and neutral with controlled accent usage.

---

## Core Palette

Base surfaces:

- deep black
- charcoal
- soft dark gradients
- subtle transparent overlays

Text:

- high-contrast white
- soft gray secondary text
- muted tertiary labels

Accent:

- tenant-configurable
- primary action color
- default BigFana accent:
  - cinematic sports red

---

## Important Rules

- Never hardcode colors directly inside components
- Always use tokens or semantic utility classes
- Avoid rainbow UI systems
- Avoid excessive colored cards
- Most surfaces should remain neutral

---

# Surface System

## Philosophy

Surfaces should feel layered and atmospheric.

The interface should create subtle depth without heavy elevation.

The system uses:

- soft gradients
- transparent overlays
- ambient glows
- subtle borders
- inner shadows
- atmospheric lighting

---

## Surface Hierarchy

### Level 0 — Background

Main application background.

Characteristics:

- very dark
- soft gradient variation
- subtle cinematic atmosphere
- minimal noise texture allowed

---

### Level 1 — Base Surfaces

Cards and containers.

Characteristics:

- subtle contrast from background
- low elevation
- soft borders
- soft blur when appropriate

---

### Level 2 — Elevated Surfaces

Sheets, dialogs, overlays, sticky areas.

Characteristics:

- stronger separation
- more blur
- slightly brighter surfaces
- stronger shadow control

---

# Border System

## Philosophy

Borders should be subtle and almost invisible.

Avoid hard separation lines.

Preferred:

- low-opacity white borders
- soft gradients
- edge lighting
- subtle separators

Avoid:

- strong white borders
- thick outlines
- aggressive dividers

---

## Border Opacity

Preferred range:

- white/5
- white/8
- white/10

Only rare cases should exceed that.

---

# Radius System

## Philosophy

BigFana uses large soft radii.

The interface should feel:

- modern
- touch-friendly
- premium

Avoid sharp corners.

---

## Radius Scale

### Cards

- rounded-3xl
- rounded-[28px]
- rounded-[32px]

### Buttons

- rounded-full
- rounded-2xl

### Inputs

- rounded-2xl

### Sheets & Modals

- heavily rounded top corners
- immersive mobile feeling

---

# Typography System

## Philosophy

Typography should feel editorial and premium.

Use strong hierarchy with large contrast between:

- hero headings
- section titles
- metadata
- tertiary labels

Avoid dense text blocks.

---

## Primary Font

- Inter

Possible future additions:

- SF Pro
- Geist

---

## Typography Style

### Hero Titles

Characteristics:

- large
- bold
- tight letter spacing
- emotional
- cinematic

Often:

- mixed opacity
- gradient text
- staggered emphasis

---

### Section Titles

Characteristics:

- clean
- bold
- highly readable
- spacious

---

### Metadata

Characteristics:

- small
- muted
- calm
- readable

---

# Spacing System

## Philosophy

Whitespace is a core part of the design.

The interface should breathe aggressively.

Avoid dense dashboards.

---

## Preferred Scale

Use spacing multiples inspired by Airbnb:

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

---

## Layout Rhythm

Preferred:

- large section spacing
- clean grouping
- visual breathing room
- isolated focal points

Avoid:

- crowded grids
- tiny gaps
- excessive widgets

---

# Shadow System

## Philosophy

Shadows should be soft and cinematic.

Never use aggressive drop shadows.

Preferred depth techniques:

- layered transparency
- subtle inner glow
- ambient lighting
- atmospheric gradients

---

## Shadow Rules

Preferred:

- soft blur shadows
- inset lighting
- low opacity depth

Avoid:

- hard shadows
- floating SaaS cards
- aggressive neumorphism

---

# Glow System

## Philosophy

Glow is emotional emphasis.

Glow should be:

- subtle
- restrained
- atmospheric

Glow should NOT dominate the interface.

---

## Preferred Glow Usage

Allowed for:

- active navigation
- live states
- premium CTA
- featured cards
- matchday hero moments

Avoid:

- glowing everything
- neon gaming UI
- excessive colored bloom

---

# Blur System

## Philosophy

Blur should simulate premium glass surfaces.

Use blur subtly.

Preferred:

- soft glass overlays
- translucent sheets
- cinematic overlays

Avoid:

- extreme frosted glass everywhere
- unreadable transparency

---

# Gradient System

## Philosophy

Gradients should feel atmospheric and cinematic.

Avoid colorful gradients.

Preferred:

- dark red ambient gradients
- black-to-charcoal transitions
- subtle radial highlights

---

# Motion-Aware Design

All surfaces should support motion gracefully.

Hover, transitions, and animated states should feel:

- soft
- physical
- cinematic
- premium

Avoid:

- bouncy interactions
- playful cartoon motion
- flashy transitions

---

# Component Philosophy

Components should feel:

- modular
- reusable
- calm
- premium
- touch-friendly

Avoid:

- crowded cards
- tiny actions
- overly complex UI modules

---

# Dashboard Density Rules

BigFana is NOT a dense enterprise dashboard.

Avoid:

- massive metric grids
- tiny charts everywhere
- spreadsheet layouts
- admin-heavy composition

Prefer:

- storytelling
- featured modules
- emotional hierarchy
- focused sections
- immersive hero moments

---

# Multi-Tenant Design Rules

The design system must support:

- club branding
- configurable accents
- configurable imagery
- configurable themes

Without breaking:

- spacing consistency
- component consistency
- hierarchy
- readability
- premium feel

---

# Quality Standard

Every screen should feel:

- premium
- cinematic
- spacious
- emotional
- polished
- mobile-native
- touch-friendly
- modern sports-tech

If a screen starts feeling like a generic SaaS dashboard, simplify it.