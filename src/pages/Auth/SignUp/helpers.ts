import * as yup from 'yup'
import { VALIDATOR_MESSAGE } from '../../../utils/constants'

export interface SignUpValues {
	email: string
	group: string
	password: string
}
export const signUpSchema = yup.object({
	email: yup
		.string()
		.email(VALIDATOR_MESSAGE.EMAIL_VALID)
		.required(VALIDATOR_MESSAGE.EMAIL_REQUIRED),
	group: yup
		.string()
		.lowercase()
		.required(VALIDATOR_MESSAGE.GROUP_REQUIRED)
		.strict(),
	password: yup
		.string()
		.min(6, VALIDATOR_MESSAGE.PASSWORD_MIN)
		.max(24, VALIDATOR_MESSAGE.PASSWORD_MAX)
		.required(VALIDATOR_MESSAGE.PASSWORD_REQUIRED),
})

export const SIGN_UP_SETTINGS_TEST_ID = {
	FORM: 'SIGN_UP_FORM',
}
