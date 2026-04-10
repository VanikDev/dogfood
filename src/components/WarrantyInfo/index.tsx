import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { IconQuality } from '../../assets/images/svg'
import s from './WarrantyInfo.module.css'

export const WarrantyInfo: React.FC = () => (
	<Box sx={{ height: 144 }} className={cn(s.warranty__info)}>
		<IconQuality />
		<Box>
			<Typography variant='h6' sx={{ fontWeight: 700 }}>
				Гарантия качества
			</Typography>
			<Typography variant='subtitle2' sx={{ my: 1 }}>
				Если Вам не понравилось качество нашей продукции, мы вернем
				деньги, либо сделаем все возможное, чтобы удовлетворить ваши
				нужды.
			</Typography>
		</Box>
	</Box>
)
