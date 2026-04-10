import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { withProtection } from '../../HOCs/withProtection'
import { GoBack, Loading } from '../../components'
import { useAppSelector } from '../../store'
import { credentialsSelector } from '../../store/selectors'
import {
	useAddLikeProductMutation,
	useDeleteLikeProductMutation,
	useGetProductQuery,
	useGetUserByIdQuery,
} from '../../store/slices'
import { getAverage } from '../../utils/helpers'
import {
	ProductContent,
	ProductDescription,
	ProductHead,
	ProductReviews,
} from './containers'

export const sxProps = {
	name: { fontWeight: 800 },
	media: { width: 488, height: 488 },
	media_small: { width: 80, height: 80 },
	media_review: { width: 90, height: 60, borderRadius: 2 },
	weight_700: { fontWeight: 700 },
	my_1: { my: 1 },
	my_2: { my: 2 },
	pb_2: { pb: 2 },
	p_0: { p: 0 },
	description: { fontWeight: 800, mb: 2.5 },
	table_cell: { width: 140, pl: 0 },
}

export const ProductPage: React.FC = withProtection(() => {
	const { state, pathname } = useLocation()
	const { id: currentId } = useParams()
	const { userId } = useAppSelector(credentialsSelector)
	const { data: user } = useGetUserByIdQuery(userId)
	const [addLikeProduct, { isSuccess: addLikeIsSuccess }] =
		useAddLikeProductMutation()
	const [deleteLikeProduct, { isSuccess: isDeleteLikeSuccess }] =
		useDeleteLikeProductMutation()
	const { data: currentProduct, isLoading: currentProductIsLoading } =
		useGetProductQuery(currentId)
	const [isFavoriteProduct, setIsFavoriteProduct] = useState(false)
	const [isShowAll, setIsShowAll] = useState(false)
	const [averageRating, setAverageRating] = useState(0)
	const isLoading = currentProductIsLoading || !currentProduct
	const reviews =
		currentProduct?.reviews && !isShowAll
			? currentProduct?.reviews.slice(0, 2)
			: currentProduct?.reviews

	useEffect(() => {
		if (user && currentProduct?.likes) {
			const favoriteProduct = currentProduct.likes.some(
				(id) => id === user._id
			)
			setIsFavoriteProduct(favoriteProduct)
		}
	}, [user, currentProduct])

	useEffect(() => {
		if (currentProduct?.reviews) {
			const ratings = currentProduct?.reviews.map(
				(review) => review.rating
			)
			setAverageRating(getAverage(ratings))
		}
	}, [currentProduct?.reviews])

	useEffect(() => {
		if (addLikeIsSuccess) {
			setIsFavoriteProduct(true)
		}
	}, [addLikeIsSuccess])

	useEffect(() => {
		if (isDeleteLikeSuccess) {
			setIsFavoriteProduct(false)
		}
	}, [isDeleteLikeSuccess])

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box>
			<Box>
				<GoBack path={state.location} />
				<ProductHead
					name={currentProduct.name}
					reviewsTotal={currentProduct?.reviews?.length}
					rating={averageRating}
				/>
			</Box>
			<ProductContent
				_id={currentProduct._id}
				discount={currentProduct.discount}
				price={currentProduct.price}
				stock={currentProduct.stock || 0}
				pictures={currentProduct.pictures}
				name={currentProduct.name}
				isFavoriteProduct={isFavoriteProduct}
				addLikeProduct={addLikeProduct}
				deleteLikeProduct={deleteLikeProduct}
				wight={currentProduct.wight}
			/>
			<Stack spacing={5}>
				<ProductDescription description={currentProduct.description} />
				<ProductReviews
					id={currentProduct._id}
					name={currentProduct.name}
					pathname={pathname}
					pictures={currentProduct.pictures}
					reviews={reviews}
					isShowAll={isShowAll}
					setIsShowAll={setIsShowAll}
				/>
			</Stack>
		</Box>
	)
})
