import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

// Components
const HeaderBar = lazy(() => import('../../Components/HeaderBar'));
const LayoutSideBar = lazy(() => import('../../Components/SideBar'));
const SideBar = lazy(() => import('../../Components/SideBar'));
const LayoutBody  = lazy(() => import('../../Components/LoggedInLayout/Body'));
const LayoutContentArea1x1  = lazy(() => import('../../Components/LoggedInLayout/ContentArea1x1'));
const Footer = lazy(() => import('../../Components/common/footer'));
const ProjectFetchError = lazy(() => import('../../Components/common/ProjectFetchError'));

/* Stage pages */
const InceptionPage = lazy(() => import('../InceptionPage'));
const FeasibilityPage = lazy(() => import('../FeasibilityPage'));
const DesignPage = lazy(() => import('../DesignPage'));
const TenderPage = lazy(() => import('../TenderPage'));
const ConstructionPage = lazy(() => import('../ConstructionPage'));
const HandoverPage = lazy(() => import('../HandoverPage'));
const OccupationPage = lazy(() => import('../OccupationPage'));
const RefurbishmentPage = lazy(() => import('../RefurbishmentPage'));

/* Other pages */
const ProjectDetailsPage = lazy(() => import('../ProjectDetailsPage'));
const ProjectTeamPage = lazy(() => import('../ProjectTeamPage'));

export class LoggedInContent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      fetchingProjectDetails: false,
    }
  }

  componentDidMount() {
    //const { username } = this.props.user
    // TODO: this.props.getuserDetails(username)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If the user is changed, get their details
    if (this.props !== prevProps) {
      // TODO: this.props.getUserDetails(this.props.user.username)
      this.getProjectID()
    }
  }

  errorComponent = () => {

    // TODO: Make this a 404

    return (
      <div>
        This page doesn't exist
      </div>
    )
  }


  getProjectID = () => {
    const { pathname } = this.props.location
    const currentProjectID = this.props.projects.chosenProject.projectId
    const { jwtToken } = this.props.auth.info.idToken

    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    // Count the number of slashes in the path to be checked
    const numSlashes = pathnameToCheck.split("/").length - 1;

    // If the path contains a project number, return that project number
    if (numSlashes > 1) {

      const projectIDToSave = pathnameToCheck.split("/").pop()

      if (projectIDToSave !== currentProjectID) {

        // Start the fetching cycle
        this.setState({
          fetchingProjectDetails: true,
        })

        // Quick save the ID
        this.props.saveProjectID(projectIDToSave)

        // Fetch the details of the project
        this.props.getProjectDetails(jwtToken, { projectId: projectIDToSave }, this.returnFromFetchingProjectDetails)
      }

      return projectIDToSave
    }
    return ''
  }

  returnFromFetchingProjectDetails = (result) => {
    //console.log(result)

    this.setState({
      fetchingProjectDetails: false,
    })
  }

  errorContent = () => {
    return (
      <ProjectFetchError />
    )
  }


  render () {

    const { pathname } = this.props.location
    const { error } = this.props.projects

    const content = pathname.startsWith('/team') ? <ProjectTeamPage /> :
                    pathname.startsWith('/project') ? <ProjectDetailsPage /> :
                    pathname.startsWith('/inception') ? <InceptionPage /> :
                    pathname.startsWith('/feasibility') ? <FeasibilityPage /> :
                    pathname.startsWith('/design') ? <DesignPage /> :
                    pathname.startsWith('/tender') ? <TenderPage /> :
                    pathname.startsWith('/construction') ? <ConstructionPage /> :
                    pathname.startsWith('/handover') ? <HandoverPage /> :
                    pathname.startsWith('/occupation') ? <OccupationPage /> :
                    pathname.startsWith('/refurbishment') ? <RefurbishmentPage /> :
                    this.errorComponent()

    return (
      <div id='logged-in-content-container' className='full-width row'>

        <HeaderBar companyName='Prin-D' />

        <LayoutBody>

          <LayoutSideBar>
            <SideBar {...this.props} />
          </LayoutSideBar>

          <LayoutContentArea1x1>
            { error ? this.errorContent() : content }
          </LayoutContentArea1x1>
        </LayoutBody>

        <Footer />
      </div>
    )
  }
}

export default LoggedInContent
