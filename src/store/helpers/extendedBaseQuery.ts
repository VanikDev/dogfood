import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/constants'
import { RootState } from '../index'

export const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers, { getState }) => {
		const { token } = (getState() as RootState).credentials
		headers.set('Authorization', `Bearer ${token}`)
		return headers
	},
})

export const extendedBaseQuery: typeof baseQuery = async (
	args,
	api,
	extraOptions
) => {
	const result = await baseQuery(args, api, extraOptions)
	// TODO: добавить разлогирование если токен протух
	return result
}
