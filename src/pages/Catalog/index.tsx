import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { withProtection } from '../../HOCs/withProtection'
import { withQuery } from '../../HOCs/withQuery'
import { LoadMore, SearchResultMessage } from '../../components'
import { Product } from '../../model'
import { useAppDispatch, useAppSelector } from '../../store'
import { credentialsSelector } from '../../store/selectors'
import {
	countersActions,
	useGetProductsQuery,
	useSearchProductsQuery,
} from '../../store/slices'
import {
	PAGINATION,
	defaultErrorMessage,
	productNotFoundTitle,
} from '../../utils/constants'
import { getMessageFromError } from '../../utils/helpers'
import { NotFoundPage } from '../NotFound'
import { CatalogList, CatalogSorter } from './containers'

export const CatalogPage: React.FC = withProtection(() => {
	const dispatch = useAppDispatch()
	const { searchTemplate } = useParams()
	const { userId } = useAppSelector(credentialsSelector)
	const [productsPage, setProductsPage] = useState({ page: PAGINATION.PAGE })
	const [filteredData, setFilteredData] = useState<Product[] | undefined>(
		undefined
	)
	const { data: searchResult, isLoading: searchIsLoading } =
		useSearchProductsQuery(searchTemplate)
	const {
		data,
		isLoading: productsIsLoading,
		isError,
		error,
		refetch,
		isFetching: productsIsFetching,
	} = useGetProductsQuery({
		page: productsPage.page,
		limit: PAGINATION.LIMIT,
	})
	const isEndOfList = data && data.products.length >= data.total
	const isNotFound = searchTemplate !== null && !filteredData?.length
	const isLoading = productsIsLoading || productsIsFetching || searchIsLoading

	const loadMorePosts = useCallback(() => {
		if (!isEndOfList)
			setProductsPage((prev) => ({ ...prev, page: prev.page + 1 }))
	}, [isEndOfList])

	useEffect(() => {
		if (data) {
			const filteredProducts = searchTemplate
				? searchResult?.products
				: data?.products
			setFilteredData(filteredProducts)
		}
	}, [data, searchTemplate, searchResult])

	useEffect(() => {
		if (data && userId) {
			const favoritesProducts = data.products.filter((product) =>
				product.likes?.some((like) => like === userId)
			)
			dispatch(
				countersActions.setFavoritesCounter(favoritesProducts.length)
			)
		}
	}, [data, userId])

	return (
		<>
			{searchTemplate && (
				<SearchResultMessage
					searchTemplate={searchTemplate}
					filteredData={filteredData ?? []}
				/>
			)}
			{isNotFound && !isLoading && (
				<NotFoundPage title={productNotFoundTitle} />
			)}
			{!isNotFound && (
				<>
					<CatalogSorter />
					{withQuery(CatalogList)({
						isError,
						isLoading,
						error: getMessageFromError(error, defaultErrorMessage),
						refetch,
						data: filteredData,
					})}
					{filteredData && (
						<LoadMore
							isLoading={productsIsFetching}
							action={loadMorePosts}
							isEndOfList={isEndOfList}
						/>
					)}
				</>
			)}
		</>
	)
})
