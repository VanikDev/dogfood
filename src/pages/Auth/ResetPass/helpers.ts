import * as yup from 'yup'
import { VALIDATOR_MESSAGE } from '../../../utils/constants'

export interface ResetPassValues {
	email: string
}

export const resetPassSchema = yup.object({
	email: yup
		.string()
		.email(VALIDATOR_MESSAGE.EMAIL_VALID)
		.required(VALIDATOR_MESSAGE.EMAIL_REQUIRED),
})

export const RESET_PASS_SETTINGS_TEST_ID = {
	FORM: 'RESET_PASS_FORM',
}
