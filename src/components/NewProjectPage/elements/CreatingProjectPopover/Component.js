import React, { Component } from 'react'
//import PropTypes from 'prop-types'

import PopOverHandler from '../../../common/popOverHandler'

import {
  Spinner,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
  }

  getContent = () => {
    return (
      <React.Fragment>
        {strings.PROJECT_CREATION_BILLING_WARNING}
        <Spinner size='150' intent={Intent.DANGER}/>
      </React.Fragment>
    )
  }

  render () {
    return (
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => e.stopPropagation()}>
          <div id='project-creation-popover'>
            <div id='popup-box'>
              <div className='project-creation-popover-container' onClick={(e) => e.stopPropagation()}>
                <div className='element-title'>
                  {strings.PROJECT_CREATION_IN_PROGRESS}
                </div>
                <div className='element-description'>
                  {this.getContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }

}

export default Element
