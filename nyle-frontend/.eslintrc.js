module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "@next/next/no-document-import-in-page": "off",
    "@next/next/no-head-import-in-document": "off",
    "react/no-unknown-property": "off"
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "build/",
    "next-env.d.ts",
  ],
};
