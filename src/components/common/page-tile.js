import React from 'react'

import { Callout } from '@blueprintjs/core'

// TODO: Move this into Sidebar (only use)

const ListItem = props => {
  const { pageName, selected, linkTo, history } = props
  let className = 'list-item-container'

  if (selected) {
    className += ' selected'
  }

  return (
    <Callout
      className={className}
      onClick={(e) => {
        history.push(`${linkTo}`)
      }}
    >
      <div className='details' >
        <h2>{pageName}</h2>
      </div>
    </Callout>
  )
}

export default ListItem
