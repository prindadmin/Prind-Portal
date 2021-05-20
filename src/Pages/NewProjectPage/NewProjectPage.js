import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import classes from './NewProjectPage.module.css'

import ReactGA from 'react-ga';

// Data
import * as Strings from '../../Data/Strings'
import * as Validators from '../../Validators'
import * as Endpoints from '../../Data/Endpoints'
import * as PageStates from '../PageStates'

// Components
const ErrorTile = lazy(() => import('../../Components/ErrorTile'));
const CreatingProjectPopover = lazy(() => import('../../Components/CreatingProjectPopover'));

// TODO: FUTURE: Add ability to upload thumbnails or pick icon for a project

export class NewProjectPage extends Component {
  static propTypes = {
    createProject: PropTypes.func.isRequired,
    resetChosenProject: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    procore: PropTypes.shape({
      companyId: PropTypes.string,
      projectId: PropTypes.string,
      projectName: PropTypes.string,
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      errorText: '',
      projectValues: {
        projectType: process.env.REACT_APP_PORTAL,
        projectName: "",
        projectReference: "",
        projectAddressLine1: "",
        projectAddressLine2: "",
        projectAddressLine3: "",
        projectAddressTown: "",
        projectAddressRegion: "",
        projectAddressPostalCode: "",
        projectAddressCountry: ""
      },
      state: PageStates.QUIESCENT
    }

    // If this is a procore project, define the projectId
    if (process.env.REACT_APP_IS_PROCORE === "True") {
      this.state.projectValues.projectId = `${props.procore.companyId}${props.procore.projectId}`
      this.state.projectValues.projectName = props.procore.projectName
    }

    console.log("arrived at new project page")
  }

  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);
    /*
    // Removed due to splitting of the two portals
    const searchParams = this.getQueryStringParams(location.search)

    console.log(searchParams);
    console.log(searchParams.project_type);

    this.setState({
      projectType: searchParams.project_type
    })
    */
    //console.log("finished mounting new project page")
  }
  /*
  getQueryStringParams = query => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
                  let [key, value] = param.split('=');
                  params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                  return params;
              }, {}
          )
      : {}
  };
  */

  createProject = (values) => {
    this.setState({
      state: PageStates.LOADING,
    })
    this.props.createProject(this.state.projectValues, this.createResolve, this.createReject)
  }


  createResolve = (result) => {
    console.log("create resolved; moving to project details page")
    this.props.history.push({
      pathname: `${Endpoints.PROJECTDETAILSPAGE}/${result.projectId}`,
      state: {
        openProjectSelector: false,
      }
    })
  }


  createReject = () => {
    this.setState({
      state: PageStates.ERROR_CREATING_NEW_PROJECT,
      errorText: Strings.ERROR_CREATING_NEW_PROJECT,
    })
  }


  newProjectPageHeader = () => {
    return (
      <div className={classes.headerSection}>
        <h2>Create a new project</h2>
      </div>
    )
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


  newProjectForm = () => {

    const { projectValues } = this.state
    const canSubmit = projectValues.projectName !== ""

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
          className={ projectValues.projectName === '' ? "default" : "filled" }
        />

        <div className={classes.sectionLabel}>{Strings.PROJECT_REFERENCE}</div>
        <input
          id="projectReference"
          name="projectReference"
          type="text"
          placeholder={Strings.PROJECT_REFERENCE}
          onChange={this.handleInputChange}
          value={ projectValues.projectReference }
          className={ projectValues.projectReference === '' ? "default" : "filled" }
        />

        <div className={classes.sectionLabel}>{Strings.PROJECT_ADDRESS}</div>
        <input
          id="projectAddressLine1"
          name="projectAddressLine1"
          type="text"
          placeholder={Strings.ADDRESS_LINE_1}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressLine1 }
          className={ projectValues.projectAddressLine1 === '' ? "default" : "filled" }
        />
        <input
          id="projectAddressLine2"
          name="projectAddressLine2"
          type="text"
          placeholder={Strings.ADDRESS_LINE_2}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressLine2 }
          className={ projectValues.projectAddressLine2 === '' ? "default" : "filled" }
        />
        <input
          id="projectAddressLine3"
          name="projectAddressLine3"
          type="text"
          placeholder={Strings.ADDRESS_LINE_3}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressLine3 }
          className={ projectValues.projectAddressLine3 === '' ? "default" : "filled" }
        />
        <input
          id="projectAddressTown"
          name="projectAddressTown"
          type="text"
          placeholder={Strings.ADDRESS_LINE_TOWN}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressTown }
          className={ projectValues.projectAddressTown === '' ? "default" : "filled" }
        />
        <input
          id="projectAddressRegion"
          name="projectAddressRegion"
          type="text"
          placeholder={Strings.ADDRESS_LINE_REGION}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressRegion }
          className={ projectValues.projectAddressRegion === '' ? "default" : "filled" }
        />
        <input
          id="projectAddressPostalCode"
          name="projectAddressPostalCode"
          type="text"
          placeholder={Strings.ADDRESS_LINE_POSTAL_CODE}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressPostalCode }
          className={ projectValues.projectAddressPostalCode === '' ? "default" : "filled" }
        />
        <input
          id="projectAddressCountry"
          name="projectAddressCountry"
          type="text"
          placeholder={Strings.ADDRESS_LINE_COUNTRY}
          onChange={this.handleInputChange}
          value={ projectValues.projectAddressCountry }
          className={ projectValues.projectAddressCountry === '' ? `default ${classes.lastInput}` : `filled ${classes.lastInput}` }
        />

        <input
          type='submit'
          className={classes.button}
          disabled={!canSubmit}
          value={Strings.BUTTON_CREATE_PROJECT}
          onClick={this.createProject} />

        <input
          type='submit'
          className={`${classes.button} ${classes.cancelButton}`}
          value={Strings.BUTTON_CANCEL}
          onClick={() => {
            this.props.resetChosenProject()
            this.props.history.push(Endpoints.DEFAULTLOGGEDINPAGE)
          }} />
      </div>
    )
  }


  getErrorBox = () => {
    return <ErrorTile text={this.state.errorText} />
  }


  render() {
    return (
      <div id='new-project-page'>
        <div className={`page-content-section ${classes.pageContent}`}>
          {
            this.newProjectPageHeader()
          }
          {
            this.state.state === PageStates.ERROR_CREATING_NEW_PROJECT ? this.getErrorBox() : null
          }
          {
            this.newProjectForm()
          }
        </div>
        {
          this.state.state === PageStates.LOADING ? <CreatingProjectPopover /> : null
        }
      </div>
    )
  }
}

export default NewProjectPage
