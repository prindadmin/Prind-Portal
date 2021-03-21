import React, { Component } from 'react'

import ItemIcon from './ItemIcon'
import * as Strings from '../../Data/Strings'

export class NoProjectSelected extends Component {
  render() {
    return (
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          <ItemIcon size='6x' type='home' />
          <p>{Strings.NO_PROJECT_SELECTED}</p>
        </div>
      </div>
    )
  }
}

export default NoProjectSelected
