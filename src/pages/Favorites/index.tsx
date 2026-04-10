import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { withProtection } from '../../HOCs/withProtection'
import { withQuery } from '../../HOCs/withQuery'
import { DefaultTitle, GoBack } from '../../components'
import { Product } from '../../model'
import { useAppDispatch, useAppSelector } from '../../store'
import { credentialsSelector } from '../../store/selectors'
import {
	countersActions,
	useGetProductsQuery,
	useGetUserByIdQuery,
} from '../../store/slices'
import { PAGINATION, defaultErrorMessage } from '../../utils/constants'
import { getMessageFromError } from '../../utils/helpers'
import { CatalogList } from '../Catalog/containers'

export const FavoritesPage: React.FC = withProtection(() => {
	const dispatch = useAppDispatch()
	const { state } = useLocation()
	const { userId } = useAppSelector(credentialsSelector)
	const { data: user, isLoading: userIsLoading } = useGetUserByIdQuery(userId)
	const {
		data,
		isLoading: productsIsLoading,
		isError,
		error,
		refetch,
	} = useGetProductsQuery({ page: PAGINATION.PAGE, limit: PAGINATION.LIMIT })
	const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
	const isLoading = productsIsLoading || userIsLoading

	useEffect(() => {
		if (user && data?.products) {
			const filteredProducts = data.products.filter((product) =>
				product.likes?.some((id) => id === user._id)
			)
			setFavoriteProducts(filteredProducts)
			dispatch(
				countersActions.setFavoritesCounter(filteredProducts.length)
			)
		}
	}, [user, data])

	return (
		<>
			<GoBack path={state.location} />
			<DefaultTitle name={'Избранное'} />
			{withQuery(CatalogList)({
				isError,
				isLoading,
				error: getMessageFromError(error, defaultErrorMessage),
				refetch,
				data: favoriteProducts,
			})}
		</>
	)
})
