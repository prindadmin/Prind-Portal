import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../../formInputs'
import * as Strings from '../../../../Data/Strings'

export class LongText extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fieldDetails: PropTypes.shape({
        textValue: PropTypes.string,
      }).isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super()

    var textValue = ''

    if (props.elementContent.fieldDetails !== undefined) {
      textValue = props.elementContent.fieldDetails.textValue
    }

    this.state = {
      updateInProgress: false,
      updateError: false,
      errorText: "",
      textValue
    }
  }

  componentDidUpdate(prevProps) {
    const { fieldDetails } = this.props.elementContent

    if(fieldDetails !== prevProps.elementContent.fieldDetails) {
      if (fieldDetails !== undefined) {
        this.setState({
          textValue: fieldDetails.textValue
        })
      }
    }
  }

  // When the user wants to save the changes, update the server
  saveChanges = (e) => {
    e.preventDefault()
    const { pageName, projects, elementContent } = this.props
    const { textValue } = this.state

    this.setState({
      updateError: false,
      updateInProgress: true,
    })

    this.props.updateField(
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      { textValue },
      this.saveResolve,
      this.saveReject,
    )
  }

  saveResolve = () => {
    this.setState({
      updateInProgress: false,
    })
  }

  saveReject = () => {
    this.setState({
      updateError: true,
      updateInProgress: false,
      errorText: Strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }


  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    const { title, description, fieldDetails, editable } = this.props.elementContent
    const { textValue } = this.state
    return (
      <div id='long-text-element'>
        <div className='long-text-element-container'>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>
            <form onSubmit={(e) => this.saveChanges(e)} className='form'>

              {
                this.state.updateError ?
                <div className='row'>
                  <Callout style={{marginBottom: '15px'}} intent='danger'>
                    <div>{this.state.errorText}</div>
                  </Callout>
                </div> : null
              }

              <div className='row'>
                <div className='col'>
                  <textarea
                    id="textValue"
                    name="textValue"
                    value={textValue}
                    placeholder={Strings.PLEASE_PROVIDE_DETAILS_HERE}
                    disabled={!editable}
                    onChange={this.handleInputChange}
                    />
                </div>
              </div>


              <div className='row'>
                <div className='col'>
                  <input
                    id="submit"
                    name="submit"
                    type="submit"
                    value={ Strings.BUTTON_SAVE_CHANGES }
                    className="submit-button"
                    style={{maxWidth: '300px'}}
                    readOnly
                    onClick={this.addTeamMember}/>
                </div>
              </div>


            </form>
          </div>

        </div>
      </div>
    )
  }
}


export default LongText
