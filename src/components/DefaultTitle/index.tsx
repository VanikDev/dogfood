import React from 'react'
import Typography from '@mui/material/Typography'

interface DefaultTitleProps {
	name: string
}
export const DefaultTitle: React.FC<DefaultTitleProps> = ({ name }) => (
	<Typography variant='h5' sx={{ fontWeight: 800 }}>
		{name}
	</Typography>
)
