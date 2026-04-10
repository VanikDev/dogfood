import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import {
	DefaultButton,
	DefaultFormWrapper,
	DefaultYellowButton,
} from '../../../components'
import { useAppDispatch } from '../../../store'
import { credentialsActions, useSignInMutation } from '../../../store/slices'
import { PATH_NAME } from '../../../utils/constants'
import s from '../Auth.module.css'
import { SIGN_IN_SETTINGS_TEST_ID, SignInValues, signInSchema } from './helpers'

export const SignInPage: React.FC = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const dispatch = useAppDispatch()
	const [signIn, { data, isLoading, isSuccess }] = useSignInMutation()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<SignInValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInSchema),
	})

	const submitHandler = (values: SignInValues) => {
		if (isValid) {
			signIn(values)
		}
	}

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(credentialsActions.setToken(data.token))
			dispatch(credentialsActions.setUserId(data.data._id))
			navigate(state.from, { state: { location: location.pathname } })
		}
	}, [isSuccess, data])

	return (
		<Box className={cn(s.auth__page)}>
			<DefaultFormWrapper
				name={'Войти'}
				onSubmit={handleSubmit(submitHandler)}
				pathname={PATH_NAME.BASE}
				dataTestId={SIGN_IN_SETTINGS_TEST_ID.FORM}>
				<Box sx={{ width: 356 }}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								className={cn(s.auth__form_field)}
								sx={{ mb: 2 }}
								margin='normal'
								id='email'
								label='Email'
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								data-testid={
									SIGN_IN_SETTINGS_TEST_ID.EMAIL_FIELD
								}
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
								id='password'
								autoComplete='current-password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								data-testid={
									SIGN_IN_SETTINGS_TEST_ID.PASSWORD_FIELD
								}
								{...field}
							/>
						)}
					/>
				</Box>
				<Typography
					variant='body2'
					className={cn(s.auth__form_description)}
					sx={{ textAlign: 'right' }}>
					<Link to={PATH_NAME.RESET_PATH}>Восстановить пароль</Link>
				</Typography>
				<Box className={cn(s.auth__form_buttons)}>
					<DefaultYellowButton
						name='Войти'
						type='submit'
						disabled={isLoading}
						loading={isLoading}
						dataTestId={SIGN_IN_SETTINGS_TEST_ID.SUBMIT_BTN}
					/>
					<Link to={PATH_NAME.SIGN_UP}>
						<DefaultButton name='Регистрация' />
					</Link>
				</Box>
			</DefaultFormWrapper>
		</Box>
	)
}
