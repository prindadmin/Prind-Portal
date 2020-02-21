import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Spinner, Intent } from '@blueprintjs/core'

import * as strings from '../../data/Strings'

export class ProjectLoading extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  constructor(props) {
    super()
    var text = strings.PROJECT_LOADING

    if (props.text !== undefined && props.text !== "") {
      text = props.text
    }

    this.state = {
      text
    }

  }


  render() {

    return (
      <div className='project-loading-container fill'>
        <div className='project-loading'>
          <div className='section-spinner'>
            <Spinner size='100' intent={Intent.PRIMARY}/>
          </div>
          <div>
            {this.state.text}
          </div>
        </div>
      </div>
    )

  }
}

export default ProjectLoading
