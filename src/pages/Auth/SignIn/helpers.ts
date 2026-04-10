import * as yup from 'yup'
import { VALIDATOR_MESSAGE } from '../../../utils/constants'

export interface SignInValues {
	email: string
	password: string
}

export const signInSchema = yup.object({
	email: yup
		.string()
		.email(VALIDATOR_MESSAGE.EMAIL_VALID)
		.required(VALIDATOR_MESSAGE.EMAIL_REQUIRED),
	password: yup
		.string()
		.min(6, VALIDATOR_MESSAGE.PASSWORD_MIN)
		.max(24, VALIDATOR_MESSAGE.PASSWORD_MAX)
		.required(VALIDATOR_MESSAGE.PASSWORD_REQUIRED),
})

export const SIGN_IN_SETTINGS_TEST_ID = {
	FORM: 'SIGN_IN_FORM',
	EMAIL_FIELD: 'SIGN_IN_EMAIL_FIELD',
	PASSWORD_FIELD: 'SIGN_IN_PASSWORD_FIELD',
	SUBMIT_BTN: 'SIGN_IN_SUBMIT_BTN',
}
