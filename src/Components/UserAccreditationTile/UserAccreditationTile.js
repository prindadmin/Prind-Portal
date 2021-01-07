import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../Data/Strings'

export class UserAccreditationTile extends Component {
  static propTypes = {
      accreditation: PropTypes.shape({
          issuedDate: PropTypes.string.isRequired,
          revocationDate: PropTypes.string,
          revocationReason: PropTypes.string,
          accreditationName: PropTypes.string.isRequired,
          subject: PropTypes.string.isRequired,
          issuer: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
      }).isRequired,
      proof: PropTypes.shape({
          keyName: PropTypes.string.isRequired,
          signature: PropTypes.string.isRequired,
          signingAlgorithm: PropTypes.string.isRequired,
          didVersion: PropTypes.number.isRequired,
          did: PropTypes.string.isRequired,
          entryHash: PropTypes.string.isRequired,
      }).isRequired,
      accreditationDid: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div id='user-accreditation-tile'>
        <h3>{ Strings.ACCREDITATION_NAME }: {this.props.accreditation.accreditationName}</h3>
        <p>{ Strings.ACCREDITATION_ISSUER }: {this.props.accreditation.issuer}</p>
        <p>{ Strings.ACCREDITATION_ISSUE_DATE }: {this.props.accreditation.issuedDate}</p>
        <p>{ Strings.ACCREDITATION_STATUS }: {this.props.accreditation.status}</p>
      </div>
    )
  }
}

export default UserAccreditationTile
