import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { IconTrash } from '../../assets/images/svg'
import { CartProduct } from '../../model'
import { useAppDispatch } from '../../store'
import { cartActions } from '../../store/slices'
import { CounterButton } from '../CounterButton'
import { ProductPrices } from '../ProductPrices'
import s from './CardSmall.module.css'

export const CardSmall: React.FC<CartProduct> = ({
	_id,
	name,
	price,
	discount,
	wight,
	pictures,
	stock,
	quantity,
}) => {
	const dispatch = useAppDispatch()
	const product = {
		_id,
		name,
		price,
		discount,
		wight,
		pictures,
		stock,
		quantity: quantity ?? 0,
	}

	const handleDelete = useCallback(() => {
		dispatch(cartActions.removeProduct(_id))
	}, [quantity])

	return (
		<Box className={cn(s.card__small)}>
			<Box className={cn(s.card__small_content)}>
				<CardMedia
					sx={{ width: 62, height: 62 }}
					component='img'
					image={pictures}
					alt='card-small-image'
				/>
				<Box className={cn(s.card__small_description)}>
					<Typography variant='body2'>{name}</Typography>
					<Typography variant='body2'>{wight}</Typography>
				</Box>
				<CounterButton
					sx={{ width: 90, height: 36 }}
					stock={stock}
					product={product}
				/>
				<ProductPrices
					variant={'h6'}
					discount={discount}
					price={price * quantity}
				/>
				<Tooltip title='Удалить'>
					<IconButton onClick={handleDelete}>
						<IconTrash />
					</IconButton>
				</Tooltip>
			</Box>
			<Divider />
		</Box>
	)
}
