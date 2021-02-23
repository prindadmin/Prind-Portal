import React, { Component } from 'react'

export class FooterBar extends Component {
  render() {
    return (
      <div id='footer-bar' className='col-12'>
        <div className='footer-content row'>
          <div className='footer-text col'>
            <a href='https://buildingim.com' target="_blank" rel="noopener noreferrer">Secured with Foundations™</a>
          </div>
        </div>
      </div>
    )
  }
}

export default FooterBar
