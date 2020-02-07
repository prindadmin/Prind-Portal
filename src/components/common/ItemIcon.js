import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faIndustry,
  faCity,
} from '@fortawesome/free-solid-svg-icons'

let icons = {
  building: faIndustry,
  city: faCity,
}

const ItemIcon = props => {
  const ico = <FontAwesomeIcon icon={icons[props.type]} size={props.size} color={props.color}/>

  return (
    <Icon icon={ico} />
  )
}

ItemIcon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string
}

export default ItemIcon
