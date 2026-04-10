import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResetPassResponse, SignInReponse, SignUpResponse } from '../../model'
import { ResetPassValues } from '../../pages/Auth/ResetPass/helpers'
import { SignInValues } from '../../pages/Auth/SignIn/helpers'
import { SignUpValues } from '../../pages/Auth/SignUp/helpers'
import { API_URL } from '../../utils/constants'

export const authSlice = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['auth'],
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpValues>({
			query: (values) => ({
				url: '/signup/',
				method: 'POST',
				body: { ...values },
			}),
			invalidatesTags: ['auth'],
		}),
		signIn: builder.mutation<SignInReponse, SignInValues>({
			query: (values) => ({
				url: '/signin/',
				method: 'POST',
				body: { ...values },
			}),
			invalidatesTags: ['auth'],
		}),
		resetPass: builder.mutation<ResetPassResponse, ResetPassValues>({
			query: (values) => ({
				url: '/forgot-password/',
				method: 'POST',
				body: { ...values },
			}),
			invalidatesTags: ['auth'],
		}),
	}),
})

export const { useSignUpMutation, useSignInMutation, useResetPassMutation } =
	authSlice
