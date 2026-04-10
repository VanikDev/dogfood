import {
	PreloadedState,
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
	authSlice,
	cartReducer,
	countersReducer,
	credentialsReducer,
	productSlice,
	productsSlice,
	userSlice,
} from './slices'

const rootReducer = combineReducers({
	[authSlice.reducerPath]: authSlice.reducer,
	cart: cartReducer,
	counters: countersReducer,
	credentials: credentialsReducer,
	[productsSlice.reducerPath]: productsSlice.reducer,
	[productSlice.reducerPath]: productSlice.reducer,
	[userSlice.reducerPath]: userSlice.reducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState: preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				authSlice.middleware,
				productsSlice.middleware,
				productSlice.middleware,
				userSlice.middleware
			),
		devTools: process.env.NODE_ENV !== 'production',
	})
}
export const store = setupStore({})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
