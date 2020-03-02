import React, { Component } from 'react'

export class Error404 extends Component {

  componentDidMount () {
  }


  render () {
    return (
      <div id='error-page' className='full-height full-width'>
        <h1>Error 404: This resource was not found</h1>
      </div>
    )
  }
}

export default Error404
