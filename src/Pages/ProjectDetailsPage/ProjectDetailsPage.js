
import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './ProjectDetailsPage.module.css'

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

  projectPageFooter = () => {
    return (
      <div>
        {/*new project page footer here*/}
      </div>
    )
  }

  showProjectDetails = () => {

    // If the template section feature is ready for this deployment, show it
    if (process.env.REACT_APP_FEATURE_0001 === "True") {
      return (
        <div className={classes.pageContentDouble}>
          <ProjectDetailsSection />
          <ProjectTemplatesSection />
        </div>
      )
    }

    // Otherwise, just show the basic project details
    return (
      <div className={classes.pageContent}>
        <ProjectDetailsSection />
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
