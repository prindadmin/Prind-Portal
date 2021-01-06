import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as strings from '../../Data/Strings'

export class UserAccreditationTile extends Component {
  static propTypes = {
      accreditation: PropTypes.shape({
          issuedDate: PropTypes.string.isRequired,
          revocationDate: PropTypes.string.isRequired,
          revocationReason: PropTypes.string.isRequired,
          accreditationName: PropTypes.string.isRequired,
          subject: PropTypes.string.isRequired,
          issuer: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
      }).isRequired,
      proof: PropTypes.shape({
          keyName: PropTypes.string.isRequired,
          signature: PropTypes.string.isRequired,
          signingAlgorithm: PropTypes.string.isRequired,
          didVersion: PropTypes.string.isRequired,
          did: PropTypes.string.isRequired,
          entryHash: PropTypes.string.isRequired,
      }).isRequired,
      accreditationDid: PropTypes.string.isRequired,
  }

  // TODO: CONTINUE HERE

  render() {
    return (
      <React.Fragment>
        <p>Hello, user accreditation!</p>
        <p>{this.props.accreditation.accreditationName}</p>
      </React.Fragment>
    )
  }
}

export default UserAccreditationTile
