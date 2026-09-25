# Rabbit Hole

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

## Definition of done

A clean checkout must reproduce the browser demo and itch.io artifact without undocumented local state.
