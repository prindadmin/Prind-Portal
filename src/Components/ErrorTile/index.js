import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './ErrorTile.module.css'

export class ErrorTile extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const icon = '/images/icons/error.svg'
    return (
      <div id='error-tile' className={classes.errorTile}>
        <img alt='' className={classes.icon} src={icon} />
        { this.props.text }
      </div>
    )
  }
}

export default ErrorTile
