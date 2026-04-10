import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CredentialsStateProps {
	token: string | null
	userId: string | null
}
const initialState: CredentialsStateProps = {
	token: null,
	userId: null,
}

export const { actions: credentialsActions, reducer: credentialsReducer } =
	createSlice({
		name: 'credentials',
		initialState,
		reducers: {
			setToken(
				state,
				action: PayloadAction<CredentialsStateProps['token']>
			) {
				state.token = action.payload
			},
			setUserId(
				state,
				action: PayloadAction<CredentialsStateProps['userId']>
			) {
				state.userId = action.payload
			},
		},
	})
