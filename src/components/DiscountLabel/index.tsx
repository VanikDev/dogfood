import Box from '@mui/material/Box'
import cn from 'classnames'
import s from './DiscountLabel.module.css'

interface DiscountLabelProps {
	discount?: number
}

export const DiscountLabel: React.FC<DiscountLabelProps> = ({ discount }) => (
	<Box
		visibility={discount === 0 ? 'hidden' : 'visible'}
		className={cn(s.discount__label)}>{`-${discount}%`}</Box>
)
