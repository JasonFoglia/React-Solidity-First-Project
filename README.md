# React + TypeScript + Vite

Getting started:

- Install Truffle **NPM**: `npm install -g truffle`
- Install Truffle **YARN**: `yarn add truffle global`
- Create a new Truffle project: `truffle init`
- In truffle folder: `mkdir client`
- Nav to client folder where we will create React: `cd client`
- Create a new React project: `npx create-react-app my-app --template typescript`
- Install Truffle libraries in your React project: `yarn add @truffle/contract`
- Write your smart contracts and React components
- Deploy your contracts and integrate them with your frontend 
  - `ganache`
  - cd to location of truffle_config.js
  - `truffle compile`
  - `truffle migrate`
  - `truffle test`
  
[Cheat Sheet](SolidityCheatSheet.md)


----

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
