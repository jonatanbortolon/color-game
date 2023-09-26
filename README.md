# Color game

This is a simple game where you must choose correct color HEX to match what you see in square make for a mid frontend developer test.


## Rules
   -  The game has 3 difficulties:
      -  Easy: You have 3 options to choose
      -  Medium: You have 4 options to choose
      -  Hard: You have 5 options to choose
   - When you choose wrong you lost 1 point
   - When you doesn't choose you lost 2 points
   - When you choose right you win 5 points

## Stack
   -  [Vite](https://vitejs.dev)
   -  [React.js](https://react.dev)
   -  [TailwindCSS](https://tailwindcss.com)
   -  [Vitest](https://vitest.dev)

## Run locally

First yout need to clone this project

```bash
git clone git@github.com:jonatanbortolon/color-game.git
```

then navigate to project folder and install Node dependencies

```bash
npm i

# Or
yarn

# Or
pnpm i

# Or
bun i
```

now you can run the project with

```bash
npm run dev

# Or
yarn dev

# Or
pnpm run dev

# Or
bun run dev
```

and you can access project at http://localhost:5173.

## Run tests

To start tests just run

```bash
npm run test:unit

# Or
yarn test:unit

# Or
pnpm run test:unit

# Or
bun run test:unit
```