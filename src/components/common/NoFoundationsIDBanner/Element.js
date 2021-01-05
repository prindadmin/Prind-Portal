import React, { Component } from 'react'

import * as Strings from '../../../Data/Strings'

class NoFoundationsIDBanner extends Component {

  render () {

    return (
      <div id="no-foundations-id-banner" onClick={(e) => this.props.history.push("/foundations")}>
        <p>{Strings.NO_FOUNDATIONS_ID_BANNER_TEXT}</p>
      </div>
    )
  }
}

export default NoFoundationsIDBanner
