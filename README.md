# Rabbit Hole

## Loptr Lab mission and participation

Loptr Lab is a pre-seed, people-over-profit, accessibility-first venture working toward a self-sustaining model within a capitalist economy. Money sustains the work; meaningful change for people is its purpose. We accept funding only on terms that keep people and accessibility first. Our long-term vision includes universal basic income. We aim to bring change to life and leave a transparent record of what we tried, what worked, and what failed so others can carry it forward. This mission governs our projects, funding decisions, and partnerships; it is not a temporary marketing position.

Current open review and contribution opportunities are voluntary and unpaid. Before work begins, agree in writing on scope, time, what will be public, credit preferences, and an exit path. You can stop at any point. Participation does not promise employment, ownership, revenue share, academic credit, or future pay. Any paid commission or other formal arrangement requires a separate signed agreement before work begins. External assistance or benefits belong to the participant and are not compensation from Loptr Lab.

Financial support is optional and sustains infrastructure, maintenance, accessibility work, and documented development. Paying does not buy contributor status, canon authority, approvals, ownership, or employment. Participation and accessibility are not sponsorship rewards. Project-specific licenses and existing signed agreements continue to apply.

[Full mission and participation terms](https://github.com/ibloud/ibloud.github.io/blob/main/MISSION.md).


A three-room interactive narrative prototype designed as a portable content/runtime demonstration.

## Architecture

- **GitHub** — source, collaboration, CI, Pages demo
- **Sanity** — structured narrative/content source
- **Shopify** — optional product references; commerce remains decoupled
- **itch.io** — packaged playable distribution

## Rooms

1. Seven Sins
2. Sick Boi
3. Money Game Pt. 3

The runtime accepts normalized room data from local JSON fixtures or a Sanity adapter. The demo does not require a live Sanity project.

## Commerce concept

The experience includes an optional concept-site support route at `products/ren-rabbit-hole-black-hoodie/`. That route does not proxy checkout; it points outward to the verified official Ren merchandise product destination. The product path is deliberately presented as an optional support choice alongside the music and narrative, not as a claim that commerce resolves the project's themes.

## Provenance and AI disclosure

AI was used during development for code, narrative drafting, research assistance, and source-link verification. AI output is not evidence of artist intent, permission, affiliation, endorsement, or ownership. See [AI-USE-DISCLOSURE.md](AI-USE-DISCLOSURE.md) for the full production and correction record.

## Definition of done

A clean checkout must reproduce the browser demo and itch.io artifact without undocumented local state.
