import { ComponentType, FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store'
import { credentialsSelector } from '../store/selectors'

export const withProtection = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P> = (props) => {
		const { token } = useAppSelector(credentialsSelector)
		const location = useLocation()

		if (!token) {
			return (
				<Navigate
					to='/signin'
					state={{
						from: location.pathname,
					}}
				/>
			)
		}
		return <WrappedComponent {...props} />
	}
	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`
	return ReturnedComponent
}
