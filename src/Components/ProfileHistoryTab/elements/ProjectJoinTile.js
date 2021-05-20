import React from 'react'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../../Data/Strings'

// TODO: FUTURE: Replace blueprintjs
const ProjectJoinTile = props => {

  const { details } = props
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const displayText = Strings.JOINED_PROJECT_TEXT
    .replace("XXX", details.projectName)
    .replace("YYY", details.dateTime.toLocaleDateString('en-GB', options))


  return (
    <Callout intent={Intent.WARNING} icon='new-person' title={Strings.TILE_PROJECT_JOINED}>
      { displayText }
    </Callout>
  )
}

export default ProjectJoinTile
