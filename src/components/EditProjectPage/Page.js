import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  FormGroup,
  Button,
  ButtonGroup,
} from '@blueprintjs/core'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import NoProjectSelected from '../common/NoProjectSelected'
import Footer from '../common/footer'

import * as FormInputs from '../shared/formInputs'

import * as strings from '../../data/Strings'
import * as validators from '../../validators'
import * as Endpoints from '../../endpoints'

export class Page extends Component {
  static propTypes = {
  }


  componentDidUpdate(prevProps) {
    if (this.props.projects.chosenProject.projectId !== prevProps.projects.chosenProject.projectId) {
      this.props.reset()
    }
  }

  updateProject = async (values) => {

    const { updateProjectDetails, history, auth, projects } = this.props

    await updateProjectDetails(
      auth.info.idToken.jwtToken,
      projects.chosenProject.projectId,
      values
    )

    history.push(Endpoints.DEFAULTLOGGEDINPAGE)
  }

  projectPageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{strings.EDIT_PROJECT_DETAILS}</h2>
      </div>
    )
  }

  projectForm = () => {

    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.updateProject)} className='project-form'>
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
            component="textarea"
            className="bp3-input"
            placeholder={strings.PROJECT_DESCRIPTION}
          />
        </FormGroup>



        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={strings.BUTTON_SAVE_CHANGES}
          />
        </ButtonGroup>
      </form>
    )
  }

  projectPageFooter = () => {
    return (
      <div>
        {/*new project page footer here*/}
      </div>
    )
  }

  projectDetails = () => {
    return (
      <div className="form-container">
        {this.projectPageHeader()}
        {this.projectForm()}
        {this.projectPageFooter()}
      </div>
    )
  }


  showEmptyPage = () => {
    return(
      <NoProjectSelected />
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
            {
              this.props.projects !== undefined ?
                this.props.projects.chosenProject.projectName === strings.NO_PROJECT_SELECTED ?
                  this.showEmptyPage() :
                  this.projectDetails() :
              this.showEmptyPage()
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'editproject'
})(Page)
