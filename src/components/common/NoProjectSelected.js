import React, { Component } from 'react'

import * as strings from '../../data/Strings'

// TODO: Improve the styling of this component

export class NoProjectSelected extends Component {

  render() {

    return (
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          {strings.NO_PROJECT_SELECTED}
        </div>
      </div>
    )

  }
}

export default NoProjectSelected
