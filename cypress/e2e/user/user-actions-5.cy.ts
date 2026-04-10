import { CARD_SETTINGS_TEST_ID } from '../../../src/components/Card/helpers'
import { CATALOG_LIST_SETTINGS_TEST_ID } from '../../../src/pages/Catalog/containers/CatalogList/helpers'
import { signIn } from '../utils'

describe('Тест-кейс 5', () => {
	// По дз это дубль тест-кейса 4
	// Свой тест-кейс: Добавить первый, третий и четвертый товар (по 2 шт.) в корзину и оформить заказ

	it('Добавить первый, третий и четвертый товар (по 2 шт.) в корзину и оформить заказ', () => {
		signIn()
		const catalogList = cy
			.get(`[data-testid=${CATALOG_LIST_SETTINGS_TEST_ID.LIST}]`)
			.children()

		catalogList.each(($card, index) => {
			if (index === 0 || index === 2 || index === 3) {
				cy.wrap($card).within(() => {
					cy.get(
						`[data-testid=${CARD_SETTINGS_TEST_ID.BUTTON}]`
					).dblclick()
				})
			}
		})

		cy.get('[aria-label="Корзина"]').click()
		cy.contains('button', 'Оформить заказ').click()
	})
})
