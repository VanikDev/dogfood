import { HEADER_SETTINGS_TEST_ID } from '../../../src/layout/Header/helpers'
import {
	createProduct,
	getCatalog,
	logout,
	searchProduct,
	signIn,
} from '../utils'

const testProductName = 'Cypress test create product'
describe('Тест-кейс 2:', () => {
	beforeEach(() => {
		signIn()
	})

	it('Пробуем авторизоваться', () => {
		getCatalog()
	})

	it('Пробуем авторизоваться и выйти', () => {
		getCatalog()
		logout()
	})

	it('Авторизуемся, создаем товар, находим товар, ставим лайк, проверяем лайк', () => {
		getCatalog()
		createProduct(testProductName)
		// возвращаемся на главную и ищем созданный товар
		cy.get(`[data-testid=${HEADER_SETTINGS_TEST_ID.LOGO}]`).click()
		getCatalog()
		searchProduct(testProductName)
		// ставим лайк
		cy.contains('p', testProductName).each(($card, index) => {
			if (index === 0) {
				cy.wrap($card)
					.get('[aria-label="Добавить в избранное"]')
					.click()
			}
		})
		// проверяем лайк
		cy.contains('p', testProductName).each(($card, index) => {
			if (index === 0) {
				cy.wrap($card)
					.get('[aria-label="Добавить в избранное"]')
					.should('not.exist')
			}
		})
	})
})
