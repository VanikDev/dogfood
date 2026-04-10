import { CardSmall } from '../../../../components'
import { CartProduct } from '../../../../model'

interface CartListProps {
	data: CartProduct[]
}
export const CartList: React.FC<CartListProps> = ({ data }) => (
	<>
		{data.map(
			({
				_id,
				name,
				price,
				discount,
				wight,
				pictures,
				stock,
				quantity,
			}) => (
				<CardSmall
					key={_id}
					_id={_id}
					name={name}
					price={price}
					discount={discount}
					wight={wight}
					pictures={pictures}
					stock={stock}
					quantity={quantity}
				/>
			)
		)}
	</>
)
