import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { DefaultButton, Review } from '../../../../components'
import { Product } from '../../../../model'
import { sxProps } from '../../index'
import s from './ProductReviews.module.css'

interface ProductReviewsProps {
	id?: string
	name: string
	pathname: string
	pictures: string
	reviews: Product['reviews']
	isShowAll: boolean
	setIsShowAll: Dispatch<SetStateAction<boolean>>
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
	id,
	name,
	pathname,
	pictures,
	reviews,
	isShowAll,
	setIsShowAll,
}) => (
	<>
		<Box>
			<Typography variant='h5' sx={sxProps.description}>
				Отзывы
			</Typography>
			<Link
				to={`/products/${id}/review`}
				state={{
					location: pathname,
					name: name,
				}}>
				<DefaultButton name={'Написать отзыв'} />
			</Link>
			<Box>
				<Typography variant='h6' sx={sxProps.my_2}>
					Фотографии наших покупателей
				</Typography>
				<Box className={cn(s.product__review_pictures)}>
					<CardMedia
						sx={sxProps.media_review}
						component='img'
						image={pictures}
						alt='product-image-small'
					/>
				</Box>
				{reviews?.map((review) => (
					<Review
						key={review._id}
						picture={pictures}
						name={review.author.name}
						date={review.updated_at}
						rating={review.rating}
						text={review.text}
					/>
				))}

				<DefaultButton
					name={!isShowAll ? 'Все отзывы >' : 'Скрыть'}
					large={true}
					onClick={() => setIsShowAll(!isShowAll)}
				/>
			</Box>
		</Box>
	</>
)
