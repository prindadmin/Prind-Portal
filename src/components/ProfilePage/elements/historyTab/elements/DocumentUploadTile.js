import React from 'react'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../../../../data/Strings'

const DocumentUploadTile = props => {

  const { details } = props

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const displayText = strings.UPLOADED_DOCUMENT_TEXT
    .replace("XXX", details.filename)
    .replace("YYY", details.projectName)
    .replace("ZZZ", new Date(parseInt(details.dateTime) * 1000).toLocaleDateString('en-GB', options))


  return (
    <Callout intent={Intent.NONE} icon='folder-new' title={strings.TILE_DOCUMENT_UPLOADED}>
      { displayText }
    </Callout>
  )
}

export default DocumentUploadTile
