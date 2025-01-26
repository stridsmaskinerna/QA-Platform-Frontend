import globals from "globals";
import eslintJS from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
    { ignores: ["**/build/**", "**/dist/**"] },
    eslintJS.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            globals: { ...globals.browser },
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        settings: { react: { version: "18.3" } },
        plugins: {
            react,
            "react-hooks": fixupPluginRules(reactHooksPlugin),
            "@typescript-eslint": tseslint.plugin
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooksPlugin.configs.recommended.rules
        }
    },
    {
        // disable type-aware linting on JS files
        files: ["**/*.js", "**/*.mjs"],
        extends: [tseslint.configs.disableTypeChecked]
    },
    reactRefresh.configs.vite,
    prettierConfig // prettierConfig must be last to disable conflicting rules
);
