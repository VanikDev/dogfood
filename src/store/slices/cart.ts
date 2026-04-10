import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartProduct } from '../../model'

export interface CartStateProps {
	products: CartProduct[]
}
const initialState: CartStateProps = {
	products: [],
}

export const { actions: cartActions, reducer: cartReducer } = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action: PayloadAction<CartProduct>) {
			const productAdded = state.products.find(
				(product) => product._id === action.payload._id
			)

			if (productAdded?.quantity) {
				productAdded.quantity++
			} else {
				state.products.push({
					...action.payload,
					quantity: 1,
				})
			}
		},
		increaseProduct: (state, action: PayloadAction<CartProduct>) => {
			const productExist = state.products.find(
				(product) => product._id === action.payload._id
			)

			if (productExist?.quantity) {
				productExist.quantity++
			} else {
				state.products.push({
					...action.payload,
					quantity: 1,
				})
			}
		},
		decreaseProduct: (state, action: PayloadAction<CartProduct>) => {
			const productExist = state.products.find(
				(product) => product._id === action.payload._id
			)
			if (productExist?.quantity === 1) {
				productExist.quantity = 1
			} else if (productExist?.quantity) {
				productExist.quantity--
			}
		},
		removeProduct: (state, action: PayloadAction<CartProduct['_id']>) => {
			state.products = state.products.filter(
				(product) => product._id !== action.payload
			)
		},
		clearCart: (state) => {
			state.products = initialState.products
		},
	},
})
