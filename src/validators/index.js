import validator from 'validator'

export const required = value => (value ? undefined : 'Required')

export const email = value => validator.isEmail(value) ? undefined : 'Not Valid Email'

export const minLength = value => (value.length >= 8 ? undefined : 'Min Length 8')

export const isValidPassword = value => {
  //const alphanumericAndSpecial = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
  const alphanumericOnly = /^(?=.*[0-9])[a-zA-Z0-9]/
  const hasUppercase = /[A-Z]/

  return value.length >= 8 &&
    alphanumericOnly.test(value) &&
    hasUppercase.test(value) ? undefined : 'Password must be at least 8 characters in length and contain at least one lowercase, one uppercase, and one digit'
}

export const maxLength32 = value => {
  if (value) {
    return value.length < 32 ? undefined : `Not more then 32 characters allowed`
  }
  return undefined
}

export const maxLength64 = value => {
  if (value) {
    return value.length < 64 ? undefined : `Not more then 64 characters allowed`
  }
  return undefined
}

export const passwordMatch = (value, values) => {
  return values.password !== values.passwordMatch && 'Passwords must match'
}

export const isEmailAddress = value => {
  if (value) {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? undefined : `Not a valid email address`
  }
  return undefined
}
