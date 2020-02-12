import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  InputGroup,
  Button,
  Intent,
} from '@blueprintjs/core'

import ItemIcon from '../ItemIcon'

import PopOverHandler from '../popOverHandler'

import * as strings from '../../../data/Strings'

// TODO: Implement 'editable' prop.  i.e. make field locked when editable = false
// TODO: Future: Make this wait for response before closing

export class Element extends Component {
  static propTypes = {
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    onClosePopover: PropTypes.func.isRequired,
  }

  /*
  constructor() {
    super()
    this.state = {
    }
  }
  */

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------


  // Trigger the closing of the popover
  closePopover = () => {
    this.props.onClosePopover()
  }

  createField = (e) => {
    console.log("create field button pressed")

    // TODO: Functional code here

    e.stopPropagation()
    this.closePopover()
  }


  getForm = () => {

    const { handleSubmit } = this.props

    return (
      <div className='container'>
        <form onSubmit={handleSubmit(this.createField)} className='create-field-form'>
          "hello world"
        </form>
      </div>
    )
  }


  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    return (
      <PopOverHandler>
        <div id='popup-greyer'>
          <div id='pick-signer-popover'>
            <div id='popup-box'>
              <div className='pick-signer-popover-container' onClick={(e) => {
                this.closePopover()
                e.stopPropagation()
                }}>
                <div className='element-title'>
                  {strings.CREATE_CUSTOM_FIELD}
                </div>
                <div className='element-description'>
                  {this.getForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }
}

Element = reduxForm({
  enableReinitialize: true
})(Element)

export default Element
