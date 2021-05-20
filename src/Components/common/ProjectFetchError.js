import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from './ItemIcon'
import * as Strings from '../../Data/Strings'

export class ProjectFetchError extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {

    var text = Strings.PROJECT_FETCH_ERROR_DOES_NOT_EXIST

    if (this.props.text) {
      text = this.props.text
    }

    return (
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          <ItemIcon size='6x' type='lock' />
          <p>{ text }</p>
        </div>
      </div>
    )

  }
}

export default ProjectFetchError
