import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import cn from 'classnames'
import { DefaultTitle, DefaultYellowButton, GoBack } from '../../components'
import { ProtuctTags } from '../../model'
import { useAddProductMutation } from '../../store/slices'
import { PATH_NAME } from '../../utils/constants'
import s from './AddProductPage.module.css'
import {
	ADD_PRODUCT_SETTINGS_TEST_ID,
	addProductSchema,
	addProductValues,
} from './helpers'

export const AddProductPage: React.FC = () => {
	const [addProduct, { isLoading }] = useAddProductMutation()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<addProductValues>({
		defaultValues: {
			name: '',
			price: 0,
			discount: 0,
			stock: 10,
			available: true,
			wight: '',
			description: '',
			pictures: '',
			isPublished: true,
		},
		resolver: yupResolver(addProductSchema),
	})

	const submitHandler = (values: addProductValues) => {
		if (isValid) {
			addProduct({ ...values, tags: [ProtuctTags.NEW, ProtuctTags.SALE] })
		}
	}

	return (
		<>
			<GoBack path={PATH_NAME.BASE} />
			<DefaultTitle name={'Добавить товар'} />
			<Box
				className={cn(s.product)}
				component='form'
				onSubmit={handleSubmit(submitHandler)}
				noValidate
				data-testid={ADD_PRODUCT_SETTINGS_TEST_ID.PRODUCT}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='name'
							label='Название'
							error={!!errors.name?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='price'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='price'
							label='Цена'
							error={!!errors.price?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='discount'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='discount'
							label='Скидка'
							error={!!errors.discount?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='stock'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='stock'
							label='Остаток'
							error={!!errors.stock?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='available'
					control={control}
					render={({ field }) => (
						<Autocomplete
							sx={{ width: 540 }}
							id='available'
							options={['true', 'false']}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Доступен'
									error={!!errors.stock?.message}
									{...field}
								/>
							)}
						/>
					)}
				/>
				<Controller
					name='wight'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='wight'
							label='Вес'
							error={!!errors.discount?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='description'
							label='Описание'
							error={!!errors.description?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='pictures'
					control={control}
					render={({ field }) => (
						<TextField
							sx={{ width: 540 }}
							id='pictures'
							label='Изображение'
							error={!!errors.pictures?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='isPublished'
					control={control}
					render={({ field }) => (
						<Autocomplete
							sx={{ width: 540 }}
							id='isPublished'
							options={['true', 'false']}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Опубилковано'
									error={!!errors.isPublished?.message}
									{...field}
								/>
							)}
						/>
					)}
				/>
				<DefaultYellowButton
					dataTestId={ADD_PRODUCT_SETTINGS_TEST_ID.SUBMIT_BUTTON}
					name={'Добавить товар'}
					type='submit'
					disabled={isLoading}
					loading={isLoading}
				/>
			</Box>
		</>
	)
}
