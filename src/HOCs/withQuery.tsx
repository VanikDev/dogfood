import { ComponentType, FC } from 'react'
import { Loading } from '../components'
import { Error } from '../components/Error'

interface WithQueryProps {
	isLoading: boolean
	isError: boolean
	refetch: () => void
	error?: string
}

export const withQuery = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<WithQueryProps & P> = (props) => {
		const { isError, isLoading, refetch, error, ...rest } = props

		if (isError) {
			return <Error refetch={refetch} error={error} />
		}
		if (isLoading) {
			return <Loading />
		}
		return <WrappedComponent {...(rest as P)} />
	}

	ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`
	return ReturnedComponent
}
