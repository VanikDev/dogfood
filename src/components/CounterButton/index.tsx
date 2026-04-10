import React, { useCallback } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import cn from 'classnames'
import { CartProduct } from '../../model'
import { useAppDispatch } from '../../store'
import { cartActions } from '../../store/slices'
import s from './CounterButton.module.css'

interface CounterButtonProps {
	sx?: SxProps<Theme>
	stock: number
	product: CartProduct
}

export const CounterButton: React.FC<CounterButtonProps> = ({
	sx,
	stock,
	product,
}) => {
	const dispatch = useAppDispatch()

	const decrease = useCallback(() => {
		dispatch(cartActions.decreaseProduct(product))
	}, [product.quantity])

	const increase = useCallback(() => {
		if (product.quantity < stock) {
			dispatch(cartActions.increaseProduct(product))
		}
	}, [product.quantity])

	const addProduct = useCallback(
		(currentValue: number) => {
			if (currentValue <= stock) {
				dispatch(
					cartActions.addProduct({
						...product,
						quantity: currentValue,
					})
				)
			}
		},
		[stock]
	)

	return (
		<ButtonGroup className={cn(s.button__counter)} sx={sx}>
			<Button
				variant='text'
				aria-label='decrease'
				disabled={product.quantity <= 1}
				onClick={decrease}>
				<RemoveIcon />
			</Button>
			<input
				type='number'
				min='1'
				max={stock}
				className={cn(s.button__counter_text)}
				value={product.quantity}
				onChange={(e) => addProduct(Number(e.target.value))}
			/>
			<Button
				variant='text'
				aria-label='increase'
				disabled={stock === 0 || stock === product.quantity}
				onClick={increase}>
				<AddIcon />
			</Button>
		</ButtonGroup>
	)
}
