import React from 'react'
import { Alert, AlertTitle, Button } from '@mui/material'
import Box from '@mui/material/Box'
import cn from 'classnames'
import s from './Error.module.css'

interface ErrorProps {
	error?: string
	refetch: () => void
}
export const Error: React.FC<ErrorProps> = ({ refetch, error }) => (
	<Box className={cn(s.error)}>
		<Alert
			action={
				<Button onClick={refetch} color='inherit' size='small'>
					Повторить запрос
				</Button>
			}
			severity='error'>
			<AlertTitle>Ошибка</AlertTitle>
			{error ?? 'Неизвестная ошибка. Пожалуйста, повторите запрос'}
		</Alert>
	</Box>
)
