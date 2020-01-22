import React from 'react'

import { Callout } from '@blueprintjs/core'

import ItemIcon from '../../ItemIcon'

// TODO: FUTURE: Tidy site tiles

const ProjectTile = props => {
  const { project, selected } = props
  let className = 'site-select-tile'
  let bodyText = project.description

  if (project.description.length > 300) {
    bodyText = project.description.substr(0,297) + '...'
  }

  if (selected) {
    className += ' selected'
  }

  return (
    <Callout className={className}>
      <ItemIcon size='4x' type='building' />
      <div className='details' >
        <h4>{project.name}</h4>
        <span>{bodyText}</span><br />
      </div>
    </Callout>
  )
}

export default ProjectTile
