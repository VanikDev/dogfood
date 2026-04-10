import { SIGN_IN_SETTINGS_TEST_ID } from '../../../src/pages/Auth/SignIn/helpers'
import { PATH_NAME, VALIDATOR_MESSAGE } from '../../../src/utils/constants'
import { getCatalog, logout, signIn, signInSubmit } from '../utils'

describe('Тест-кейс 3: Авторизуемся (негативный/позитивный), проверяем нахождение пользователя, делаем логаут', () => {
	it('Проверяем доступность формы авторизации', () => {
		cy.visit(PATH_NAME.SIGN_IN)
		cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.FORM}]`).should('exist')
	})

	it('Пробуем отправить пустую форму', () => {
		cy.visit(PATH_NAME.SIGN_IN)
		signInSubmit()
		cy.get(
			`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.EMAIL_FIELD}]`
		).contains(VALIDATOR_MESSAGE.EMAIL_REQUIRED)
		cy.get(
			`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.PASSWORD_FIELD}]`
		).contains(VALIDATOR_MESSAGE.PASSWORD_MIN)
	})

	it('Пробуем ввести невалидные данные', () => {
		cy.visit(PATH_NAME.SIGN_IN)
		cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.EMAIL_FIELD}]`).type(
			'Hello world'
		)
		cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.PASSWORD_FIELD}]`).type(
			'sdfsd'
		)
		signInSubmit()
		cy.get(
			`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.EMAIL_FIELD}]`
		).contains(VALIDATOR_MESSAGE.EMAIL_VALID)
		cy.get(
			`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.PASSWORD_FIELD}]`
		).contains(VALIDATOR_MESSAGE.PASSWORD_MIN)
	})

	it('Авторизуемся и делаем логаут', () => {
		signIn()
		getCatalog()
		logout()
	})
})
