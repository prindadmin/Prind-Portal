import React from 'react'

import { Callout } from '@blueprintjs/core'

const ListItem = props => {
  const { pageName, selected } = props
  let className = 'list-item-container'

  if (selected) {
    className += ' selected'
  }

  return (
    <Callout className={className}>
      <div className='details' >
        <h2>{pageName}</h2>
      </div>
    </Callout>
  )
}

export default ListItem
