import React, { Component } from 'react'

import { Spinner } from '@blueprintjs/core'

export class SpinnerSection extends Component {


  render() {
    return (
      <div className='spinner-section'>
        <div className='spinner'>
          <Spinner size='100' />
        </div>
      </div>
    )
  }

}

export default SpinnerSection
