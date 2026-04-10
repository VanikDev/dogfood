import * as yup from 'yup'

export interface addProductValues {
	name: string
	price: number
	discount: number
	stock: number
	available: boolean
	wight: string
	description: string
	pictures: string
	isPublished: boolean
}

export const addProductSchema = yup.object({
	name: yup.string().required(),
	price: yup.number().required(),
	discount: yup.number().required(),
	stock: yup.number().required(),
	available: yup.boolean().required(),
	wight: yup.string().required(),
	description: yup.string().required(),
	pictures: yup.string().required(),
	isPublished: yup.boolean().required(),
})

export const ADD_PRODUCT_SETTINGS_TEST_ID = {
	PRODUCT: 'PRODUCT',
	SUBMIT_BUTTON: 'PRODUCT_SUBMIT_BUTTON',
}
