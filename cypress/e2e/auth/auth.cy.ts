import { SIGN_IN_SETTINGS_TEST_ID } from '../../../src/pages/Auth/SignIn/helpers'
import { PATH_NAME, VALIDATOR_MESSAGE } from '../../../src/utils/constants'
import { getCatalog, signIn, signInSubmit } from '../utils'

describe('Проверяем авторизацию пользователя', () => {
	beforeEach(() => {
		cy.visit(PATH_NAME.SIGN_IN)
	})

	it('Проверяем доступность формы авторизации', () => {
		cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.FORM}]`).should('exist')
	})

	it('Пробуем отправить пустую форму', () => {
		signInSubmit()
		cy.get(
			`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.EMAIL_FIELD}]`
		).contains(VALIDATOR_MESSAGE.EMAIL_REQUIRED)
		cy.get(
			`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.PASSWORD_FIELD}]`
		).contains(VALIDATOR_MESSAGE.PASSWORD_MIN)
	})

	it('Пробуем ввести невалидные данные', () => {
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

	it('Пробуем авторизоваться', () => {
		signIn()
		getCatalog()
	})
})
