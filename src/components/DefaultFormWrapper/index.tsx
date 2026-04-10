import React from 'react'
import { Link } from 'react-router-dom'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'
import { WithChildren } from '../../model'
import s from '../../pages/Auth/Auth.module.css'
import { DefaultTitle } from '../DefaultTitle'

interface DefaultFormWrapperProps {
	children: React.ReactNode
	name: string
	onSubmit: React.FormEventHandler<HTMLFormElement>
	pathname: string
	dataTestId: string
}

export const DefaultFormWrapper: WithChildren<DefaultFormWrapperProps> = ({
	children,
	name,
	onSubmit,
	pathname,
	dataTestId,
}) => (
	<Box className={cn(s.auth__form)}>
		<Box className={cn(s.auth__form_close)}>
			<Link to={pathname}>
				<Tooltip title={'Назад'}>
					<IconButton>
						<NavigateBeforeIcon />
					</IconButton>
				</Tooltip>
			</Link>
		</Box>
		<Box
			component='form'
			className={cn(s.auth__form_content)}
			onSubmit={onSubmit}
			data-testid={dataTestId}
			noValidate>
			<DefaultTitle name={name} />
			{children}
		</Box>
	</Box>
)
