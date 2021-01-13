

export const ExtractFormDataToArray = (e) => {
  let formElements = [...e.target.elements]
  let formData = formElements.map(fieldData => (
    { [fieldData.id]: fieldData.value }
  ))
  return formData
}

const ExtractFormDataToObject = (e) => {

  let mergedData = ExtractFormDataToArray(e).reduce((formObject, newField) => {
    return {
      ...formObject,
      ...newField
    }}, {})

  delete mergedData[""]

  return mergedData
}

export default ExtractFormDataToObject
