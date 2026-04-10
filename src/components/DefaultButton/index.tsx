import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import cn from 'classnames'
import s from './DefaultButton.module.css'

interface DefaultButtonProps {
	disabled?: boolean
	large?: boolean
	loading?: boolean
	sx?: SxProps<Theme>
	type?: 'button' | 'reset' | 'submit'
	name: string
	onClick?: () => void
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
	disabled,
	large,
	loading,
	name,
	onClick,
	sx,
	type,
}) => (
	<Button
		disabled={disabled}
		sx={sx}
		className={cn({
			[s.default__button]: !large,
			[s.default__button_large]: large,
		})}
		onClick={onClick}
		type={type}>
		{loading ? (
			<CircularProgress
				size='1rem'
				sx={{ color: 'var(--bg-default-yellow)' }}
			/>
		) : (
			name
		)}
	</Button>
)
