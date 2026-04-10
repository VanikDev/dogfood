import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CountersStateProps {
	favoritesCounter: number
}
const initialState: CountersStateProps = {
	favoritesCounter: 0,
}

export const { actions: countersActions, reducer: countersReducer } =
	createSlice({
		name: 'counters',
		initialState,
		reducers: {
			setFavoritesCounter(
				state,
				action: PayloadAction<CountersStateProps['favoritesCounter']>
			) {
				state.favoritesCounter = action.payload
			},
		},
	})
