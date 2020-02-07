import React, { Component } from 'react'

import { Spinner, Intent } from '@blueprintjs/core'

import * as strings from '../../data/Strings'

export class ProjectLoading extends Component {

  render() {

    return (
      <div className='project-loading-container fill'>
        <div className='project-loading'>
          <div className='section-spinner'>
            <Spinner size='100' intent={Intent.PRIMARY}/>
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
