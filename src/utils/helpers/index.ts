import { Product } from '../../model'

export const getDiscount = (price: number, per: number) =>
	Math.round(price - (price / 100) * per)

export const pluralize = (count: number, words: string[]): string =>
	words[
		(count > 10 && count < 15) || !(count %= 10) || count > 4
			? 2
			: count > 1
			? 1
			: 0
	]

export const filterList = (list: Product[], pattern: string): Product[] =>
	list.filter(
		({ name }) => name && name.toLowerCase().includes(pattern.toLowerCase())
	)

export const getAverage = (nums: number[]): number =>
	Number((nums.reduce((a, b) => a + b) / nums.length).toFixed(1))

export const objectHasProperty = <P extends PropertyKey>(
	obj: unknown,
	prop: P
): obj is object & Record<P, unknown> => {
	return typeof obj === 'object' && !!obj && Object.hasOwn(obj, prop)
}

export const getMessageFromError = (
	error: unknown,
	defaultErrorMessage: string
) => {
	if (
		objectHasProperty(error, 'data') &&
		objectHasProperty(error.data, 'message') &&
		typeof error.data.message === 'string'
	)
		return error.data.message

	return defaultErrorMessage
}
