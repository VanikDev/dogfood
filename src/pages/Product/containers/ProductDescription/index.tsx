import React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { sxProps } from '../../index'

interface ProductDescription {
	description?: string
}

export const ProductDescription: React.FC<ProductDescription> = ({
	description,
}) => (
	<>
		<Box>
			<Typography variant='h5' sx={sxProps.description}>
				Описание
			</Typography>
			<Typography>{description}</Typography>
		</Box>
		<Box>
			<Typography variant='h5' sx={sxProps.description}>
				Характеристики
			</Typography>
			<TableContainer>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableBody>
						<TableRow key='row1'>
							<TableCell
								component='th'
								scope='row'
								sx={sxProps.table_cell}>
								Вес
							</TableCell>
							<TableCell component='th'>
								1 шт 120-200 грамм
							</TableCell>
						</TableRow>
						<TableRow key='row2'>
							<TableCell component='th' sx={sxProps.table_cell}>
								Цена
							</TableCell>
							<TableCell component='th'>
								490 ₽ за 100 грамм
							</TableCell>
						</TableRow>
						<TableRow key='row3'>
							<TableCell component='th' sx={sxProps.table_cell}>
								Польза
							</TableCell>
							<TableCell component='th'>
								<Typography
									variant='subtitle2'
									sx={sxProps.pb_2}>
									Большое содержание аминокислот и
									микроэлементов оказывает положительное
									воздействие на общий обмен веществ собаки.
								</Typography>
								<Typography
									variant='subtitle2'
									sx={sxProps.pb_2}>
									Способствуют укреплению десен и жевательных
									мышц.
								</Typography>
								<Typography
									variant='subtitle2'
									sx={sxProps.pb_2}>
									Развивают зубочелюстной аппарат, отвлекают
									собаку во время смены зубов.
								</Typography>
								<Typography
									variant='subtitle2'
									sx={sxProps.pb_2}>
									Имеет цельную волокнистую структуру, при
									разжевывание получается эффект зубной щетки,
									лучше всего очищает клыки собак.
								</Typography>
								<Typography variant='subtitle2'>
									Следует учесть высокую калорийность
									продукта.
								</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	</>
)
