import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import cn from 'classnames'
import s from './ProductsSorter.module.css'

// TODO: после прохождения мемоизации, вынести это в компонент, мемоизировать и рендерить
export const CatalogSorter: React.FC = () => (
	<div className={cn(s.sorter)}>
		<ButtonGroup variant='outlined' className={cn(s.sorter__buttons)}>
			<Button variant='text' color='inherit'>
				Популярные
			</Button>
			<Button variant='text' color='inherit' disabled>
				Новинки
			</Button>
			<Button variant='text' color='inherit' disabled>
				Сначала дешёвые
			</Button>
			<Button variant='text' color='inherit' disabled>
				Сначала дорогие
			</Button>
			<Button variant='text' color='inherit' disabled>
				По рейтингу
			</Button>
			<Button variant='text' color='inherit' disabled>
				По скидке
			</Button>
		</ButtonGroup>
	</div>
)
