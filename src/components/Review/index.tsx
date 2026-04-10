import React from 'react'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import s from './Review.module.css'

interface ReviewProps {
	picture?: string
	city?: string
	name: string
	rating: number
	text: string
	date: string
}

export const Review: React.FC<ReviewProps> = ({
	picture,
	name,
	rating,
	text,
	city,
	date,
}) => (
	<Box className={cn(s.review)}>
		<Divider />
		<Box className={cn(s.review__head)}>
			<Typography variant='h6' sx={{ fontWeight: 800 }}>
				{name}
			</Typography>
			<Typography variant='body2' color={'#7B8E98'}>
				{new Date(date).toLocaleString()}
			</Typography>
		</Box>
		<Rating
			sx={{ fontSize: 30 }}
			name='rating'
			precision={0.5}
			value={rating}
			max={5}
			readOnly
		/>
		<Typography variant='body2' color={'#7B8E98'}>
			{city}
		</Typography>
		<Typography variant='body2'>{text}</Typography>
		<Box className={cn(s.review__pictures)}>
			<CardMedia
				sx={{ width: 90, height: 60, borderRadius: 2 }}
				component='img'
				image={picture}
				alt='product-image-small'
			/>
		</Box>
	</Box>
)
