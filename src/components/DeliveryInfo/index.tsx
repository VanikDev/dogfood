import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { IconTrack } from '../../assets/images/svg'
import s from './DeliveryInfo.module.css'

export const DeliveryInfo: React.FC = () => (
	<Box className={cn(s.delivery__info)}>
		<IconTrack />
		<Box>
			<Typography variant='h6' sx={{ fontWeight: 700 }}>
				Доставка по всему Миру!
			</Typography>
			<Typography variant='subtitle2' sx={{ my: 1 }}>
				Доставка курьером — от 399 ₽
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				Доставка в пункт выдачи — от 199 ₽
			</Typography>
		</Box>
	</Box>
)
