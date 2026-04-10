import React from 'react'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import cn from 'classnames'
import s from './DefaultYellowButton.module.css'

interface DefaultYellowButtonProps {
	disabled?: boolean
	loading?: boolean
	sx?: SxProps<Theme>
	type?: 'button' | 'reset' | 'submit'
	dataTestId?: string
	name: string
	onClick?: () => void
}

export const DefaultYellowButton: React.FC<DefaultYellowButtonProps> = ({
	disabled,
	loading,
	sx,
	type,
	dataTestId,
	name,
	onClick,
}) => (
	<Button
		data-testid={dataTestId}
		disabled={disabled}
		sx={sx}
		className={cn(s.default__yellow_button)}
		aria-label='to-cart'
		onClick={onClick}
		type={type}>
		{loading ? (
			<CircularProgress
				size='1rem'
				sx={{ color: 'var(--bg-default-color)' }}
			/>
		) : (
			name
		)}
	</Button>
)
