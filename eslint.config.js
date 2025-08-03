import eslintPluginAstro from "eslint-plugin-astro";
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: "@typescript-eslint/parser", // para TypeScript en Astro
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];
