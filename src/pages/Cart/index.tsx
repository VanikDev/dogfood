import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import cn from 'classnames'
import { withProtection } from '../../HOCs/withProtection'
import { withQuery } from '../../HOCs/withQuery'
import { CardGift, DefaultTitle, DeliveryInfo, GoBack } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store'
import { cartSelector } from '../../store/selectors'
import { cartActions, useGetProductsQuery } from '../../store/slices'
import {
	PAGINATION,
	cartEmptySubtitle,
	cartEmptyTitle,
	defaultErrorMessage,
} from '../../utils/constants'
import {
	getDiscount,
	getMessageFromError,
	pluralize,
} from '../../utils/helpers'
import { NotFoundPage } from '../NotFound'
import s from './Cart.module.css'
import { CartList, CartOrderedWith, CartTotalAmount } from './containers'

export const CartPage: React.FC = withProtection(() => {
	const { state } = useLocation()
	const dispatch = useAppDispatch()
	const { products: productsCart } = useAppSelector(cartSelector)
	const { data, isLoading, isError, error, refetch } = useGetProductsQuery({
		page: PAGINATION.PAGE,
		limit: PAGINATION.LIMIT,
	})
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalDiscount, setTotalDiscount] = useState(0)
	const [totalQuantity, setTotalQuantity] = useState(0)

	const handleClearCart = () => {
		dispatch(cartActions.clearCart())
	}

	useEffect(() => {
		const allPrice = productsCart
			.map((product) => product.price * product.quantity)
			.reduce((a, b) => a + b, 0)
		setTotalPrice(allPrice)
	}, [productsCart])

	useEffect(() => {
		const productsWithDiscount = productsCart.filter(
			(product) => product.discount !== 0
		)
		const allDiscount = productsWithDiscount
			.map(
				(product) =>
					(product.price -
						getDiscount(product.price, product.discount)) *
					product.quantity
			)
			.reduce((a, b) => a + b, 0)
		setTotalDiscount(allDiscount)
	}, [productsCart])

	useEffect(() => {
		const allQuantity = productsCart
			.map((product) => product.quantity)
			.reduce((a, b) => a + b, 0)
		setTotalQuantity(allQuantity)
	}, [productsCart])

	if (!productsCart.length) {
		return (
			<NotFoundPage title={cartEmptyTitle} subtitle={cartEmptySubtitle} />
		)
	}

	return (
		<Box>
			<GoBack path={state.location} />
			<DefaultTitle
				name={`В корзине ${pluralize(productsCart.length, [
					`${productsCart.length} товар`,
					`${productsCart.length} товара`,
					`${productsCart.length} товаров`,
				])}`}
			/>
			<Box className={cn(s.cart__actions)}>
				<Button
					variant='text'
					color={'inherit'}
					onClick={handleClearCart}>
					Очистить корзину
				</Button>
			</Box>
			<Box className={cn(s.cart)}>
				<Box>
					<CartList data={productsCart} />
					<CardGift />
				</Box>
				<Box>
					<CartTotalAmount
						totalQuantity={totalQuantity}
						totalPrice={totalPrice}
						totalDiscount={totalDiscount}
					/>
					<DeliveryInfo />
				</Box>
			</Box>
			{withQuery(CartOrderedWith)({
				isError,
				isLoading,
				error: getMessageFromError(error, defaultErrorMessage),
				refetch,
				data: data?.products,
			})}
		</Box>
	)
})
