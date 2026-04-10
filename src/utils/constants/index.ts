export const PATH_NAME = {
	BASE: '/',
	PRODUCTS: '/products/:id',
	PROFILE: '/profile/',
	PROFILE_EDIT: '/profile/edit',
	FAVORITES: '/favorites/',
	REVIEW: '/products/:id/review',
	SIGN_IN: '/signin/',
	RESET_PATH: '/signin/reset',
	SIGN_UP: '/signup/',
	SEARCH: '/search/:searchTemplate',
	CART: '/cart/',
	PRODUCT: '/product/add',
	PRODUCT_DELETE: '/product/delete',
	NOT_FOUND: '*',
}

export const API_URL = 'https://api.react-learning.ru'

export const VALIDATOR_MESSAGE = {
	EMAIL_VALID: 'Email должен быть действительным',
	EMAIL_REQUIRED: 'Email обязательное поле',
	GROUP_REQUIRED: 'Группа обязательное поле',
	PASSWORD_REQUIRED: 'Пароль обязательное поле',
	PASSWORD_MIN: 'Минимальная длина пароля 6 символов',
	PASSWORD_MAX: 'Максимальная длина пароля 24 символа',
}

export const PAGINATION = {
	PAGE: 1,
	LIMIT: 16,
}

export const defaultErrorMessage =
	'Unknown error when trying to load list of posts'

export const pageNotFoundTitle =
	'Простите, запрашиваемая вами страница не найдена'

export const productNotFoundTitle =
	'Простите, по вашему запросу товаров не найдено'

export const cartEmptyTitle = 'В корзине нет товаров'
export const cartEmptySubtitle =
	'Добавьте товар, нажав кнопку «В корзину» в карточке товара'
