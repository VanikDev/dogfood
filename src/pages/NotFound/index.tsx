import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import cn from 'classnames'
import { IconNotFound } from '../../assets/images/svg'
import { PATH_NAME } from '../../utils/constants'
import s from './NotFound.module.css'

interface NotFoundPageProps {
	error?: number
	title?: string
	subtitle?: string
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
	title,
	subtitle,
}) => (
	<Box className={cn(s.not__found)}>
		<IconNotFound />
		<h4 className={cn(s.not__found_title)}>{title}</h4>
		{subtitle && <h5 className={cn(s.not__found_subtitle)}>{subtitle}</h5>}
		<Link to={PATH_NAME.BASE}>
			<button className={cn(s.not__found_button)}>На главную</button>
		</Link>
	</Box>
)
