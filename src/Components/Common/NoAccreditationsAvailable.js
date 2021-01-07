import React, { Component } from 'react'

import ItemIcon from './ItemIcon'
import * as Strings from '../../Data/Strings'

export class NoAccreditationsAvailable extends Component {

  render() {

    return (
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          <ItemIcon size='6x' type='certificate' />
          <p>{Strings.ACCREDITATIONS_NO_ACCREDITATIONS_AVAILABLE}</p>
        </div>
      </div>
    )

  }
}

export default NoAccreditationsAvailable
