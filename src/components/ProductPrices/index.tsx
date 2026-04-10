import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Variant } from '@mui/material/styles/createTypography'
import cn from 'classnames'
import { getDiscount } from '../../utils/helpers'
import s from './ProductPrice.module.css'

interface ProductPricesProps {
	discount: number
	price: number
	variant: Variant
}

export const ProductPrices: React.FC<ProductPricesProps> = ({
	discount,
	price,
	variant,
}) => (
	<Box className={cn(s.product__prices)}>
		<Typography className={cn(s.product__prices_discount)}>
			{discount !== 0 ? `${price} ₽` : ''}
		</Typography>
		<Typography
			variant={variant}
			className={cn(s.product__prices_price, {
				[s.product__prices_price_red]: discount !== 0,
			})}>
			{discount !== 0 ? getDiscount(price, discount) : price} ₽
		</Typography>
	</Box>
)
