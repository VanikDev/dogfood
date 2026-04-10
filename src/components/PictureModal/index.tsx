import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import s from './Picture.module.css'

interface PictureModalProps {
	modalIsOpen: boolean
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	name?: string
	picture?: string
}
export const PictureModal: React.FC<PictureModalProps> = ({
	modalIsOpen,
	setModalIsOpen,
	name,
	picture,
}) => (
	<Dialog
		fullWidth={true}
		open={modalIsOpen}
		onClose={() => setModalIsOpen(false)}>
		<DialogTitle className={cn(s.picture__modal_header)}>
			<Typography variant='subtitle1'>{name}</Typography>
			<Tooltip title={'Закрыть'} className={cn(s.picture__close_icon)}>
				<IconButton onClick={() => setModalIsOpen(false)}>
					<CloseIcon />
				</IconButton>
			</Tooltip>
		</DialogTitle>
		<DialogContent className={cn(s.picture__modal)}>
			<Tooltip title={'Назад'} className={cn(s.picture__arrow_icon)}>
				<IconButton>
					<ArrowBackIosIcon />
				</IconButton>
			</Tooltip>
			<Box className={cn(s.picture__modal_content)}>
				<CardMedia
					sx={{ width: 488, height: 488 }}
					component='img'
					image={picture}
					alt='product-image'
				/>
			</Box>
			<Tooltip title={'Вперед'} className={cn(s.picture__arrow_icon)}>
				<IconButton>
					<ArrowForwardIosIcon />
				</IconButton>
			</Tooltip>
		</DialogContent>
	</Dialog>
)
