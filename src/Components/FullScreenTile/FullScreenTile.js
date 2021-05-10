import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './FullScreenTile.module.css'
import * as Strings from '../../Data/Strings'

export class FullScreenTile extends Component {
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.object
  }


  render() {
    const text = this.props.text === undefined ? Strings.DEFAULT_FULL_SCREEN_TILE : this.props.text
    const icon = this.props.icon === undefined ? '/images/icons/file-search.svg'  : `/images/icons/${this.props.icon}.svg`

    var style = { minHeight: "50vh" }
    if (this.props.style) {
      style = Object.assign(style, this.props.style)
    }

    return (
      <div id='full-screen-tile' className={classes.fullScreenTile} style={style}>
        <img alt='' className={classes.icon} src={icon} />
        { text }
        { this.props.children ? this.props.children : null }
      </div>
    )
  }
}

export default FullScreenTile
