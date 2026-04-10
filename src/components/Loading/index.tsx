import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import cn from 'classnames'
import s from './Loading.module.css'

export const Loading = () => (
	<Box className={cn(s.loading)}>
		<CircularProgress sx={{ color: 'var(--bg-default-yellow)' }} />
	</Box>
)
