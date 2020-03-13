import React, { Component } from 'react'

import * as strings from '../../data/Strings'

export class Error404 extends Component {

  componentDidMount () {
  }


  render () {
    return (
      <div id='error-page' className='full-height full-width'>
        <h1>{strings.ERROR_404_MESSAGE}</h1>
      </div>
    )
  }
}

export default Error404
