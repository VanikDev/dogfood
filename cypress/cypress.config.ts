import { defineConfig } from 'cypress'

if (!process.env.APP_URL) throw new Error('You should set APP_URL env variable')

export default defineConfig({
	e2e: {
		video: false,
		screenshotOnRunFailure: false,
		supportFile: false,
		baseUrl: process.env.APP_URL,
		viewportWidth: 1280,
		viewportHeight: 800,
	},
})

/**
 * Для запуска в интерактивном режиме выполнить команду:
 * APP_URL=http://localhost:8080 yarn run cy:open
 */
