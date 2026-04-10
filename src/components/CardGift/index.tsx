import React from 'react'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { GiftInfo } from '../GiftInfo'
import s from './GiftInfo.module.css'

export const CardGift: React.FC = () => (
	<Box className={cn(s.card__gift)}>
		<CardMedia
			sx={{ width: 62, height: 62 }}
			component='img'
			image={'https://react-learning.ru/image-compressed/1.jpg'}
			alt='card-small-image'
		/>
		<Box className={cn(s.card__gift_description)}>
			<Typography variant='body2'>Описание</Typography>
			<Typography variant='body2'>Размер, граммы и т. д.</Typography>
		</Box>
		<GiftInfo />
	</Box>
)
