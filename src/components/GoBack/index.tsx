import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@mui/material/Breadcrumbs'

interface GoBackProps {
	path: string
}

export const GoBack: React.FC<GoBackProps> = ({ path }) => (
	<Breadcrumbs aria-label='go-back'>
		<Link to={path} state={{ location: path }}>
			{'< Назад'}
		</Link>
	</Breadcrumbs>
)
