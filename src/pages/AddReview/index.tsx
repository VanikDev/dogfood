import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { DefaultTitle, DefaultYellowButton, GoBack } from '../../components'
import { useAddReviewMutation } from '../../store/slices'
import s from './AddReviewPage.module.css'
import { ADD_REVIEW_SETTINGS_TEST_ID } from './helpers'

export const AddReviewPage: React.FC = () => {
	const { id } = useParams()
	const { state } = useLocation()
	const [rating, setRating] = useState<number | null>(0)
	const [reviewText, setReviewText] = useState<string>('')
	const [addReview] = useAddReviewMutation()

	return (
		<>
			<GoBack path={`/products/${id}`} />
			<DefaultTitle
				name={`Поделитесь мнением о товаре ${state ? state.name : ''}`}
			/>
			<Box
				className={cn(s.review)}
				data-testid={ADD_REVIEW_SETTINGS_TEST_ID.REVIEW}>
				<Box className={cn(s.review__fields)}>
					<Typography variant='body2' className={cn(s.review__field)}>
						Общая оценка
					</Typography>
					<Rating
						sx={{ fontSize: 30 }}
						name='rating'
						precision={0.5}
						value={rating}
						max={5}
						onChange={(event, newValue) => {
							setRating(newValue)
						}}
					/>
				</Box>
				<Box className={cn(s.review__fields)}>
					<Typography variant='body2' className={cn(s.review__field)}>
						Комментарии
					</Typography>
					<TextField
						sx={{ width: 540 }}
						multiline
						rows={3}
						id='reviewText'
						type='text'
						label='Поделитесь впечатлениями о товаре'
						value={reviewText}
						onChange={(e) => setReviewText(e.target.value)}
					/>
				</Box>
				<Box className={cn(s.review__fields)}>
					<Typography variant='body2' className={cn(s.review__field)}>
						Добавьте фото
					</Typography>
					<TextField
						sx={{ width: 540 }}
						multiline
						rows={2}
						id='reviewText'
						type='text'
						label='Перетащите фото в эту область'
						disabled
					/>
				</Box>
				<DefaultYellowButton
					dataTestId={ADD_REVIEW_SETTINGS_TEST_ID.SUBMIT_BUTTON}
					name={'Отправить отзыв'}
					onClick={() =>
						addReview({ _id: id, rating: rating, text: reviewText })
					}
				/>
			</Box>
		</>
	)
}
