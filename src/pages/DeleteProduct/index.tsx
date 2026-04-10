import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import cn from 'classnames'
import { DefaultTitle, DefaultYellowButton, GoBack } from '../../components'
import { useDeleteProductMutation } from '../../store/slices'
import { PATH_NAME } from '../../utils/constants'
import s from './DeleteProductPage.module.css'
import { DELETE_PRODUCT_SETTINGS_TEST_ID } from './helpers'

export const DeleteProductPage: React.FC = () => {
	const [deleteProduct, { isLoading }] = useDeleteProductMutation()
	const [productId, setProductId] = useState('')

	return (
		<>
			<GoBack path={PATH_NAME.BASE} />
			<DefaultTitle name={'Удалить товар'} />
			<Box
				className={cn(s.delete__product)}
				data-testid={DELETE_PRODUCT_SETTINGS_TEST_ID.DELETE_PRODUCT}>
				<TextField
					sx={{ width: 540 }}
					id='product-id'
					label='Id товара'
					value={productId}
					required
					onChange={(e) => setProductId(e.target.value)}
				/>
				<DefaultYellowButton
					dataTestId={DELETE_PRODUCT_SETTINGS_TEST_ID.SUBMIT_BUTTON}
					name={'Удалить товар'}
					disabled={isLoading}
					loading={isLoading}
					onClick={() => deleteProduct(productId)}
				/>
			</Box>
		</>
	)
}
