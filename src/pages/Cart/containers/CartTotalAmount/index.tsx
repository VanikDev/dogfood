import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { DefaultTitle, DefaultYellowButton } from '../../../../components'
import s from './CartTotalAmount.module.css'

interface CartTotalAmountProps {
	totalQuantity: number
	totalPrice: number
	totalDiscount: number
}

export const CartTotalAmount: React.FC<CartTotalAmountProps> = ({
	totalQuantity,
	totalPrice,
	totalDiscount,
}) => (
	<Box className={cn(s.total__amount)}>
		<DefaultTitle name={'Ваша корзина'} />
		<Box className={cn(s.total__amount_price)}>
			<Box className={cn(s.total__amount_field)}>
				<Typography
					variant='body1'
					className={cn(s.total__amount_field_text)}>
					Товары ({totalQuantity})
				</Typography>
				<Typography variant='body1'>{totalPrice} ₽</Typography>
			</Box>
			<Box className={cn(s.total__amount_field)}>
				<Typography
					variant='body1'
					className={cn(s.total__amount_field_text)}>
					Скидка
				</Typography>
				<Typography
					variant='body1'
					className={cn(s.total__amount_discount)}>
					{totalDiscount ? `- ${totalDiscount}` : 0} ₽
				</Typography>
			</Box>
		</Box>
		<Divider />
		<Box className={cn(s.total__amount_price_all)}>
			<Typography variant='h6' sx={{ fontWeight: 800 }}>
				Общая стоимость
			</Typography>
			<Typography variant='h6' sx={{ fontWeight: 800 }}>
				{totalPrice - totalDiscount} ₽
			</Typography>
		</Box>
		<DefaultYellowButton
			name={'Оформить заказ'}
			onClick={() => console.log('Офрмить заказ')}
		/>
	</Box>
)
