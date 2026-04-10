import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { setupStore } from '../../../store'
import { renderWithProviders } from '../../../utils/test-utils'
import { ADD_REVIEW_SETTINGS_TEST_ID } from '../helpers'
import { AddReviewPage } from '../index'

describe('Тесты для компонента AddReview', () => {
	let store: ReturnType<typeof setupStore>
	let reviewPage: ReturnType<typeof renderWithProviders>
	let reviewPageForm: HTMLElement | null
	let submitButton: HTMLElement
	beforeEach(() => {
		store = setupStore()
		reviewPage = renderWithProviders(
			{
				initialRouterEntires: ['/user/someId/review'],
			},
			<AddReviewPage />,
			{ store }
		)
	})

	describe('Проверки компонента AddReview', () => {
		describe('Рендер компонента AddReview', () => {
			test('Рендер компонента', async () => {
				await waitFor(
					() =>
						(reviewPageForm = screen.getByTestId(
							ADD_REVIEW_SETTINGS_TEST_ID.REVIEW
						))
				)

				expect(reviewPageForm).toBeInTheDocument()
			})

			test('Снепшот', () => {
				expect(reviewPage).toMatchSnapshot()
			})
		})

		describe('Проверки взаимодействия', () => {
			test('Клик кнопки Отправить отзыв', async () => {
				await waitFor(
					() =>
						(submitButton = screen.getByTestId(
							ADD_REVIEW_SETTINGS_TEST_ID.SUBMIT_BUTTON
						))
				)
				expect(submitButton).toBeInTheDocument()
				await userEvent.click(submitButton)
			})

			test('Изменения поля Комментарий', () => {
				const input = screen.getByLabelText(
					'Поделитесь впечатлениями о товаре'
				)

				fireEvent.change(input, { target: { value: 'Test name' } })
			})
		})
	})
})
