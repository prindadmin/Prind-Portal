import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../../../shared/formInputs'

import * as strings from '../../../../data/Strings'

export class Element extends Component {
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

  constructor() {
    super()
    this.state = {
      updateInProgress: false,
      updateError: false,
      errorText: "",
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  // When the user wants to save the changes, update the server
  saveChanges = (fieldDetails) => {

    const { auth, pageName, projects, elementContent } = this.props

    this.setState({
      updateError: false,
      updateInProgress: true,
    })

    this.props.updateField(
      auth.info.idToken.jwtToken,
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      fieldDetails,
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
      errorText: strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { handleSubmit } = this.props
    const { title, description, fieldDetails, editable } = this.props.elementContent

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
            <form onSubmit={handleSubmit(this.saveChanges)} className='form'>

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
                  <Field
                    name="textValue"
                    component={FormInputs.TextBoxInput}
                    value={fieldDetails.textValue}
                    placeholder={strings.PLEASE_PROVIDE_DETAILS_HERE}
                    disabled={!editable}
                    />
                </div>
              </div>


              <div className='row'>
                <div className='col'>
                  <Button
                    loading={this.props.submitting}
                    disabled={this.props.pristine}
                    className='entry-button'
                    intent={Intent.PRIMARY}
                    text={strings.BUTTON_SAVE_CHANGES}
                    type='submit'
                    />
                </div>
              </div>


            </form>
          </div>

        </div>
      </div>
    )
  }
}

Element = reduxForm({
  enableReinitialize: true
})(Element)

export default Element
