import React, { Component } from 'react'

import { Spinner } from '@blueprintjs/core'

import * as strings from '../../data/Strings'

// TODO: Improve the styling of this component

export class ProjectLoading extends Component {

  render() {

    return (
      <div className='project-loading-container fill'>
        <div className='project-loading'>
          <div className='section-spinner'>
            <Spinner size='100'/>
          </div>
          <div>
            {strings.PROJECT_LOADING}
          </div>
        </div>
      </div>
    )

  }
}

export default ProjectLoading
