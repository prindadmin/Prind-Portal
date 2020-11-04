import React, { Component } from 'react'

import ItemIcon from './ItemIcon'
import * as Strings from '../../Data/Strings'

export class ProjectFetchError extends Component {

  render() {

    return (
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          <ItemIcon size='6x' type='lock' />
          <p>{ Strings.PROJECT_FETCH_ERROR_OCCURED }</p>
        </div>
      </div>
    )

  }
}

export default ProjectFetchError
