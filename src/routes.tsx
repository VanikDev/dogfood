import { RouteObject } from 'react-router-dom'
import { App } from './App'
import {
	AddProductPage,
	AddReviewPage,
	CartPage,
	CatalogPage,
	DeleteProductPage,
	FavoritesPage,
	NotFoundPage,
	ProductPage,
	ProfileEditPage,
	ProfilePage,
	ResetPassPage,
	SignInPage,
	SignUpPage,
} from './pages'
import { PATH_NAME, pageNotFoundTitle } from './utils/constants'

export const routes: RouteObject[] = [
	{
		path: PATH_NAME.BASE,
		element: <App />,
		children: [
			{ index: true, element: <CatalogPage /> },
			{ path: PATH_NAME.PRODUCTS, element: <ProductPage /> },
			{ path: PATH_NAME.PROFILE, element: <ProfilePage /> },
			{ path: PATH_NAME.PROFILE_EDIT, element: <ProfileEditPage /> },
			{ path: PATH_NAME.FAVORITES, element: <FavoritesPage /> },
			{ path: PATH_NAME.REVIEW, element: <AddReviewPage /> },
			{ path: PATH_NAME.SIGN_IN, element: <SignInPage /> },
			{ path: PATH_NAME.SIGN_UP, element: <SignUpPage /> },
			{ path: PATH_NAME.RESET_PATH, element: <ResetPassPage /> },
			{ path: PATH_NAME.SEARCH, element: <CatalogPage /> },
			{ path: PATH_NAME.CART, element: <CartPage /> },
			{ path: PATH_NAME.PRODUCT, element: <AddProductPage /> },
			{ path: PATH_NAME.PRODUCT_DELETE, element: <DeleteProductPage /> },
			{
				path: PATH_NAME.NOT_FOUND,
				element: <NotFoundPage title={pageNotFoundTitle} />,
			},
		],
	},
]
