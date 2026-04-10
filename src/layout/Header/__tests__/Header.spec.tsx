import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import React from 'react'
import { setupStore } from '../../../store'
import { renderWithProviders } from '../../../utils/test-utils'
import { HEADER_SETTINGS_TEST_ID } from '../helpers'
import { Header } from '../index'

describe('Тесты для компонента Header', () => {
	let store: ReturnType<typeof setupStore>
	let header: ReturnType<typeof renderWithProviders>
	let headerElement: HTMLElement
	let logo: HTMLElement
	let searchInput: HTMLInputElement
	let iconsGroup: HTMLElement
	beforeEach(() => {
		store = setupStore()
		header = renderWithProviders(
			{ initialRouterEntires: ['/'] },
			<Header />,
			{ store }
		)
	})

	describe('Проверки рендера компонента Header', () => {
		test('Рендер компонента', async () => {
			await waitFor(
				() =>
					(headerElement = screen.getByTestId(
						HEADER_SETTINGS_TEST_ID.HEADER
					))
			)
			expect(headerElement).toBeInTheDocument()
		})

		test('Отображение логотипа', async () => {
			await waitFor(
				() => (logo = screen.getByTestId(HEADER_SETTINGS_TEST_ID.LOGO))
			)
			expect(logo).toBeInTheDocument()
		})

		test('Отображение поиска', async () => {
			await waitFor(
				() =>
					(searchInput = screen.getByTestId(
						HEADER_SETTINGS_TEST_ID.SEARCH_INPUT
					))
			)
			expect(searchInput).toBeInTheDocument()
		})

		test('Отображение группы иконок', async () => {
			await waitFor(
				() =>
					(iconsGroup = screen.getByTestId(
						HEADER_SETTINGS_TEST_ID.GROUP_ICONS
					))
			)
			expect(iconsGroup).toBeInTheDocument()
		})

		test('Снепшот', () => {
			expect(header).toMatchSnapshot()
		})
	})
})
