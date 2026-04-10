import React, { useRef } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'
import { DefaultTitle } from '../../../../components'
import { Product } from '../../../../model'
import { CatalogList } from '../../../Catalog/containers'
import s from './CartOrderedWith.module.css'

interface CartOrderedWithProps {
	data?: Product[]
}
export const CartOrderedWith: React.FC<CartOrderedWithProps> = ({ data }) => {
	const listRef = useRef<HTMLDivElement>(null)

	const scrollList = (scrollOffset: number) => {
		const list = listRef.current
		if (list) {
			list.scrollLeft += scrollOffset
		}
	}

	return (
		<Box className={cn(s.ordered__with)}>
			<Box className={cn(s.ordered__with_head)}>
				<DefaultTitle name={'С этим товаром заказывают'} />
				<Box>
					<Tooltip title={'Назад'}>
						<IconButton onClick={() => scrollList(-300)}>
							<ArrowBackIosIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title={'Вперед'}>
						<IconButton onClick={() => scrollList(300)}>
							<ArrowForwardIosIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
			<CatalogList
				listRef={listRef}
				data={data?.slice(0, 8)}
				sx={{
					gridTemplateColumns: 'none',
					gridAutoFlow: 'column',
					overflowY: 'scroll',
					scrollBehavior: 'smooth',
					pb: 5,
				}}
			/>
		</Box>
	)
}
