import React from 'react'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../../../../data/Strings'

const ProjectJoinTile = props => {

  const { details } = props

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const displayText = strings.JOINED_PROJECT_TEXT
    .replace("XXX", details.projectName)
    .replace("YYY", new Date(parseInt(details.dateTime) * 1000).toLocaleDateString('en-GB', options))


  return (
    <Callout intent={Intent.WARNING} icon='new-person' title={strings.TILE_PROJECT_CREATED}>
      { displayText }
    </Callout>
  )
}

export default ProjectJoinTile
