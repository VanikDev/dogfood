import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import React from 'react'
import { setupStore } from '../../../store'
import { renderWithProviders } from '../../../utils/test-utils'
import { FOOTER_SETTINGS_TEST_ID } from '../helpers'
import { Footer } from '../index'

describe('Тесты для компонента Footer', () => {
	let store: ReturnType<typeof setupStore>
	let footer: ReturnType<typeof renderWithProviders>
	let footerElement: HTMLElement
	let logo: HTMLElement
	let iconsGroup: HTMLElement
	beforeEach(() => {
		store = setupStore()
		footer = renderWithProviders(
			{ initialRouterEntires: ['/'] },
			<Footer />,
			{ store }
		)
	})

	describe('Проверки рендера компонента Footer', () => {
		test('Рендер компонента', async () => {
			await waitFor(
				() =>
					(footerElement = screen.getByTestId(
						FOOTER_SETTINGS_TEST_ID.FOOTER
					))
			)
			expect(footerElement).toBeInTheDocument()
		})

		test('Отображение логотипа', async () => {
			await waitFor(
				() => (logo = screen.getByTestId(FOOTER_SETTINGS_TEST_ID.LOGO))
			)
			expect(logo).toBeInTheDocument()
		})

		test('Отображение группы иконок', async () => {
			await waitFor(
				() =>
					(iconsGroup = screen.getByTestId(
						FOOTER_SETTINGS_TEST_ID.GROUP_ICONS
					))
			)
			expect(iconsGroup).toBeInTheDocument()
		})

		test('Снепшот', () => {
			expect(footer).toMatchSnapshot()
		})
	})
})
