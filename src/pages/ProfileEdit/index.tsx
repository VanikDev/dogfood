import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import cn from 'classnames'
import { DefaultButton, DefaultTitle, GoBack, Loading } from '../../components'
import { useAppSelector } from '../../store'
import { credentialsSelector } from '../../store/selectors'
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../store/slices'
import { PATH_NAME } from '../../utils/constants'
import s from './ProfileEdit.module.css'

export const ProfileEditPage: React.FC = () => {
	const { userId } = useAppSelector(credentialsSelector)
	const { data: user } = useGetUserByIdQuery(userId)
	const [updateUser, { isLoading: udateIsLoading }] = useUpdateUserMutation()
	const [name, setName] = useState(user?.name)
	const [about, setAbout] = useState(user?.about)

	const handleSave = () => {
		updateUser({ name: name, about: about })
	}

	if (udateIsLoading) {
		return <Loading />
	}

	return (
		<Box>
			<GoBack path={PATH_NAME.PROFILE} />
			<DefaultTitle name={'Мои данные'} />
			<Box className={cn(s.profile__edit)}>
				<Box>
					<Box className={cn(s.profile__edit_fields)}>
						<TextField
							className={cn(s.profile__edit_field)}
							id='profileName'
							type='text'
							label='Имя'
							defaultValue={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							className={cn(s.profile__edit_field)}
							id='profileSurname'
							type='text'
							label='Фамилия'
							defaultValue={about}
							onChange={(e) => setAbout(e.target.value)}
						/>
						<TextField
							className={cn(s.profile__edit_field)}
							id='profilePhone'
							type='text'
							label='Телефон'
							defaultValue='+7 (000) 000-00-00'
						/>
						<TextField
							className={cn(s.profile__edit_field)}
							id='profileEmail'
							type='email'
							label='Почта'
							defaultValue={user?.email}
						/>
					</Box>
					<DefaultButton name={'Сохранить'} onClick={handleSave} />
				</Box>
				<Box
					className={cn(s.profile__edit, s.profile__change_password)}>
					<Typography variant='h6' sx={{ fontWeight: 800 }}>
						Изменить пароль
					</Typography>
					<TextField
						className={cn(s.profile__edit_field)}
						id='profileOldPass'
						type='text'
						label='Старый пароль'
					/>
					<TextField
						className={cn(s.profile__edit_field)}
						id='profileNewPass'
						type='text'
						label='Новый пароль'
					/>
					<DefaultButton name={'Сохранить'} />
				</Box>
			</Box>
		</Box>
	)
}
