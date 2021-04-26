import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      <div id='full-screen-tile' className='full-height full-width center-content' style={{ minHeight: "50vh" }}>
        <img alt='' src={`/images/icons/${this.props.icon}.svg`}/>
        { text }
        { this.props.children ? this.props.children : null }
      </div>
    )
  }
}

export default FullScreenTile
