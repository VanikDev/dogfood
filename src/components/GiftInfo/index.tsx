import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { IconGift } from '../../assets/images/svg'
import s from './GiftInfo.module.css'

export const GiftInfo: React.FC = () => (
	<Box className={cn(s.gift__info)}>
		<IconGift />
		<Box>
			<Typography variant='body1' sx={{ fontWeight: 700 }}>
				Подарок
			</Typography>
			<Typography variant='body2' sx={{ fontSize: 9 }}>
				за первый заказ!
			</Typography>
		</Box>
	</Box>
)
