# QA-Platform-Frontend

## Folder structure
![frontend_package_diagram](https://github.com/user-attachments/assets/1bb7a4b0-1c12-4b31-b647-7ae8c58029b6)

## CSS Usage
- We use CSS modules in this project to avoid class naming conflicts (see this [guide](https://medium.com/@ralph1786/using-css-modules-in-react-app-c2079eadbb87) for how to use)
  Short version:
  ```
  // Button.module.css
  
  .error {
  background-color: red
  }
  ```
  ```
  //Button.tsx
  
  import React from "react";

  import styles from "./Button.module.css"

  export function Button() {
    return <button className={styles.error}>Error<button>;
  ```
- Global CSS vars are found in global.css in the src-folder

## Formatting
- We use [Prettier](https://prettier.io/) in this project for code formatting. The vs-code extension "prettier - code formatter" is needed to adhere to the rules in .prettierrc.json in the root folder.








# React + TypeScript + Vite

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

