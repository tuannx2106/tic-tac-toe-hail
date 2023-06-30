### Tic tac toe game

## Tech Stack

- Node v18.14.2
- React v18
- Typescript v4

## Start the project

```bash
yarn start
```

preview on localhost:3000

## Questions

- How much time did you spend on the challenge?
  - A: around 8 hours
- What would you improve if you had more time to spend on this coding challenge?
  - I would add more unit tests
  - Make it mobile friendly
  - Add more animations, make it feel smoother (maybe with framer-motion lib)
  - Considerately handle more edge cases like:
    - overflow content in game stats. If player 1 wins more than 1 million times, the text will overflow the box
    - confirm again about why in flow 3, player 1 is O. But in flow 4, player 1 is X.

## Folder structure

For the sake of simple, this folder structure is specific to this project only.

```
.src
.
├── app (where App.tsx live)
├── components (all components in here)
├── styles (for global style)
├── types (for Typescript type)
├── index.tsx
```
