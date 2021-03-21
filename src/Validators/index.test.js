
import * as Validators from './index'
import * as Strings from '../Data/Strings'

it('check if required returns the required string when passed undefined', () => {
  const result = Validators.required(undefined)
  expect(result).toEqual(Strings.REQUIRED);
})

it('check if required returns the required string when passed null', () => {
  const result = Validators.required(null)
  expect(result).toEqual(Strings.REQUIRED);
})

it('check if required returns the required string when passed nothing', () => {
  const result = Validators.required(null)
  expect(result).toEqual(Strings.REQUIRED);
})

it('check if required returns undefined when passed a string', () => {
  const result = Validators.required("hello, world")
  expect(result).toEqual();
})

it('check if email returns the required string when not an email address', () => {
  const result = Validators.email("hello world")
  expect(result).toEqual(Strings.NOT_A_VALID_EMAIL_ADDRESS);
})

it('check if email returns undefined when passed when an email address', () => {
  const result = Validators.email("hello@prind.tech")
  expect(result).toEqual(undefined);
})

it('check if minLength returns the required string when passed less than 8 character', () => {
  const result = Validators.minLength("hello")
  expect(result).toEqual(Strings.MIN_LENGTH_EIGHT);
})

it('check if minLength returns undefined when passed more than 8 character', () => {
  const result = Validators.minLength("hello world")
  expect(result).toEqual(undefined);
})

it('check if isValidPassword returns the required string when string is not complex enough', () => {
  const result = Validators.isValidPassword("hello world")
  expect(result).toEqual(Strings.PASSWORD_DOESNT_MATCH_CRITERIA);
})

it('check if isValidPassword returns undefined when string is complex enough', () => {
  const result = Validators.isValidPassword("Helloworld1")
  expect(result).toEqual(undefined);
})

it('check if maxLength32 returns the required string when string is too long', () => {
  const result = Validators.maxLength32("hello world hello world hello world hello world hello world")
  expect(result).toEqual(Strings.LONGER_THAN_32_CHARACTERS);
})

it('check if maxLength32 returns undefined when string is short enough', () => {
  const result = Validators.maxLength32("Helloworld1")
  expect(result).toEqual(undefined);
})

it('check if maxLength32 returns undefined when nothing is provided', () => {
  const result = Validators.maxLength32()
  expect(result).toEqual(undefined);
})

it('check if maxLength64 returns the required string when string is too long', () => {
  const result = Validators.maxLength64("hello world hello world hello world hello world hello world hello world hello world")
  expect(result).toEqual(Strings.LONGER_THAN_64_CHARACTERS);
})

it('check if maxLength64 returns undefined when string is short enough', () => {
  const result = Validators.maxLength64("Helloworld1")
  expect(result).toEqual(undefined);
})

it('check if maxLength64 returns undefined when nothing is provided', () => {
  const result = Validators.maxLength64()
  expect(result).toEqual(undefined);
})

it('check if passwordMatch returns true when strings match', () => {
  const result = Validators.passwordMatch(undefined, {password: "Helloworld1", passwordMatch: "Helloworld1"})
  expect(result).toEqual(null);
})

it('check if passwordMatch returns a string when strings don\'t match', () => {
  const result = Validators.passwordMatch(undefined, {password: "Helloworld1", passwordMatch: "Helloworld2"})
  expect(result).toEqual(Strings.PASSWORDS_DO_NOT_MATCH);
})

it('check if isEmailAddress returns a string when not a password', () => {
  const result = Validators.isEmailAddress("hello password")
  expect(result).toEqual(Strings.NOT_A_VALID_EMAIL_ADDRESS);
})

it('check if isEmailAddress returns undefined when it is passed a password', () => {
  const result = Validators.isEmailAddress("hello@prind.tech")
  expect(result).toEqual(undefined);
})

it('check if isEmailAddress returns undefined when passed nothing', () => {
  const result = Validators.isEmailAddress()
  expect(result).toEqual(undefined);
})
