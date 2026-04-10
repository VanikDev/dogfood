import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'
import { Product } from '../../model'
import { useAppDispatch, useAppSelector } from '../../store'
import { cartSelector, credentialsSelector } from '../../store/selectors'
import {
	cartActions,
	useAddLikeProductMutation,
	useDeleteLikeProductMutation,
} from '../../store/slices'
import { DiscountLabel } from '../DiscountLabel'
import { ProductPrices } from '../ProductPrices'
import s from './Card.module.css'
import { CARD_SETTINGS_TEST_ID } from './helpers'

export const Card: React.FC<Product> = ({
	_id,
	name,
	price,
	discount,
	wight,
	pictures,
	likes,
	stock,
}) => {
	const dispatch = useAppDispatch()
	const { userId } = useAppSelector(credentialsSelector)
	const { products: cartProducts } = useAppSelector(cartSelector)
	const [isFavorite, setIsFavorite] = useState(false)
	const [localQuentity, setLocalQuentity] = useState(0)
	const [addLikeProduct, { isSuccess: addLikeIsSuccess }] =
		useAddLikeProductMutation()
	const [deleteLikeProduct, { isSuccess: isDeleteLikeSuccess }] =
		useDeleteLikeProductMutation()
	const product = {
		_id,
		name,
		price,
		discount,
		wight,
		pictures,
		stock,
		quantity: localQuentity,
	}

	const memoizedFavoriteHandler = useCallback(() => {
		if (!userId) {
			return
		}

		return !isFavorite
			? addLikeProduct({ _id, userId })
			: deleteLikeProduct({ _id, userId })
	}, [isFavorite])

	const memoizedFavoriteText = useMemo(
		() => (!isFavorite ? 'Добавить в избранное' : 'Убрать из избранного'),
		[isFavorite]
	)

	const handleAddCart = () => {
		if (localQuentity < stock) {
			dispatch(cartActions.addProduct(product))
		}
	}

	/**
	 * Если пользователь добавил товар(ы) в корзину из списка товаров,
	 * показываем кол-во товара которое он добавил
	 * */
	useEffect(() => {
		const currentCartProduct = cartProducts.find(
			(product) => product._id === _id
		)
		if (currentCartProduct?.quantity) {
			setLocalQuentity(currentCartProduct.quantity)
		}
	}, [cartProducts])

	useMemo(() => {
		if (userId && likes) {
			const isLike = likes.some((id) => id === userId)
			if (isLike) {
				setIsFavorite(isLike)
			}
		}
	}, [userId, likes])

	useEffect(() => {
		if (addLikeIsSuccess) {
			setIsFavorite(true)
		}
	}, [addLikeIsSuccess])

	useEffect(() => {
		if (isDeleteLikeSuccess) {
			setIsFavorite(false)
		}
	}, [isDeleteLikeSuccess])

	return (
		<Box className={cn(s.card)}>
			<Box className={cn(s.card__icons)}>
				<DiscountLabel discount={discount} />
				<Tooltip title={memoizedFavoriteText}>
					{/* TODO: добавить IconTrash - на странице Избранное */}
					<IconButton onClick={memoizedFavoriteHandler}>
						{isFavorite ? (
							<FavoriteRoundedIcon
								sx={{ color: 'var(--text-red-color)' }}
							/>
						) : (
							<FavoriteBorderRoundedIcon />
						)}
					</IconButton>
				</Tooltip>
			</Box>
			<Box className={cn(s.card__image)}>
				<Link
					to={`/products/${_id}`}
					state={{ location: location.pathname }}>
					<img src={pictures} alt='...' />
				</Link>
			</Box>
			<Box className={cn(s.card__body)}>
				<ProductPrices
					variant={'h6'}
					discount={discount}
					price={
						stock > 0 && localQuentity > 0
							? price * localQuentity
							: price
					}
				/>
				<h5 className={cn(s.card__wight)}>{wight}</h5>
				<Link
					to={`/products/${_id}`}
					state={{ location: location.pathname }}>
					<p className={cn(s.card__name)}>{name}</p>
				</Link>
				<button
					className={cn(s.card__button)}
					disabled={stock === 0 || stock === localQuentity}
					onClick={handleAddCart}
					data-testid={CARD_SETTINGS_TEST_ID.BUTTON}>
					{localQuentity > 0
						? `В корзине (${localQuentity} шт.)`
						: 'В корзину'}
				</button>
			</Box>
		</Box>
	)
}
