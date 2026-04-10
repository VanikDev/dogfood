import { createApi } from '@reduxjs/toolkit/query/react'
import {
	Product,
	ProductQueryParams,
	Products,
	ProductsQueryParams,
} from '../../model'
import { extendedBaseQuery } from '../helpers/extendedBaseQuery'

export const productsSlice = createApi({
	reducerPath: 'products',
	baseQuery: extendedBaseQuery,
	tagTypes: ['products'],
	endpoints: (builder) => ({
		getProducts: builder.query<Products, ProductsQueryParams>({
			query: (params) => ({
				url: '/products/',
				method: 'GET',
				params: { ...params },
			}),
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName
			},
			merge: (currentCache, newValue, { arg: { page } }) => {
				if (page === 1) return
				currentCache.products.push(...newValue.products)
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg
			},
			providesTags: ['products'],
		}),
		deleteProduct: builder.mutation<Product, string>({
			query: (_id) => ({
				url: `/products/${_id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => [
				{ type: 'products', _id: result?._id },
				{ type: 'products', id: 'PARTIAL-LIST' },
			],
		}),
		addLikeProduct: builder.mutation<Product, ProductQueryParams>({
			query: ({ _id }) => ({
				url: `/products/likes/${_id}`,
				method: 'PUT',
			}),
			/**
			 * Позитивное обновление кеша чтобы не ломалось добавление/удаление лайка
			 * */
			async onQueryStarted(
				{ _id, userId }: ProductQueryParams,
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					productsSlice.util.updateQueryData(
						'getProducts',
						// TODO: почему то в документации именно так указано, попробовать избавиться от переписывания
						_id as ProductsQueryParams,
						(draft: Products) => {
							const product = draft.products.find(
								(product) => product._id === _id
							)
							if (product) {
								product?.likes?.push(userId)
							}
						}
					)
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),
		deleteLikeProduct: builder.mutation<Product, ProductQueryParams>({
			query: ({ _id }) => ({
				url: `/products/likes/${_id}`,
				method: 'DELETE',
			}),
			/**
			 * Позитивное обновление кеша чтобы не ломалось добавление/удаление лайка
			 * */
			async onQueryStarted(
				{ _id, userId }: ProductQueryParams,
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					productsSlice.util.updateQueryData(
						'getProducts',
						// TODO: почему то в документации именно так указано, попробовать избавиться от переписывания
						_id as ProductsQueryParams,
						(draft: Products) => {
							const product = draft.products.find(
								(product) => product._id === _id
							)
							if (product) {
								product.likes = product?.likes?.filter(
									(product) => product !== userId
								)
							}
						}
					)
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),
		searchProducts: builder.query<Products, string | undefined>({
			query: (searchtemplate) => ({
				url: '/products/',
				method: 'GET',
				params: { page: '1', limit: '16', query: searchtemplate },
			}),
			providesTags: ['products'],
		}),
	}),
})

export const {
	useGetProductsQuery,
	useDeleteProductMutation,
	useAddLikeProductMutation,
	useDeleteLikeProductMutation,
	useSearchProductsQuery,
} = productsSlice
