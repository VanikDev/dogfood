import Box from '@mui/material/Box'
import cn from 'classnames'
import { Products } from '../../model'
import { pluralize } from '../../utils/helpers'
import s from './SearchResultMessage.module.css'

interface SearchResultMessageProps {
	searchTemplate: string
	filteredData: Products['products']
}

export const SearchResultMessage: React.FC<SearchResultMessageProps> = ({
	searchTemplate,
	filteredData,
}) => (
	<Box className={cn(s.search__result_message)}>
		По запросу <span>{searchTemplate}</span>{' '}
		{pluralize(filteredData.length, [
			`найден ${filteredData.length} товар`,
			`найдено ${filteredData.length} товара`,
			`найдено ${filteredData.length} товаров`,
		])}
	</Box>
)
