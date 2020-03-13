import React from 'react'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../../../../data/Strings'

const DocumentSignedTile = props => {

  const { details } = props

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const displayText = strings.SIGNED_DOCUMENT_TEXT
    .replace("XXX", details.filename)
    .replace("YYY", details.projectName)
    .replace("ZZZ", new Date(details.dateTime).toLocaleDateString('en-GB', options))


  return (
    <Callout intent={Intent.PRIMARY} icon='tick' title={strings.TILE_DOCUMENT_SIGNED}>
      { displayText }
    </Callout>
  )
}

export default DocumentSignedTile
