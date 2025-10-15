// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular selectors
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      // Disable problematic rules
      "no-var": "off", // Allow var declarations
      "@typescript-eslint/no-explicit-any": "off", // Allow any types
      "@typescript-eslint/no-inferrable-types": "off", // Allow explicit type annotations
      "@typescript-eslint/no-empty-function": "off", // Allow empty functions
      "@typescript-eslint/no-unused-vars": "warn", // Warning instead of error
      "@typescript-eslint/no-wrapper-object-types": "off", // Allow Object type
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore
      "@typescript-eslint/consistent-generic-constructors": "off", // Allow generic constructors
      "@typescript-eslint/array-type": "off", // Allow Array<T> syntax
      "@typescript-eslint/no-unused-expressions": "off", // Allow unused expressions
      "@typescript-eslint/no-useless-escape": "off", // Allow escape characters
      "no-useless-escape": "off", // Allow escape characters in general

      // Angular specific
      "@angular-eslint/prefer-inject": "off", // Allow constructor injection
      "@angular-eslint/no-empty-lifecycle-method": "off", // Allow empty lifecycle methods
      "@angular-eslint/use-lifecycle-interface": "warn", // Warning instead of error
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // Disable accessibility rules that are too strict
      "@angular-eslint/template/click-events-have-key-events": "off", // Allow click without key events
      "@angular-eslint/template/interactive-supports-focus": "off", // Allow interactive elements without focus
    },
  }
);
