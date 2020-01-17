import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProviderDetails from './elements/provider-details'

export class TrainingPage extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }

  render() {

    const { pageDetails } = this.props
    const { providers } = this.props.pageDetails

    return(
      <div id='generic-page'>
        <div className='page-title'>
          <h1>{pageDetails.title}</h1>
          <span>{pageDetails.description}</span>
        </div>

        {
          providers != null ? providers.map((singleProvider) => {

              return (
                <div className='form' key={singleProvider.id}>
                  <ProviderDetails details={singleProvider} />
                  <hr />
                </div>
              )
            }

          ) : null
        }

        </div>
    )
  }
}

export default TrainingPage
