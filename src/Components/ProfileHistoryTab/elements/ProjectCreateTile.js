import React from 'react'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../../Data/Strings'

// TODO: FUTURE: Replace blueprintjs
// TODO: Get Simon to fix the dateTime data that is sent; always a string of 0s at the moment
const ProjectCreateTile = props => {

  const { details } = props

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const displayText = Strings.CREATED_PROJECT_TEXT
    .replace("XXX", details.projectName)
    .replace("YYY", details.dateTime.toLocaleDateString('en-GB', options))


  return (
    <Callout intent={Intent.SUCCESS} icon='build' title={Strings.TILE_PROJECT_CREATED}>
      { displayText }
    </Callout>
  )
}

export default ProjectCreateTile
