import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  FormGroup,
  Button,
  ButtonGroup,
} from '@blueprintjs/core'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import * as FormInputs from '../shared/formInputs'

import * as strings from '../../data/Strings'
import * as validators from '../../validators'
import * as Endpoints from '../../endpoints'


export class Page extends Component {
  static propTypes = {
  }

  createProject = (values) => {

    // TODO: add popover to say project is creating and will cost money
    const { createProject, history, auth } = this.props

    createProject(auth.info.idToken.jwtToken, values)

    // TODO: Make this not just a fixed delay
    setTimeout(() => {
        history.push(Endpoints.PROJECTDETAILSPAGE)
      }, 5000)
  }

  newProjectPageHeader = () => {
    return (
      <div className='header-section'>
        <h2>Create a new project</h2>
      </div>
    )
  }

  newProjectForm = () => {

    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.createProject)} className='auth-form'>
        <FormGroup
          label={strings.PROJECT_NAME}
          labelFor="projectName"
          labelInfo={strings.FIELD_IS_REQUIRED}
        >
          <Field
            name="projectName"
            validate={[validators.required, validators.maxLength64]}
            component={FormInputs.TextInput}
            placeholder={strings.PROJECT_NAME}
          />
        </FormGroup>

        <FormGroup
          label={strings.PROJECT_REFERENCE}
          labelFor="projectReference"
        >
          <Field
            name="projectReference"
            component={FormInputs.TextInput}
            placeholder={strings.PROJECT_REFERENCE}
          />
        </FormGroup>

        <FormGroup
          label={strings.PROJECT_ADDRESS}
          labelFor="projectAddressLine1"
          labelInfo=""
        >
          <Field
            name="projectAddressLine1"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_1}
          />
          <Field
            name="projectAddressLine2"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_2}
          />
          <Field
            name="projectAddressLine3"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_3}
          />
          <Field
            name="projectAddressTown"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_TOWN}
          />
          <Field
            name="projectAddressRegion"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_REGION}
          />
          <Field
            name="projectAddressPostalCode"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_POSTAL_CODE}
          />
          <Field
            name="projectAddressCountry"
            component={FormInputs.TextInput}
            placeholder={strings.ADDRESS_LINE_COUNTRY}
          />
        </FormGroup>

        <FormGroup
          label={strings.PROJECT_DESCRIPTION}
          labelFor="projectDescription"
          labelInfo=""
          className="last"
        >
          <Field
            name="projectDescription"
            component={FormInputs.TextBoxInput}
            placeholder={strings.PROJECT_DESCRIPTION}
          />
        </FormGroup>

        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={strings.BUTTON_CREATE_PROJECT}
          />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            text={strings.BUTTON_CANCEL}
            intent='none'
            onClick={() => {
              this.props.resetChosenProject()
              this.props.history.push(Endpoints.DEFAULTLOGGEDINPAGE)
            }}
          />
        </ButtonGroup>
      </form>
    )
  }

  newProjectPageFooter = () => {
    return (
      <div>
        {/*new project page footer here*/}
      </div>
    )
  }


  render() {

    return (
      <div id='new-project-page'>
        <div className="App-header">
          <HeaderBar />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {this.newProjectPageHeader()}
            {this.newProjectForm()}
            {this.newProjectPageFooter()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'newproject'
})(Page)
