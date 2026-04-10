import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import {
	DefaultButton,
	DefaultFormWrapper,
	DefaultYellowButton,
} from '../../../components'
import { useSignUpMutation } from '../../../store/slices'
import { PATH_NAME } from '../../../utils/constants'
import s from '../Auth.module.css'
import { SIGN_UP_SETTINGS_TEST_ID, SignUpValues, signUpSchema } from './helpers'

export const SignUpPage: React.FC = () => {
	const navigate = useNavigate()
	const [signUp, { isLoading, isSuccess }] = useSignUpMutation()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<SignUpValues>({
		defaultValues: {
			email: '',
			group: '',
			password: '',
		},
		resolver: yupResolver(signUpSchema),
	})

	const submitHandler = (values: SignUpValues) => {
		if (isValid) {
			signUp(values)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(PATH_NAME.SIGN_IN)
		}
	}, [isSuccess])

	return (
		<Box className={cn(s.auth__page)}>
			<DefaultFormWrapper
				name={'Регистрация'}
				onSubmit={handleSubmit(submitHandler)}
				pathname={PATH_NAME.SIGN_IN}
				dataTestId={SIGN_UP_SETTINGS_TEST_ID.FORM}>
				<Box sx={{ width: 356 }}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								className={cn(s.auth__form_field)}
								sx={{ mb: 2 }}
								margin='normal'
								id='signup-email'
								label='Email'
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name='group'
						control={control}
						render={({ field }) => (
							<TextField
								className={cn(s.auth__form_field)}
								sx={{ mb: 2 }}
								margin='normal'
								label='Группа'
								type='text'
								id='signup-group'
								autoComplete='group-name'
								error={!!errors.group?.message}
								helperText={errors.group?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								className={cn(s.auth__form_field)}
								margin='normal'
								label='Пароль'
								type='password'
								id='signup-password'
								autoComplete='current-password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								{...field}
							/>
						)}
					/>
				</Box>
				<Typography
					variant='body2'
					className={cn(s.auth__form_description)}>
					Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
					Политикой конфиденциальности и соглашаетесь на
					информационную рассылку.
				</Typography>
				<Box className={cn(s.auth__form_buttons)}>
					<DefaultYellowButton
						name='Зарегистрироваться'
						type='submit'
						disabled={isLoading}
						loading={isLoading}
					/>
					<Link to={PATH_NAME.SIGN_IN}>
						<DefaultButton name='Войти' />
					</Link>
				</Box>
			</DefaultFormWrapper>
		</Box>
	)
}
