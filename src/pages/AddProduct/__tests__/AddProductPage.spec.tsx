import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { setupStore } from '../../../store'
import { renderWithProviders } from '../../../utils/test-utils'
import { ADD_PRODUCT_SETTINGS_TEST_ID } from '../helpers'
import { AddProductPage } from '../index'

describe('Тесты для компонента AddProduct', () => {
	let store: ReturnType<typeof setupStore>
	let addProduct: ReturnType<typeof renderWithProviders>
	let addProductForm: HTMLElement
	let submitButton: HTMLElement
	beforeEach(() => {
		store = setupStore()
		addProduct = renderWithProviders(
			{ initialRouterEntires: ['/product/add'] },
			<AddProductPage />,
			{ store }
		)
	})

	describe('Проверки компонента AddProduct', () => {
		describe('Рендер компонента', () => {
			test('Рендер компонента', async () => {
				await waitFor(
					() =>
						(addProductForm = screen.getByTestId(
							ADD_PRODUCT_SETTINGS_TEST_ID.PRODUCT
						))
				)
				expect(addProductForm).toBeInTheDocument()
			})

			test('Снепшот', () => {
				expect(addProduct).toMatchSnapshot()
			})
		})

		describe('Проверки взаимодействия', () => {
			test('Клик кнопки Отправить отзыв', async () => {
				await waitFor(
					() =>
						(submitButton = screen.getByTestId(
							ADD_PRODUCT_SETTINGS_TEST_ID.SUBMIT_BUTTON
						))
				)
				expect(submitButton).toBeInTheDocument()
				await userEvent.click(submitButton)
			})

			test('Изменения поля Название', () => {
				const input = screen.getByLabelText('Название')

				fireEvent.change(input, { target: { value: 'Test name' } })
			})
		})
	})
})
