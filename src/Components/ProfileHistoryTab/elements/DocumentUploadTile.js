import React from 'react'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../../Data/Strings'

// TODO: FUTURE: Replace blueprintjs
const DocumentUploadTile = props => {

  const { details } = props
  console.log(details)

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const displayText = Strings.UPLOADED_DOCUMENT_TEXT
    .replace("XXX", details.filename)
    .replace("YYY", details.projectName)
    .replace("ZZZ", details.dateTime.toLocaleDateString('en-GB', options))


  return (
    <Callout intent={Intent.DANGER} icon='folder-new' title={Strings.TILE_DOCUMENT_UPLOADED}>
      { displayText }
    </Callout>
  )
}

export default DocumentUploadTile
