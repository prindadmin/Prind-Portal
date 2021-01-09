import React from 'react'

import { FileUpload, DropDown, CalendarPicker, LongText, GitText } from '../Common/ProjectDataFields'

const PageFieldMapper = props => {

  const { singleField } = props
  const pageName = props.pageName

  if (singleField.type === 'file') {
    return <FileUpload
              key={singleField.id}
              elementContent={singleField}
              pageName={pageName}
              />
  }

  if (singleField.type === 'dropdown') {
    return <DropDown
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              initialValues={singleField.fieldDetails}
              pageName={pageName}
              />
  }

  if (singleField.type === 'calendar') {
    return <CalendarPicker
              key={singleField.id}
              elementContent={singleField}
              pageName={pageName}
              />
  }

  if (singleField.type === 'longText') {
    return <LongText
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              initialValues={singleField.fieldDetails}
              pageName={pageName}
              />
  }

  if (singleField.type === 'gitText') {
    return <GitText
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              pageName={pageName}
              />
  }

  return null
}

export default PageFieldMapper
