# QA-Platform-Frontend

## Development requirements

- Node version 20

- Npm version 10

## Run Application

- **For Development**: `npm run dev`

- **For Production/Staging (Nginx, Application)**: `docker compose up -d`


## Folder structure
![frontendPaketDiagram](https://github.com/user-attachments/assets/9305b618-36f2-4772-89c6-0ffcf2e18dcc)



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
  }
  ```
- Global CSS vars are found in global.css in the src-folder

## Formatting
- We use [Prettier](https://prettier.io/) in this project for code formatting. The vs-code extension "prettier - code formatter" is needed to adhere to the rules in .prettierrc.json in the root folder.
- Want to change a format [option](https://prettier.io/docs/en/options)? Go to .prettierrc.json and change/add/remove the rule you want. Then: ``npx prettier . --write`` to apply the rule across the whole project. Be mindful of how this affects others in the project.
- Use .prettierignore to [exclude files or folders to format](https://prettier.io/docs/en/ignore).

## Language support
We use [i18n](https://react.i18next.com/) to handle UI-texts and languages. [Here](https://medium.com/@devpedrodias/how-to-use-i18n-in-your-react-app-1f26deb2a3d8) is a short guide for setup and usage. Long story short we put all UI text in json files (en.json and eventually sv.json for english and swedish language respectively) in the locale folder. To use a text string using i18n:
```
// en.json
{
  "translation": {
  "login": "Login"
  }
}
```


```
//Some component
 export function Button() {
    const { t } = useTranslation();
    return <button className={styles.error}>{t("login")}<button>;
  }
```








# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the
configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

- Replace `tseslint.configs.recommended` to
  `tseslint.configs.recommendedTypeChecked` or
  `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install
  [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
  update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
    // Set the react version
    settings: { react: { version: "18.3" } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
    },
});
```
