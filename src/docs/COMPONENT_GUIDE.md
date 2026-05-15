# BigFana - Component Guide

# Component Philosophy

BigFana components should feel:

- premium
- cinematic
- touch-friendly
- modern
- modular
- spacious
- emotional but restrained

Components should prioritize:

- clarity
- hierarchy
- breathing room
- touch ergonomics
- reuse
- scalability

Avoid:

- tiny controls
- enterprise density
- generic SaaS widgets
- visual clutter
- aggressive borders
- overdesigned gaming UI

---

# Buttons

## Philosophy

Buttons should feel:

- strong
- confident
- premium
- touch-native

Buttons are large, soft, and highly readable.

---

## Button Types

### Primary

Used for:
- primary CTA
- buy ticket
- redeem reward
- participate
- join live

Characteristics:

- strong hierarchy
- rounded-full or rounded-2xl
- emotional accent color
- subtle glow allowed
- large padding

---

### Secondary

Used for:
- secondary actions
- navigation actions
- contextual interactions

Characteristics:

- softer surfaces
- neutral backgrounds
- subtle borders

---

### Ghost

Used for:
- toolbar actions
- overlays
- lightweight actions

Characteristics:

- minimal visual weight
- transparent background
- soft hover

---

### Live Buttons

Used for:
- live match actions
- watch now
- join live

Characteristics:

- subtle pulse
- live indicators
- emotional emphasis

---

## Button Sizes

Preferred:

- large mobile-friendly heights
- minimum 44px
- preferred 48-56px

Avoid small desktop buttons.

---

# Cards

## Philosophy

Cards are one of the core building blocks of BigFana.

Cards should feel:

- layered
- premium
- immersive
- touchable
- spacious

Avoid repetitive SaaS card grids.

---

## Card Types

### Default Card

General content container.

Used for:
- feed items
- profile modules
- content sections

---

### Hero Card

Used for:
- featured match
- sponsor campaigns
- emotional storytelling

Characteristics:

- immersive media
- cinematic overlays
- large spacing
- layered gradients

---

### Match Card

Used for:
- live matches
- fixtures
- scores
- upcoming events

Characteristics:

- strong score hierarchy
- club branding
- live indicators
- compact but breathable

---

### Reward Card

Used for:
- fan rewards
- benefits
- redeemables
- loyalty items

Characteristics:

- emotional highlights
- premium feel
- strong CTA hierarchy

---

### Wallet Card

Used for:
- QR access
- balance
- points
- passes
- digital membership

Characteristics:

- fintech-inspired
- clean typography
- secure feeling
- subtle glass surfaces

---

### Sponsor Card

Used for:
- sponsor offers
- campaigns
- benefits
- branded experiences

Characteristics:

- controlled branding
- premium integrations
- non-intrusive promotion

---

# Inputs

## Philosophy

Inputs should feel:

- spacious
- modern
- mobile-native
- low-stress

Inspired by:

- Airbnb
- Wise
- Apple onboarding

---

## Input Rules

Preferred:

- large height
- soft borders
- large touch area
- clear labels
- strong focus states

Avoid:

- tiny fields
- dense enterprise forms
- overly technical layouts

---

## Input Types

Support:

- text
- search
- email
- phone
- OTP
- password
- segmented input
- selects
- search overlays
- command palette search

---

# Switches & Controls

## Philosophy

BigFana heavily uses modern mobile controls.

Preferred:

- switches
- pills
- segmented controls
- chips
- toggles

Avoid:

- tiny radio buttons
- small checkboxes

---

# Segmented Controls

Used for:

- tabs
- filters
- mode switching
- match sections
- stats views

Characteristics:

- soft surfaces
- large touch targets
- animated transitions

---

# Chips & Pills

Used for:

- filters
- categories
- tags
- live labels
- match states
- fan interests

Characteristics:

- rounded-full
- subtle hierarchy
- touch-friendly

---

# Bottom Sheets

## Philosophy

Bottom sheets are core interaction components.

They should feel:

- immersive
- cinematic
- layered
- native-like

---

## Common Uses

- filters
- ticket purchase
- reward redemption
- settings
- live stats
- fan interactions
- onboarding
- quick actions

---

# Modal System

## Philosophy

Modals should feel:

- calm
- premium
- spacious
- focused

Avoid small crowded popups.

---

# Date Pickers

## Philosophy

Date selection must feel mobile-native.

Preferred:

- bottom sheet calendars
- wheel pickers
- fullscreen mobile selection
- segmented quick selections

Avoid:

- tiny desktop calendars
- enterprise calendar widgets

---

# Carousel System

## Philosophy

Carousels are critical to the platform experience.

Used for:

- matches
- rewards
- sponsors
- players
- stories
- merch
- highlights
- live content

---

## Carousel Rules

Preferred:

- swipe-native
- snap scrolling
- momentum feel
- large cards
- immersive spacing

Avoid:

- tiny arrows
- overcrowded rails

---

# Navigation Components

## Mobile Navigation

Should feel:

- native-like
- thumb-friendly
- immersive

Preferred:

- bottom navigation
- floating actions
- sticky CTA

---

## Sidebar

Desktop sidebar should feel:

- lightweight
- premium
- modern
- minimal

Avoid:

- enterprise navigation trees
- excessive separators
- crowded nav groups

---

# Tables & Lists

## Philosophy

BigFana is not a spreadsheet product.

Prefer:

- list cards
- grouped rows
- visual modules
- expandable details

Avoid:

- giant enterprise tables
- dense admin grids

---

# Match Components

Core sports modules include:

- scoreboards
- lineups
- player cards
- live timelines
- match stats
- fan pulse
- live indicators
- standings
- fixtures

These should feel:

- broadcast-inspired
- modern
- immersive
- premium

---

# Fan Engagement Components

Core fan modules include:

- trivia
- predictions
- challenges
- rankings
- streaks
- achievements
- voting
- reactions
- missions

These should feel:

- emotional
- exciting
- premium
- non-gaming

---

# Commerce Components

Commerce modules include:

- ticket cards
- merch cards
- sponsor offers
- wallet modules
- QR passes
- checkout flows

Inspired by:

- Apple Wallet
- Airbnb checkout
- modern fintech apps

---

# Empty States

Empty states should feel:

- guided
- emotional
- premium
- useful

Avoid generic placeholders.

---

# Loading States

Preferred:

- skeletons
- shimmer
- progressive reveal
- soft ambient loading

Avoid:

- excessive spinners
- blocking overlays

---

# Toasts & Feedback

Feedback should feel:

- soft
- premium
- immediate
- calm

Avoid aggressive alerts.

---

# Motion Rules

All components should support:

- soft hover
- smooth transitions
- opacity fades
- subtle elevation
- cinematic movement

Avoid:

- bouncing
- flashy motion
- gaming animation

---

# Reusability Rules

Before creating a new component:

- check if an existing pattern already solves the problem
- extend existing components when possible
- preserve spacing consistency
- preserve hierarchy consistency

Avoid creating duplicate UI patterns.

---

# Final Component Standard

Every component should feel:

- premium
- spacious
- reusable
- touch-native
- cinematic
- scalable
- emotionally polished

If a component feels like generic SaaS UI,
simplify it and make it feel more immersive and modern.