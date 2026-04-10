import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { withProtection } from '../../HOCs/withProtection'
import { IconEmail, IconPhone } from '../../assets/images/svg'
import { DefaultButton, DefaultTitle, GoBack } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store'
import { credentialsSelector } from '../../store/selectors'
import {
	cartActions,
	countersActions,
	credentialsActions,
	useGetUserByIdQuery,
} from '../../store/slices'
import { PATH_NAME } from '../../utils/constants'
import s from './Profile.module.css'

export const ProfilePage: React.FC = withProtection(() => {
	const { state } = useLocation()
	const dispatch = useAppDispatch()
	const { userId } = useAppSelector(credentialsSelector)
	const { data: user } = useGetUserByIdQuery(userId)

	const handleLogout = useCallback(() => {
		dispatch(credentialsActions.setToken(null))
		dispatch(countersActions.setFavoritesCounter(0))
		dispatch(cartActions.clearCart())
	}, [])

	return (
		<Box className={cn(s.profile)}>
			<GoBack path={state.location} />
			<DefaultTitle name={'Профиль'} />
			<Box className={cn(s.profile__info)}>
				<Typography variant='h6' sx={{ fontWeight: 800, mb: 1 }}>
					{user?.name}
				</Typography>
				<Box className={cn(s.profile__contacts)}>
					<IconPhone />
					<Typography>+7 (000) 000-00-00</Typography>
				</Box>
				<Box className={cn(s.profile__contacts)}>
					<IconEmail />
					<Typography>{user?.email}</Typography>
				</Box>
			</Box>
			<Box className={cn(s.profile__buttons)}>
				<Link to={PATH_NAME.PROFILE_EDIT}>
					<DefaultButton name={'Изменить'} />
				</Link>
				<Link to={PATH_NAME.PRODUCT}>
					<DefaultButton name={'Добавить товар'} />
				</Link>
				<Link to={PATH_NAME.PRODUCT_DELETE}>
					<DefaultButton name={'Удалить товар'} />
				</Link>
				<DefaultButton name={'Выйти'} onClick={handleLogout} />
			</Box>
		</Box>
	)
})
