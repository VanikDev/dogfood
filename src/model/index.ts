import React from 'react'

export type WithChildren<T = void> = T extends void
	? React.FC<React.PropsWithChildren>
	: React.FC<React.PropsWithChildren<T>>

export interface User {
	name: string
	about: string
	avatar: string
	_id: string | null
	email: string
	group: string
	__v: number
}

export interface SignUpResponse extends Omit<User, '__v'> {
	password: string
	isAdmin: boolean
	token: string
}

export type SignInUserReponse = Omit<User, 'group' | '__v'>

export interface SignInReponse {
	data: SignInUserReponse
	token: string
}

export interface ResetPassResponse {
	message: string
}

export interface UpdateUser {
	name?: string
	about?: string
}

export interface Review {
	rating: number
	_id: string
	text: string
	author: User
	product: string
	created_at: string
	updated_at: string
	__v: number
}

export enum ProtuctTags {
	NEW = 'new',
	SALE = 'sale',
}

export interface Product {
	discount: number
	stock: number
	available?: boolean
	pictures: string
	likes?: string[]
	reviews?: Review[]
	tags?: ProtuctTags.NEW | ProtuctTags.SALE
	isPublished?: boolean
	_id: string
	name: string
	author?: User
	price: number
	wight: string
	description?: string
	created_at?: string
	updated_at?: string
	__v?: number
}

export interface Products {
	products: Product[]
	total: number
}

export interface CartProduct extends Product {
	quantity: number
}

export interface AddReview {
	_id?: string
	rating: number | null
	text: string
}

export interface DeleteReview {
	productId: string
	reviewId: string
}

export interface ProductsQueryParams {
	page?: number
	limit?: number
	query?: string
}

export interface ProductQueryParams {
	_id: string
	userId: string
}

export interface AddProduct
	extends Omit<
		Product,
		| '_id'
		| 'likes'
		| 'reviews'
		| 'author'
		| 'created_at'
		| 'updated_at'
		| '__v'
		| 'tags'
	> {
	tags: ProtuctTags[]
}
