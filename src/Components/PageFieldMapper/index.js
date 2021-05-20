import React from 'react'

import { DropDown, LongText, GitText } from '../Common/ProjectDataFields'
import * as PageFields from '../PageFields'

const PageFieldMapper = props => {

  const { singleField, pageName, projectId } = props

  if (singleField.type === 'file') {

    return <PageFields.FileUpload
              key={singleField.id}
              elementContent={singleField}
              pageName={pageName}
              projectId={projectId}
              />
  }

  if (singleField.type === 'dropdown') {
    return <DropDown
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              initialValues={singleField.fieldDetails}
              pageName={pageName}
              projectId={projectId}
              />
  }

  if (singleField.type === 'calendar') {
    return <PageFields.CalendarPicker
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              pageName={pageName}
              projectId={projectId}
              />
  }

  if (singleField.type === 'longText') {
    return <LongText
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              initialValues={singleField.fieldDetails}
              pageName={pageName}
              projectId={projectId}
              />
  }

  if (singleField.type === 'gitText') {
    return <GitText
              key={singleField.id}
              form={"field-" + singleField.id}
              elementContent={singleField}
              pageName={pageName}
              projectId={projectId}
              />
  }

  return null
}

export default PageFieldMapper
