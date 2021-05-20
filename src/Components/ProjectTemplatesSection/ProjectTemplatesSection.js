import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './ProjectTemplatesSection.module.css'

// Data
import * as Strings from '../../Data/Strings'

// Components
import NoProjectSelected from '../Common/NoProjectSelected'
//import PopOverHandler from '../Common/popOverHandler'

export class ProjectTemplatesSection extends Component {
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
    updateProjectDetails: PropTypes.func.isRequired,
    //deleteProject: PropTypes.func.isRequired,
    //resetChosenProject: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      projectValues: { ...props.projects.chosenProject },
      showDeleteProjectConfirmation: false,
      deleteError: false,
      errorText: "",
    }
    console.log("loading edit project page")
  }


  componentDidUpdate(prevProps) {
    //console.log("updating")
    //console.log("props", this.props.projects.chosenProject)
    //console.log("prevProps", prevProps.projects.chosenProject)
    if (this.props.projects.chosenProject !== prevProps.projects.chosenProject) {
      //console.log("updating project values")
      //console.log("chosenProject", this.props.projects.chosenProject)
      this.setState({
        projectValues: { ...this.props.projects.chosenProject }
      })
    }
  }

  updateProject = () => {
    const { updateProjectDetails, projects } = this.props
    const { projectValues } = this.state

    updateProjectDetails(projects.chosenProject.projectId, projectValues)
  }

  projectPageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{Strings.EDIT_PROJECT_DETAILS}</h2>
      </div>
    )
  }

  confirmProjectDelete = () => {
    console.log("confirm project delete")
    this.setState({
      showDeleteProjectConfirmation: true,
    })
  }



  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      projectValues: {
        ...this.state.projectValues,
        [target.name]: target.value
      }
    });
  }

  hasChanged = () => {
    var hasChanged = false
    for (const key in this.state.projectValues) {
      hasChanged = hasChanged || this.state.projectValues[key] !== this.props.projects.chosenProject[key]
    }
    return hasChanged
  }


  projectForm = () => {
    const { projectValues } = this.state
    const hasChanged = this.hasChanged()
    return (
      <div className={classes.formSection}>
        <div className={classes.sectionLabel}>{Strings.PROJECT_NAME}</div>
        <input
          id="projectName"
          name="projectName"
          type="text"
          required
          disabled={process.env.REACT_APP_IS_PROCORE === "True"}
          placeholder={Strings.PROJECT_NAME}
          onChange={this.handleInputChange}
          value={ projectValues.projectName }
          className={ !projectValues.projectName ? "default" : "filled" }
        />

        <div className={classes.sectionLabel}>{Strings.PROJECT_REFERENCE}</div>
        <input
          id="projectReference"
          name="projectReference"
          type="text"
          placeholder={Strings.PROJECT_REFERENCE}
          onChange={this.handleInputChange}
          value={ projectValues.projectReference }
          className={ !projectValues.projectReference ? "default" : "filled" }
        />

        <div className={classes.sectionLabel}>{Strings.PROJECT_ADDRESS}</div>
        <input
          id="projectAddressLine1"
          name="projectAddressLine1"
          type="text"
          placeholder={Strings.ADDRESS_LINE_1}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressLine1 }
          className={ !projectValues.projectAddressLine1 ? "default" : "filled" }
        />
        <input
          id="projectAddressLine2"
          name="projectAddressLine2"
          type="text"
          placeholder={Strings.ADDRESS_LINE_2}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressLine2 }
          className={ !projectValues.projectAddressLine2 ? "default" : "filled" }
        />
        <input
          id="projectAddressLine3"
          name="projectAddressLine3"
          type="text"
          placeholder={Strings.ADDRESS_LINE_3}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressLine3 }
          className={ !projectValues.projectAddressLine3 ? "default" : "filled" }
        />
        <input
          id="projectAddressTown"
          name="projectAddressTown"
          type="text"
          placeholder={Strings.ADDRESS_LINE_TOWN}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressTown }
          className={ !projectValues.projectAddressTown ? "default" : "filled" }
        />
        <input
          id="projectAddressRegion"
          name="projectAddressRegion"
          type="text"
          placeholder={Strings.ADDRESS_LINE_REGION}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressRegion }
          className={ !projectValues.projectAddressRegion ? "default" : "filled" }
        />
        <input
          id="projectAddressPostalCode"
          name="projectAddressPostalCode"
          type="text"
          placeholder={Strings.ADDRESS_LINE_POSTAL_CODE}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressPostalCode }
          className={ !projectValues.projectAddressPostalCode ? "default" : "filled" }
        />
        <input
          id="projectAddressCountry"
          name="projectAddressCountry"
          type="text"
          placeholder={Strings.ADDRESS_LINE_COUNTRY}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressCountry }
          className={ !projectValues.projectAddressCountry ? `default ${classes.lastInput}` : `filled ${classes.lastInput}` }
        />

        <input
          type='submit'
          className={classes.button}
          disabled={!hasChanged}
          value={Strings.BUTTON_CREATE_PROJECT}
          onClick={this.updateProject} />

      </div>
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
  /*
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
  */

  /*
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
  */

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
      <Fragment>
        {
          /*
          showDeleteProjectConfirmation ?
          this.showDeleteConfirmationOverlay() : null
          */
        }
        <div className="form-container">
          {this.projectPageHeader()}
          {this.projectForm()}
          {this.projectPageFooter()}
        </div>
      </Fragment>
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
        <div className='page-content-section'>
          {
            this.props.projects === {} ? this.showEmptyPage() : null
          }
          {
            this.props.projects.chosenProject.projectName === Strings.NO_PROJECT_SELECTED ? this.showEmptyPage() : this.projectDetails()
          }
        </div>
      </div>
    )
  }
}

export default ProjectTemplatesSection
