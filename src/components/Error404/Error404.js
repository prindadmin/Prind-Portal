import React, { Component } from 'react'

import * as Strings from '../../Data/Strings'

export class Error404 extends Component {

  render () {
    return (
      <div id='error-page' className='full-height full-width'>
        <h1>{Strings.ERROR_404_MESSAGE}</h1>
      </div>
    )
  }
}

export default Error404
