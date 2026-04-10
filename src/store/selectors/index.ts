import { RootState } from '../index'
import {
	CartStateProps,
	CountersStateProps,
	CredentialsStateProps,
} from '../slices'

export const credentialsSelector = (state: RootState): CredentialsStateProps =>
	state.credentials

export const countersSelector = (state: RootState): CountersStateProps =>
	state.counters

export const cartSelector = (state: RootState): CartStateProps => state.cart
