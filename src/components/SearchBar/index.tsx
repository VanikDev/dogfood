import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import cn from 'classnames'
import { PATH_NAME } from '../../utils/constants'
import { useDebounce } from '../../utils/hooks/useDebounce'
import s from './SearchBar.module.css'

interface SearchBarProps {
	dataTestId?: string
	disabled?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
	dataTestId,
	disabled,
}) => {
	const navigate = useNavigate()
	const [searchTemplate, setSearchTemplate] = useState<string | null>(null)
	const debouncedValue = useDebounce<string | null>(searchTemplate, 500)
	const navigateTo = !searchTemplate
		? PATH_NAME.BASE
		: `/search/${debouncedValue}`

	useEffect(() => {
		navigate(navigateTo)
	}, [debouncedValue])

	return (
		<Box className={cn(s.search)}>
			<input
				disabled={disabled}
				data-testid={dataTestId}
				type='search'
				id='products-search'
				placeholder={'Поиск'}
				className={cn(s.search__input)}
				value={searchTemplate || ''}
				onChange={(e) => setSearchTemplate(e.target.value)}
			/>
		</Box>
	)
}
