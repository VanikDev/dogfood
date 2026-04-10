import { HEADER_SETTINGS_TEST_ID } from '../../src/layout/Header/helpers'
import { ADD_PRODUCT_SETTINGS_TEST_ID } from '../../src/pages/AddProduct/helpers'
import { SIGN_IN_SETTINGS_TEST_ID } from '../../src/pages/Auth/SignIn/helpers'
import { CATALOG_LIST_SETTINGS_TEST_ID } from '../../src/pages/Catalog/containers/CatalogList/helpers'
import { PATH_NAME } from '../../src/utils/constants'

export const signInSubmit = () => {
	cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.SUBMIT_BTN}]`)
		.should('exist')
		.click()
}

export const signIn = () => {
	cy.visit(PATH_NAME.SIGN_IN)
	cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.EMAIL_FIELD}]`).type(
		'iv_ego@hotmail.com'
	)
	cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.PASSWORD_FIELD}]`).type(
		'hardPass837945$'
	)
	signInSubmit()
}

export const getCatalog = () => {
	cy.get(`[data-testid=${CATALOG_LIST_SETTINGS_TEST_ID.LIST}]`, {}).should(
		'be.visible'
	)
}

export const logout = () => {
	cy.get('[aria-label="Выйти"]').should('exist').click()
}

export const createProduct = (name: string) => {
	cy.get('[aria-label="Профиль"]').click()
	cy.get('button').contains('Добавить товар').click()
	// заполняем форму создания товара
	cy.get('input[name="name"]').type(name)
	cy.get('input[name="price"]').type('100')
	cy.get('input[name="available"]').type('true')
	cy.get('input[name="wight"]').type('100 г')
	cy.get('input[name="description"]').type('demo cypress')
	cy.get('input[name="pictures"]').type(
		'https://react-learning.ru/image-compressed/1.jpg'
	)
	cy.get('input[name="isPublished"]').type('true')
	cy.get(
		`[data-testid=${ADD_PRODUCT_SETTINGS_TEST_ID.SUBMIT_BUTTON}]`
	).click()
}

export const searchProduct = (name: string) => {
	cy.get(`[data-testid=${HEADER_SETTINGS_TEST_ID.SEARCH_INPUT}]`).type(name)
}
