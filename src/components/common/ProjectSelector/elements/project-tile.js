import React from 'react'

import { Callout } from '@blueprintjs/core'
import ItemIcon from '../../ItemIcon'

import * as strings from '../../../../data/Strings'

// TODO: FUTURE: Tidy site tiles

const ProjectTile = props => {
  const { project, selected } = props
  let className = 'site-select-tile'
  let bodyText = project.projectDescription


  if (bodyText === undefined) {
    bodyText = strings.NO_PROJECT_DESCRIPTION
  }

  if (bodyText > 300) {
    bodyText = bodyText.substr(0,297) + '...'
  }

  if (selected) {
    className += ' selected'
  }

  return (
    <Callout className={className}>
      <ItemIcon size='4x' type='building' />
      <div className='details' >
        <h4>{project.projectName}</h4>
        <span>{bodyText}</span><br />
      </div>
    </Callout>
  )
}

export default ProjectTile
