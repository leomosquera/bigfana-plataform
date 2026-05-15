# BigFana - AGENTS.md

## Role

You are working on BigFana, a premium sports-tech fan engagement platform.

Before making UI or UX decisions, read and follow:

- docs/PRODUCT_VISION.md
- docs/DESIGN_SYSTEM.md
- docs/LAYOUT_SYSTEM.md
- docs/COMPONENT_GUIDE.md
- docs/UX_RULES.md
- docs/MOTION_SYSTEM.md

These files define the product direction, visual system, layout rules, reusable components, mobile-first UX behavior, and motion language.

## Product Summary

BigFana is a premium fan engagement platform for sports clubs and fan communities.

It combines:

- fan engagement
- loyalty
- gamification
- rewards
- matchday experiences
- sponsor activations
- wallet systems
- QR access
- community interactions
- sports analytics
- club-branded mobile experiences

The product should feel like a premium fan operating system.

## Experience References

The experience should feel inspired by:

- Airbnb for spacing, forms, sheets, flows, and mobile UX
- Wise for fintech clarity, wallet patterns, and clean transactional UI
- Apple for restraint, hierarchy, simplicity, and polish
- Linear for structure, consistency, and component discipline
- MLS / sports apps for matchday modules
- Paramount+ / cinematic sports media for emotional hero moments

It should NOT feel like:

- a traditional admin dashboard
- an ERP system
- a Bootstrap template
- a generic SaaS dashboard
- a noisy gaming interface
- a fantasy sports betting app

## Core UX Principles

- Mobile-first always
- Web app experience, not desktop dashboard first
- Massive whitespace
- Premium minimalism
- Cinematic emotional moments
- Clear visual hierarchy
- Human-centered UX
- Fast scanning
- Large touch targets
- Minimal borders
- Soft depth
- Large rounded corners
- Progressive disclosure
- One primary action per screen

## Visual Direction

Base style:

- dark premium
- black / white / red
- cinematic sports atmosphere
- controlled glow
- glass-like surfaces
- emotional hero areas
- clean functional cards

The platform must support tenant customization:

- primary color must be token-based
- accent color must be configurable per club
- hero images must be configurable per club
- background mode should support dark-first today and light mode later

Never hardcode brand colors directly in components.

## Technical Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion
- Lucide icons

## Important Technical Rule

This project uses a modern version of Next.js.

Before writing or changing Next.js-specific code, check the relevant current documentation available in the project when needed.

Avoid outdated assumptions about routing, server/client components, metadata, cookies, dynamic routes, or app directory behavior.

## Development Rules

- Use design tokens only
- Reuse existing components whenever possible
- Avoid duplicated components
- Keep components composable
- Keep UI logic separated from mock data when reasonable
- Prefer simple, readable code
- Avoid overengineering
- Avoid introducing unnecessary dependencies
- Preserve mobile-first behavior

## UI Rules

- Do not create dense dashboard layouts
- Do not overload screens with too many metrics
- Do not add excessive glow
- Do not use tiny desktop interactions for mobile flows
- Do not use small click targets
- Do not use generic SaaS patterns unless adapted to BigFana
- Prefer bottom sheets, cards, segmented controls, carousels, sticky CTAs, and large touch areas

## Current Product Direction

BigFana is being built as a web app.

Desktop should feel like an expanded version of the mobile experience, not the other way around.

The first goal is to establish:

- app shell
- sidebar
- mobile bottom navigation
- UI kit
- reusable components
- premium card system
- modal and sheet system
- form system
- carousel system
- wallet / QR / rewards patterns
- profile patterns
- benefit and sponsor patterns

Then screens will be built page by page.

## Quality Bar

Every screen should feel:

- premium
- polished
- spacious
- emotional
- usable
- mobile-native
- club-brandable
- ready for demo

If something feels like a generic dashboard, simplify it and make it more cinematic, human, and mobile-first.