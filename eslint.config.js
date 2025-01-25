import * as globals from "globals";
import eslintJS from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
    { ignores: ["**/build/**", "**/dist/**"] },
    eslintJS.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    {
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            globals: { ...globals.browser },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        // files: ["**/*.{ts,tsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": fixupPluginRules(reactHooksPlugin),
            "@typescript-eslint": tseslint.plugin
        },
        rules: {
            ...reactHooksPlugin.configs.recommended.rules
        }
    },
    {
        // disable type-aware linting on JS files
        files: ["**/*.js"],
        extends: [tseslint.configs.disableTypeChecked]
    },
    reactRefresh.configs.vite,
    prettierConfig // prettierConfig must be last to disable conflicting rules
);
