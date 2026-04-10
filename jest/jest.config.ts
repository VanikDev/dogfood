import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest/presets/js-with-ts',
	clearMocks: true,
	automock: false,
	rootDir: process.env.PWD,
	resetMocks: false,
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'@root(.*)$': '<rootDir>/src/$1',
	},
	setupFiles: ['<rootDir>/jest/setupJest.ts'],
}
export default config
