import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faIndustry,
  faCity,
  faDownload,
  faCaretDown,
  faCaretUp,
  faHome,
  //faLock
} from '@fortawesome/free-solid-svg-icons'

import {
  faLockAlt,
  faEdit,
} from '@fortawesome/pro-solid-svg-icons'

import {
  faBars,
  faFileCertificate,
  faColumns,
} from '@fortawesome/pro-regular-svg-icons'


import {
  faCheckCircle,
  faTimesCircle,
  faCircle,
} from '@fortawesome/free-regular-svg-icons'

let icons = {
  home: faHome,
  building: faIndustry,
  burger: faBars,
  city: faCity,
  timesCircle: faTimesCircle,
  unticked: faCircle,
  ticked: faCheckCircle,
  download: faDownload,
  caretDown: faCaretDown,
  caretUp: faCaretUp,
  lock: faLockAlt,
  certificate: faFileCertificate,
  columns: faColumns,
  edit: faEdit,
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
