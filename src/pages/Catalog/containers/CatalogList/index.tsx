import React from 'react'
import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import cn from 'classnames'
import { Card } from '../../../../components'
import { Product } from '../../../../model'
import s from './CatalogList.module.css'
import { CATALOG_LIST_SETTINGS_TEST_ID } from './helpers'

interface CatalogListProps {
	data?: Product[]
	sx?: SxProps<Theme>
	listRef?: React.Ref<unknown>
}

export const CatalogList: React.FC<CatalogListProps> = ({
	data,
	sx,
	listRef,
}) => (
	<Box
		className={cn(s.catalog__list_container)}
		sx={sx}
		ref={listRef}
		data-testid={CATALOG_LIST_SETTINGS_TEST_ID.LIST}>
		{data?.map(
			({ _id, name, price, discount, wight, pictures, likes, stock }) => (
				<Card
					key={_id}
					_id={_id}
					name={name}
					price={price}
					discount={discount}
					wight={wight}
					pictures={pictures}
					likes={likes}
					stock={stock}
				/>
			)
		)}
	</Box>
)
