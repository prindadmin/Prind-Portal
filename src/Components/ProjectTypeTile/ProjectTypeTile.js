import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../Common/ItemIcon'
import * as Strings from '../../Data/Strings'

export class ProjectTypeTile extends Component {
  static propTypes = {
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div id='project-type-tile' onClick={(e) => this.props.onSelect(this.props.id)}>
        <div className='icon'><ItemIcon size='8x' type={ this.props.icon } /></div>
        <h2>{ this.props.name }</h2>
        <p>{ this.props.description }</p>
      </div>
    )
  }
}

export default ProjectTypeTile
