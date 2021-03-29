
import * as Functions from './index'

it('check if webP supported should return false', () => {
  const result = Functions.checkIfWebpSupported()
  expect(result).toEqual(false);
})

it('get object from the url parameters', () => {
  const parameters = "?test=test1&test2=test12"

  const result = Functions.getObjectFromParameters(parameters)
  expect(result).toEqual({
    test: "test1",
    test2: "test12"
  });
})

it('get object throws error', () => {
  const parameters = ["hello", "world"]

  const result = Functions.getObjectFromParameters(parameters)
  expect(result).toEqual({});
})
