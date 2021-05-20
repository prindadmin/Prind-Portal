
export function GetObjectFromParameters(parameters) {
  try {
    // Remove the leading question mark if provided
    var inputParams = parameters.startsWith('?') ? parameters.substring(1) : parameters
    var parametersObject = inputParams.split("&").reduce((tempObject, parameter) => {
      var key = parameter.substring(0, parameter.indexOf("="))
      var value = parameter.substring(parameter.indexOf("=") + 1)
      tempObject[key] = value
      return tempObject
    }, {})
    return parametersObject
  } catch (e) {
    return {}
  }
}

export default GetObjectFromParameters 
