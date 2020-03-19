import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import ReactGA from 'react-ga';

import {
  FormGroup,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import NoProjectSelected from '../common/NoProjectSelected'
import Footer from '../common/footer'

import PopOverHandler from '../common/popOverHandler'

import * as FormInputs from '../common/formInputs'

import * as strings from '../../data/Strings'
import * as validators from '../../validators'
import * as Endpoints from '../../endpoints'

export class Page extends Component {
  static propTypes = {
  }

  constructor() {
    super()
    this.state = {
      showDeleteProjectConfirmation: false,
      deleteError: false,
      errorText: "",
    }
  }

  componentDidMount() {
    const { location } = this.props

    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);

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

  confirmProjectDelete = () => {
    console.log("confirm project delete")
    this.setState({
      showDeleteProjectConfirmation: true,
    })
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



        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            intent='danger'
            text={strings.BUTTON_DELETE_PROJECT}
            onClick={(e) => this.setState({
              showDeleteProjectConfirmation: true,
              deleteError: false,
            })}
          />
        </ButtonGroup>



      </form>
    )
  }


  confirmDeleteProject = () => {

    const { jwtToken } = this.props.auth.info.idToken
    const { projectId } = this.props.projects.chosenProject

    this.props.deleteProject(
      jwtToken,
      projectId,
      this.resolveDelete,
      this.rejectDelete,
    )

  }

  resolveDelete = () => {
    this.props.resetChosenProject()
    this.props.history.push('/profile')
  }

  rejectDelete = () => {

    console.log("reject delete")

    this.setState({
      deleteError: true,
      errorText: strings.ERROR_DELETING_PROJECT
    })
  }

  showDeleteConfirmationOverlay = () => {

    const { deleteError, errorText } = this.state

    return(
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => {
          this.setState({showDeleteProjectConfirmation: false})
          e.stopPropagation()
          }}>
          <div id='delete-project-popover'>
            <div id='popup-box'>
              <div className='delete-project-popover-container' onClick={(e) => e.stopPropagation()}>
                <div className='element-title'>
                  {strings.DELETE_PROJECT}
                </div>
                {
                  deleteError ?
                  <Callout style={{marginBottom: '15px'}} intent='danger'>
                    <div>{errorText}</div>
                  </Callout> :
                  null
                }

                <div className='element-description'>
                  {strings.CONFIRM_PROJECT_DELETE}
                  <ButtonGroup fill>
                    <Button
                      loading={this.props.submitting}
                      intent='danger'
                      text={strings.BUTTON_DELETE_PROJECT}
                      onClick={this.confirmDeleteProject}
                    />
                  </ButtonGroup>

                  <ButtonGroup fill>
                    <Button
                      loading={this.props.submitting}
                      intent='none'
                      text={strings.BUTTON_CANCEL}
                      onClick={(e) => this.setState({showDeleteProjectConfirmation: false})}
                    />
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
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

    const { showDeleteProjectConfirmation } = this.state

    return (
      <React.Fragment>
        {
          showDeleteProjectConfirmation ?
          this.showDeleteConfirmationOverlay() : null
        }
        <div className="form-container">
          {this.projectPageHeader()}
          {this.projectForm()}
          {this.projectPageFooter()}
        </div>
      </React.Fragment>
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
