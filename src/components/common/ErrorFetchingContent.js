import React, { Component } from 'react'

import ItemIcon from './ItemIcon'
import * as Strings from '../../Data/Strings'

export class ErrorFetchingContent extends Component {
  render() {
    return (
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          <ItemIcon size='6x' type='timesCircle' />
          <p>{Strings.UNABLE_TO_FETCH_CONTENT}</p>
        </div>
      </div>
    )

  }
}

export default ErrorFetchingContent
