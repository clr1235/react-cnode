module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "commonjs": true,
    "amd": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  // 添加一些自己的规则
  "rules": {
    "react-hooks/exhaustive-deps": 'warn',
    // 允许使用require引入文件
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 允许使用any
    '@typescript-eslint/no-explicit-any': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
  }
}
