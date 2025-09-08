/** @type {import("jest").Config} **/
module.exports = {
	preset: 'ts-jest/presets/default',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: './tsconfig.json',
		}],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/lib/$1',
	}
};