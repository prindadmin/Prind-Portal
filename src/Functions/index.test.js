
import * as Functions from './index'

it('check if webP supported should return false', () => {
  const result = Functions.checkIfWebpSupported()
  expect(result).toEqual(false);
})
