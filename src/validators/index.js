import validator from 'validator'
import * as Strings from '../Data/Strings'

export const required = value => (value ? undefined : Strings.REQUIRED)

export const email = value => validator.isEmail(value) ? undefined : Strings.NOT_A_VALID_EMAIL_ADDRESS

export const minLength = value => (value.length >= 8 ? undefined : Strings.MIN_LENGTH_EIGHT)

export const isValidPassword = value => {
  //const alphanumericAndSpecial = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])/
  //const alphanumericOnly = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/
  const hasUppercase = /[A-Z]/
  const hasLowercase = /[a-z]/
  const hasDigit = /[0-9]/

  return value.length >= 8 &&
    hasLowercase.test(value) &&
    hasUppercase.test(value) &&
    hasDigit.test(value) ? undefined : Strings.PASSWORD_DOESNT_MATCH_CRITERIA
}

export const maxLength32 = value => {
  if (value) {
    return value.length < 32 ? undefined : Strings.LONGER_THAN_32_CHARACTERS
  }
  return undefined
}

export const maxLength64 = value => {
  if (value) {
    return value.length < 64 ? undefined : Strings.LONGER_THAN_64_CHARACTERS
  }
  return undefined
}

export const passwordMatch = (value, values) => {
  return values.password === values.passwordMatch ? null : Strings.PASSWORDS_DO_NOT_MATCH
}

export const isEmailAddress = value => {
  if (value) {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? undefined : Strings.NOT_A_VALID_EMAIL_ADDRESS
  }
  return undefined
}
