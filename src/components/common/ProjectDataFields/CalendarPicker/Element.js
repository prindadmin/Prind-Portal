import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FileInput,
  Button,
} from '@blueprintjs/core'


import * as strings from '../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fieldDetails: PropTypes.object.isRequired,
    })
  }

  constructor() {
    super()
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------



  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { title, description, fieldDetails } = this.props.elementContent

    return (
      <div id='drop-down-element'>
        <div className={'drop-down-element-container'}>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>

            <div className='row'>
              <div className='col'>
                Calendar picker here
              </div>
              <div className='col'>
                Button to save here
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Element
