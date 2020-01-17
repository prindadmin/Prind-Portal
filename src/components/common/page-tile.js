import React from 'react'

import { Callout } from '@blueprintjs/core'

const ListItem = props => {
  const { pageDetails, selected } = props
  let className = 'list-item-container'

  if (selected) {
    className += ' selected'
  }

  return (
    <Callout className={className}>
      <div className='details' >
        <h2>{pageDetails.name}</h2>
      </div>
    </Callout>
  )
}

export default ListItem
