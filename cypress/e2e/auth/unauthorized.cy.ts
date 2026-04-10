import { SIGN_IN_SETTINGS_TEST_ID } from '../../../src/pages/Auth/SignIn/helpers'
import { PATH_NAME } from '../../../src/utils/constants'

describe('Тетсируем авторизацию пользователя', () => {
	describe('Проверяем действия неавторизованного пользователя', () => {
		// для атомарности тестирования, перед каждым тестом, переходим на главную страницу
		beforeEach(() => {
			cy.visit(PATH_NAME.BASE)
		})

		it('Главная страница доступна', () => {
			cy.contains('Войти')
		})

		it('Проверяем доступность формы авторизации', () => {
			cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.FORM}]`).should(
				'exist'
			)
		})

		it('Проверяем ссылки недоступные неавторизованному пользователю', () => {
			cy.get('a').contains(PATH_NAME.PRODUCTS).should('not.exist')
			cy.get('a').contains(PATH_NAME.FAVORITES).should('not.exist')
			cy.get('a').contains(PATH_NAME.CART).should('not.exist')
			cy.get('a').contains(PATH_NAME.PROFILE).should('not.exist')
		})

		it('Проверяем что защищенная страница недоступна неавторизованному пользователю', () => {
			cy.visit(PATH_NAME.FAVORITES)
			cy.get(`[data-testid=${SIGN_IN_SETTINGS_TEST_ID.FORM}]`)
		})
	})
})
