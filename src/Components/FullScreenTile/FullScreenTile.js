import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './FullScreenTile.module.css'
import * as Strings from '../../Data/Strings'

export class FullScreenTile extends Component {
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.object,
  }


  render() {
    const text = this.props.text === undefined ? Strings.DEFAULT_FULL_SCREEN_TILE : this.props.text
    return (
      <div id='full-screen-tile' className={classes.fullScreenTile} style={{ minHeight: "50vh" }}>
        <img alt='' className={classes.icon} src={`/images/icons/${this.props.icon}.svg`}/>
        { text }
        { this.props.children ? this.props.children : null }
      </div>
    )
  }
}

export default FullScreenTile
