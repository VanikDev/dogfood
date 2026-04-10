import { HEADER_SETTINGS_TEST_ID } from '../../../src/layout/Header/helpers'
import { DELETE_PRODUCT_SETTINGS_TEST_ID } from '../../../src/pages/DeleteProduct/helpers'
import { createProduct, getCatalog, searchProduct, signIn } from '../utils'

const testProductName = 'Test product 1'
describe('Тест-кейс 6:', () => {
	it('Авторизуемся, создаем и проверяем товар, удаляем и проверяем товар', () => {
		signIn()
		getCatalog()
		createProduct(testProductName)
		searchProduct(testProductName)
		// получаем id товара и удаляем
		cy.get('a[href*="/products/"]').each(($a, index) => {
			if (index === 0) {
				cy.wrap($a)
					.invoke('attr', 'href')
					.then((href) => {
						if (href) {
							const id = href.replace('/products/', '')
							cy.get('[aria-label="Профиль"]').click()
							cy.get('button').contains('Удалить товар').click()
							cy.get(
								`[data-testid=${DELETE_PRODUCT_SETTINGS_TEST_ID.DELETE_PRODUCT}]`
							).should('exist')
							cy.get('input[id="product-id"]').type(id)
							cy.get(
								`[data-testid=${DELETE_PRODUCT_SETTINGS_TEST_ID.SUBMIT_BUTTON}]`
							).click()
						}
					})
			}
		})
		// проверяем что товар удален
		cy.get(`[data-testid=${HEADER_SETTINGS_TEST_ID.SEARCH_INPUT}]`).clear()
		cy.get(`[data-testid=${HEADER_SETTINGS_TEST_ID.LOGO}]`).click()
		getCatalog()
		searchProduct(testProductName)
		cy.contains('p', testProductName).should('not.exist')
	})
})
