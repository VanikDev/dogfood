import type { PreloadedState } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { AppStore, RootState, setupStore } from '../store'

interface WrapperForTestsParams {
	initialRouterEntires: string[]
}
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>
	store?: AppStore
}

export function renderWithProviders(
	{ initialRouterEntires }: WrapperForTestsParams,
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren): JSX.Element {
		return (
			<Provider store={store}>
				<MemoryRouter initialEntries={initialRouterEntires}>
					{children}
				</MemoryRouter>
			</Provider>
		)
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// https://redux.js.org/usage/writing-tests
