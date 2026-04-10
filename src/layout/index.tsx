import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { WithChildren } from '../model'
import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: WithChildren<LayoutProps> = ({ children }) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
		}}>
		<Header />
		<Container
			maxWidth='lg'
			sx={{
				minHeight: 'calc(100vh - 274px)',
				pt: 5,
				pb: 5,
			}}>
			{children}
		</Container>
		<Footer />
	</Box>
)
