import { createApi } from '@reduxjs/toolkit/query/react'
import { AddProduct, AddReview, DeleteReview, Product } from '../../model'
import { extendedBaseQuery } from '../helpers/extendedBaseQuery'

export const productSlice = createApi({
	reducerPath: 'product',
	baseQuery: extendedBaseQuery,
	tagTypes: ['product'],
	endpoints: (builder) => ({
		getProduct: builder.query<Product, Product['_id'] | undefined>({
			query: (_id) => ({
				url: `/products/${_id}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 1,
			providesTags: ['product'],
		}),
		addProduct: builder.mutation<Product, AddProduct>({
			query: (product) => ({
				url: '/products/',
				method: 'POST',
				body: { ...product },
			}),
			invalidatesTags: ['product'],
		}),
		addReview: builder.mutation<Product, AddReview>({
			query: ({ _id, rating, text }) => ({
				url: `/products/review/${_id}`,
				method: 'POST',
				body: { rating, text },
			}),
			invalidatesTags: ['product'],
		}),
		deleteReview: builder.mutation<Product, DeleteReview>({
			query: ({ productId, reviewId }) => ({
				url: `/products/review/${productId}/${reviewId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['product'],
		}),
	}),
})

export const {
	useGetProductQuery,
	useAddProductMutation,
	useAddReviewMutation,
	useDeleteReviewMutation,
} = productSlice
