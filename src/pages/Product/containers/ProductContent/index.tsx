import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'
import { IconSearch } from '../../../../assets/images/svg'
import {
	CounterButton,
	DefaultYellowButton,
	DeliveryInfo,
	DiscountLabel,
	PictureModal,
	ProductPrices,
	WarrantyInfo,
} from '../../../../components'
import { ProductQueryParams } from '../../../../model'
import { useAppSelector } from '../../../../store'
import { cartSelector, credentialsSelector } from '../../../../store/selectors'
import { PATH_NAME } from '../../../../utils/constants'
import { sxProps } from '../../index'
import s from './ProductContent.module.css'

interface ProductContentProps {
	pictures: string
	_id: string
	discount: number
	price: number
	stock: number
	name: string
	isFavoriteProduct: boolean
	addLikeProduct: (arg: ProductQueryParams) => void
	deleteLikeProduct: (arg: ProductQueryParams) => void
	wight: string
}

export const ProductContent: React.FC<ProductContentProps> = ({
	_id,
	discount,
	price,
	stock,
	pictures,
	name,
	isFavoriteProduct,
	addLikeProduct,
	deleteLikeProduct,
	wight,
}) => {
	const { userId } = useAppSelector(credentialsSelector)
	const { products: cartProducts } = useAppSelector(cartSelector)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [currentQuentity, setCurrentQuentity] = useState(0)
	const product = {
		_id,
		name,
		price,
		discount,
		wight,
		pictures,
		stock,
		quantity: currentQuentity,
	}

	const memoizedFavoriteHandler = useCallback(() => {
		if (!userId) {
			return
		}
		return !isFavoriteProduct
			? addLikeProduct({ _id, userId })
			: deleteLikeProduct({ _id, userId })
	}, [isFavoriteProduct])

	const memoizedFavoriteText = useMemo(
		() =>
			!isFavoriteProduct
				? 'Добавить в избранное'
				: 'Убрать из избранного',
		[isFavoriteProduct]
	)

	const memoizedPrice = useMemo(
		() =>
			stock > 0 && currentQuentity > 0 ? price * currentQuentity : price,
		[stock, currentQuentity]
	)

	/**
	 * Если пользователь добавил товар(ы) в корзину из списка товаров,
	 * при открытии детальной страницы товара - показываем кол-во товара которое он добавил
	 * */
	useEffect(() => {
		const currentCartProduct = cartProducts.find(
			(product) => product._id === _id
		)
		if (currentCartProduct?.quantity) {
			setCurrentQuentity(currentCartProduct.quantity)
		}
	}, [cartProducts])

	return (
		<Box className={cn(s.product__content)}>
			<Box className={cn(s.product__media)}>
				<DiscountLabel discount={discount} />
				<CardMedia
					sx={sxProps.media}
					component='img'
					image={pictures}
					alt='product-image'
				/>
				<Box className={cn(s.product__search_icon)}>
					<Tooltip title={'Увеличить'} sx={sxProps.p_0}>
						<IconButton onClick={() => setModalIsOpen(true)}>
							<IconSearch />
						</IconButton>
					</Tooltip>
				</Box>
				<PictureModal
					modalIsOpen={modalIsOpen}
					setModalIsOpen={setModalIsOpen}
					name={name}
					picture={pictures}
				/>
			</Box>
			<CardMedia
				sx={sxProps.media_small}
				component='img'
				image={pictures}
				alt='product-image-small'
			/>
			<Stack className={cn(s.product__actions)}>
				<ProductPrices
					variant={'h5'}
					discount={discount}
					price={memoizedPrice}
				/>
				<Box className={cn(s.product__actions_buttons)}>
					<CounterButton stock={stock} product={product} />
					<Link
						to={PATH_NAME.CART}
						state={{ location: location.pathname }}>
						<DefaultYellowButton
							name={'В корзину'}
							disabled={stock === 0}
						/>
					</Link>
				</Box>
				<Box className={cn(s.product__favorites)}>
					<Tooltip title={memoizedFavoriteText} sx={sxProps.p_0}>
						<IconButton onClick={memoizedFavoriteHandler}>
							{isFavoriteProduct ? (
								<FavoriteRoundedIcon
									sx={{ color: 'var(--text-red-color)' }}
								/>
							) : (
								<FavoriteBorderRoundedIcon />
							)}
						</IconButton>
					</Tooltip>
					<span>{memoizedFavoriteText}</span>
				</Box>
				<DeliveryInfo />
				<WarrantyInfo />
			</Stack>
		</Box>
	)
}
