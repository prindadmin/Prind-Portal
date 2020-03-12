import React, { Component } from 'react'

import * as strings from '../../../data/Strings'

class NoFoundationsIDBanner extends Component {

  render () {

    return (
      <div id="no-foundations-id-banner" onClick={(e) => this.props.history.push("Foundations")}>
        <p>{strings.NO_FOUNDATIONS_ID_BANNER_TEXT}</p>
      </div>
    )
  }
}

export default NoFoundationsIDBanner
