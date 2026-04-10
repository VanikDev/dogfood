import React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { pluralize } from '../../../../utils/helpers'
import s from './ProductHead.module.css'

interface ProductHeadProps {
	name?: string
	reviewsTotal?: number
	rating: number
}

export const ProductHead: React.FC<ProductHeadProps> = ({
	name,
	reviewsTotal,
	rating,
}) => (
	<>
		<Typography variant='h5' sx={{ fontWeight: 800 }}>
			{name}
		</Typography>
		<Box className={cn(s.product__head)}>
			<Box className={cn(s.product__article)}>
				<Typography variant='body2' color={'#7B8E98'}>
					Артикул:
				</Typography>
				<Typography variant='body2'>2388907</Typography>
			</Box>
			<Rating
				sx={{ fontSize: 20 }}
				name='rating'
				precision={0.5}
				value={rating}
				max={5}
				readOnly
			/>
			<Typography variant='body2' className={cn(s.product__rating)}>
				{reviewsTotal &&
					pluralize(reviewsTotal, [
						`${reviewsTotal} отзыв`,
						`${reviewsTotal} отзыва`,
						`${reviewsTotal} отзывов`,
					])}
			</Typography>
		</Box>
	</>
)
