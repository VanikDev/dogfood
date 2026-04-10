import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import { Badge } from '@mui/material'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'
import { IconCart, IconProfile, Logo } from '../../assets/images/svg'
import { SearchBar } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store'
import {
	cartSelector,
	countersSelector,
	credentialsSelector,
} from '../../store/selectors'
import {
	cartActions,
	countersActions,
	credentialsActions,
} from '../../store/slices'
import { PATH_NAME } from '../../utils/constants'
import s from './Header.module.css'
import { HEADER_SETTINGS_TEST_ID } from './helpers'

export const Header: React.FC = () => {
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()
	const { token } = useAppSelector(credentialsSelector)
	const { favoritesCounter } = useAppSelector(countersSelector)
	const { products: productsCart } = useAppSelector(cartSelector)
	const [cartCounter, setCartCounter] = useState(0)

	const handleLogout = useCallback(() => {
		dispatch(credentialsActions.setToken(null))
		dispatch(countersActions.setFavoritesCounter(0))
		dispatch(cartActions.clearCart())
	}, [])

	useEffect(() => {
		const allQuantity = productsCart
			.map((product) => product.quantity)
			.reduce((a, b) => a + b, 0)
		setCartCounter(allQuantity)
	}, [productsCart])

	const getPath = useCallback(
		(pathName: string) => (!token ? PATH_NAME.BASE : pathName),
		[token]
	)

	return (
		<header
			className={cn(s.header)}
			data-testid={HEADER_SETTINGS_TEST_ID.HEADER}>
			<Container
				maxWidth='lg'
				sx={{ display: 'flex' }}
				className={cn(s.header__wrapper)}>
				<Link
					to={PATH_NAME.BASE}
					data-testid={HEADER_SETTINGS_TEST_ID.BASE_LINK}>
					<Logo dataTestId={HEADER_SETTINGS_TEST_ID.LOGO} />
				</Link>
				<SearchBar
					dataTestId={HEADER_SETTINGS_TEST_ID.SEARCH_INPUT}
					disabled={!token}
				/>
				<div
					className={cn(s.header__icons)}
					data-testid={HEADER_SETTINGS_TEST_ID.GROUP_ICONS}>
					<Link
						to={getPath(PATH_NAME.FAVORITES)}
						state={{ location: pathname }}
						data-testid={HEADER_SETTINGS_TEST_ID.FAVORITES_LINK}>
						<Tooltip title='Избранное' sx={{ p: 0 }}>
							<IconButton disabled={!token}>
								<Badge
									badgeContent={favoritesCounter}
									color='success'>
									<FavoriteBorderRoundedIcon />
								</Badge>
							</IconButton>
						</Tooltip>
					</Link>
					<Link
						to={getPath(PATH_NAME.CART)}
						state={{ location: pathname }}
						data-testid={HEADER_SETTINGS_TEST_ID.CART_LINK}>
						<Tooltip title='Корзина' sx={{ p: 0 }}>
							<IconButton>
								<Badge
									badgeContent={cartCounter}
									color='success'>
									<IconCart />
								</Badge>
							</IconButton>
						</Tooltip>
					</Link>
					<Link
						to={getPath(PATH_NAME.PROFILE)}
						state={{ location: pathname }}
						data-testid={HEADER_SETTINGS_TEST_ID.PROFILE_LINK}>
						<Tooltip title='Профиль' sx={{ p: 0 }}>
							<IconButton>
								<IconProfile />
							</IconButton>
						</Tooltip>
					</Link>
					{token && (
						<Tooltip title='Выйти' sx={{ p: 0 }}>
							<IconButton onClick={handleLogout}>
								<LogoutIcon />
							</IconButton>
						</Tooltip>
					)}
				</div>
			</Container>
		</header>
	)
}
