import { Component } from 'react'

import PopOverHandler from '../Common/popOverHandler'
import LoadingSpinner from '../Common/LoadingSpinnerCSS'

import classes from './LoadingOverlay.module.css'

export class LoadingOverlay extends Component {

  render() {
    return (
      <PopOverHandler>
        <div className={classes.fullScreenCenterChildren}>
          <LoadingSpinner size={256} />
        </div>
      </PopOverHandler>
    )
  }
}
