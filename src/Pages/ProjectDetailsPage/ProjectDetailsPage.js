<<<<<<< Updated upstream
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
=======
import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './ProjectDetailsPage.module.css'
>>>>>>> Stashed changes

import ReactGA from 'react-ga';

// Data
import * as Strings from '../../Data/Strings'
import * as Validators from '../../Validators'
import * as Endpoints from '../../Data/Endpoints'

// Components
import NoProjectSelected from '../../Components/Common/NoProjectSelected'
import PopOverHandler from '../../Components/Common/popOverHandler'
import * as FormInputs from '../../Components/Common/formInputs'
import ProjectDetailsSection from '../../Components/ProjectDetailsSection'
import ProjectTemplatesSection from '../../Components/ProjectTemplatesSection'


// TODO: FUTURE: Add ability to upload thumbnails or pick icon for a project
<<<<<<< Updated upstream
// TODO: FUTURE: Refactor component without redux form and blueprintjs
=======
>>>>>>> Stashed changes

export class ProjectDetailsPage extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string,
        projectType: PropTypes.string,
        projectName: PropTypes.string,
        projectDescription: PropTypes.string,
        projectReference: PropTypes.string,
        projectAddressLine1: PropTypes.string,
        projectAddressLine2: PropTypes.string,
        projectAddressLine3: PropTypes.string,
        projectAddressTown: PropTypes.string,
        projectAddressRegion: PropTypes.string,
        projectAddressPostalCode: PropTypes.string,
        projectAddressCountry: PropTypes.string,
      })
    }).isRequired,
<<<<<<< Updated upstream
    updateProjectDetails: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    resetChosenProject: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      showDeleteProjectConfirmation: false,
      deleteError: false,
      errorText: "",
    }
    console.log("loading edit project page")
=======
    updateProjectDetails: PropTypes.func.isRequired
>>>>>>> Stashed changes
  }

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname);
  }

  projectPageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{Strings.EDIT_PROJECT_DETAILS}</h2>
      </div>
    )
  }

<<<<<<< Updated upstream
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
          label={Strings.PROJECT_NAME}
          labelFor="projectName"
          labelInfo={Strings.FIELD_IS_REQUIRED}
        >
          <Field
            name="projectName"
            validate={[Validators.required, Validators.maxLength64]}
            component={FormInputs.TextInput}
            placeholder={Strings.PROJECT_NAME}
          />
        </FormGroup>

        <FormGroup
          label={Strings.PROJECT_REFERENCE}
          labelFor="projectReference"
        >
          <Field
            name="projectReference"
            component={FormInputs.TextInput}
            placeholder={Strings.PROJECT_REFERENCE}
          />
        </FormGroup>

        <FormGroup
          label={Strings.PROJECT_ADDRESS}
          labelFor="projectAddressLine1"
          labelInfo=""
        >
          <Field
            name="projectAddressLine1"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_1}
          />
          <Field
            name="projectAddressLine2"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_2}
          />
          <Field
            name="projectAddressLine3"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_3}
          />
          <Field
            name="projectAddressTown"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_TOWN}
          />
          <Field
            name="projectAddressRegion"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_REGION}
          />
          <Field
            name="projectAddressPostalCode"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_POSTAL_CODE}
          />
          <Field
            name="projectAddressCountry"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_COUNTRY}
          />
        </FormGroup>

        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={Strings.BUTTON_SAVE_CHANGES}
          />
        </ButtonGroup>


        {/*
        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            intent='danger'
            text={Strings.BUTTON_DELETE_PROJECT}
            onClick={(e) => this.setState({
              showDeleteProjectConfirmation: true,
              deleteError: false,
            })}
          />
        </ButtonGroup>
        */}


      </form>
    )
  }


  confirmDeleteProject = () => {

    const { projectId } = this.props.projects.chosenProject

    this.props.deleteProject(
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
      errorText: Strings.ERROR_DELETING_PROJECT
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
                  {Strings.DELETE_PROJECT}
                </div>
                {
                  deleteError ?
                  <Callout style={{marginBottom: '15px'}} intent='danger'>
                    <div>{errorText}</div>
                  </Callout> :
                  null
                }

                <div className='element-description'>
                  {Strings.CONFIRM_PROJECT_DELETE}
                  <ButtonGroup fill>
                    <Button
                      loading={this.props.submitting}
                      intent='danger'
                      text={Strings.BUTTON_DELETE_PROJECT}
                      onClick={this.confirmDeleteProject}
                    />
                  </ButtonGroup>

                  <ButtonGroup fill>
                    <Button
                      loading={this.props.submitting}
                      intent='none'
                      text={Strings.BUTTON_CANCEL}
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


=======
>>>>>>> Stashed changes
  projectPageFooter = () => {
    return (
      <div>
        {/*new project page footer here*/}
      </div>
    )
  }

  showProjectDetails = () => {
    return (
      <div className={classes.pageContent}>
        <ProjectDetailsSection />
        <ProjectTemplatesSection />
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
      <div id='new-project-page' className="page-content">
        {
          this.props.projects === {} ? this.showEmptyPage() : null
        }
        {
          this.props.projects.chosenProject.projectName === Strings.NO_PROJECT_SELECTED ? this.showEmptyPage() : this.showProjectDetails()
        }
      </div>
    )
  }
}

export default ProjectDetailsPage
