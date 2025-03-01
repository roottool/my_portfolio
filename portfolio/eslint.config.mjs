import eslint from '@eslint/js'
import gitignore from 'eslint-config-flat-gitignore'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
// import reactPlugin from 'eslint-plugin-react'
// import hooksPlugin from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	gitignore({ root: true }),
	{
		ignores: ['pnpm-lock.yaml', 'public'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			'jsx-a11y': jsxA11yPlugin,
			'unused-imports': unusedImports,
		},
		settings: {
			'import/resolver-next': [
				createTypeScriptImportResolver({
					alwaysTryTypes: true,
				}),
			],
		},
		rules: {
			...jsxA11yPlugin.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['*.{js,cjs,mjs}'],
		...tseslint.configs.disableTypeChecked,
	},
)
