import { CATALOG_LIST_SETTINGS_TEST_ID } from '../../../src/pages/Catalog/containers/CatalogList/helpers'
import { signIn } from '../utils'

describe('Тест-кейс 4:', () => {
	beforeEach(() => {
		signIn()
	})

	it('Ставим и проверяем лайки у третьего и шестого товара', () => {
		const catalogList = cy
			.get(`[data-testid=${CATALOG_LIST_SETTINGS_TEST_ID.LIST}]`)
			.children()

		catalogList.each(($card, index) => {
			if (index === 2 || index === 5) {
				cy.wrap($card).within(() => {
					cy.get('[aria-label="Добавить в избранное"]').click()
					cy.get('[aria-label="Добавить в избранное"]').should(
						'not.exist'
					)
				})
			}
		})
		// ждем обработку запросов
		cy.wait(3000)
	})

	it('Снимаем и проверяем лайки у третьего и шестого товар', () => {
		const catalogList = cy
			.get(`[data-testid=${CATALOG_LIST_SETTINGS_TEST_ID.LIST}]`)
			.children()

		catalogList.each(($card, index) => {
			if (index === 2 || index === 5) {
				cy.wrap($card).within(() => {
					cy.get('[aria-label="Убрать из избранного"]').click()
					cy.get('[aria-label="Убрать из избранного"]').should(
						'not.exist'
					)
				})
			}
		})
	})
})
