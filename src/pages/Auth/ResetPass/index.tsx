import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { DefaultFormWrapper, DefaultYellowButton } from '../../../components'
import { useResetPassMutation } from '../../../store/slices'
import { PATH_NAME } from '../../../utils/constants'
import s from '../Auth.module.css'
import {
	RESET_PASS_SETTINGS_TEST_ID,
	ResetPassValues,
	resetPassSchema,
} from './helpers'

export const ResetPassPage: React.FC = () => {
	const [resetPass, { isLoading }] = useResetPassMutation()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ResetPassValues>({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(resetPassSchema),
	})

	const submitHandler = (values: ResetPassValues) => {
		if (isValid) {
			resetPass(values)
		}
	}

	return (
		<Box className={cn(s.auth__page)}>
			<DefaultFormWrapper
				name={'Восстановление пароля'}
				onSubmit={handleSubmit(submitHandler)}
				pathname={PATH_NAME.SIGN_IN}
				dataTestId={RESET_PASS_SETTINGS_TEST_ID.FORM}>
				<Box sx={{ width: 356 }}>
					<Typography
						variant='body2'
						className={cn(s.auth__form_description)}>
						Для получения временного пароля необходимо ввести email,
						указанный при регистрации.
					</Typography>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								className={cn(s.auth__form_field)}
								margin='normal'
								id='resetpass-email'
								label='Email'
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								{...field}
							/>
						)}
					/>
				</Box>
				<Typography
					variant='body2'
					className={cn(s.auth__form_description)}>
					Срок действия временного пароля 24 ч.
				</Typography>
				<Box className={cn(s.auth__form_buttons)}>
					<DefaultYellowButton
						name='Отправить'
						type='submit'
						disabled={isLoading}
						loading={isLoading}
					/>
				</Box>
			</DefaultFormWrapper>
		</Box>
	)
}
