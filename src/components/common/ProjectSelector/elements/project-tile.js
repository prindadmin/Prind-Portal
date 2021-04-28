import React from 'react'

import { Callout } from '@blueprintjs/core'
import ItemIcon from '../../ItemIcon'

import * as Strings from '../../../../Data/Strings'

// TODO: FUTURE: Add ability to display thumbnails or icon for project
// TODO: FUTURE: Add styling as per project team member tiles (drop shadow, etc)
const ProjectTile = props => {
  const { project, selected, onSelect } = props
  let className = 'site-select-tile'
  let bodyText = project.projectDescription


  if (bodyText === undefined) {
    bodyText = Strings.NO_PROJECT_DESCRIPTION
  }

  if (bodyText > 300) {
    bodyText = bodyText.substr(0,297) + '...'
  }

  if (selected) {
    className += ' selected'
  }

  return (
    <Callout className={className} onClick={(e) => onSelect(project, e)}>
      <ItemIcon size='4x' type='home' />
      <div className='details' >
        <h4>{project.projectName}</h4>
        <span>{bodyText}</span><br />
      </div>
    </Callout>
  )
}

export default ProjectTile
