import { createApi } from '@reduxjs/toolkit/query/react'
import { UpdateUser, User } from '../../model'
import { extendedBaseQuery } from '../helpers/extendedBaseQuery'

export const userSlice = createApi({
	reducerPath: 'user',
	baseQuery: extendedBaseQuery,
	tagTypes: ['user'],
	endpoints: (builder) => ({
		getUserById: builder.query<User, User['_id']>({
			query: (_id) => ({
				url: `/users/${_id}`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
		updateUser: builder.mutation<User, UpdateUser>({
			query: ({ name, about }) => ({
				url: '/users/me',
				method: 'PATCH',
				body: { name, about },
			}),
		}),
	}),
})

export const { useGetUserByIdQuery, useUpdateUserMutation } = userSlice
