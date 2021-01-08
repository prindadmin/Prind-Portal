import React, { Component, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'

import ProjectLoading from '../../Components/Common/ProjectLoading'

import * as Strings from '../../Data/Strings'

// Components
const HeaderBar = lazy(() => import('../../Components/HeaderBar'));
const SideBar = lazy(() => import('../../Components/SideBar'));
const SideBarMobile = lazy(() => import('../../Components/SideBarMobile'));
const LayoutBody  = lazy(() => import('../../Components/LoggedInLayout/Body'));
const LayoutContentArea1x1  = lazy(() => import('../../Components/LoggedInLayout/ContentArea1x1'));
const LayoutContentArea1x1Mobile  = lazy(() => import('../../Components/LoggedInLayout/ContentArea1x1Mobile'));
const Footer = lazy(() => import('../../Components/Common/footer'));
const ProjectFetchError = lazy(() => import('../../Components/Common/ProjectFetchError'));

/* Stage pages */
const InceptionPage = lazy(() => import('../InceptionPage'));
const FeasibilityPage = lazy(() => import('../FeasibilityPage'));
const DesignPage = lazy(() => import('../DesignPage'));
const TenderPage = lazy(() => import('../TenderPage'));
const ConstructionPage = lazy(() => import('../ConstructionPage'));
const HandoverPage = lazy(() => import('../HandoverPage'));
const OccupationPage = lazy(() => import('../OccupationPage'));
const RefurbishmentPage = lazy(() => import('../RefurbishmentPage'));
const FoundationsPage = lazy(() => import('../FoundationsPage'));
const NewProjectPage = lazy(() => import('../NewProjectPage'));
const ProfilePage = lazy(() => import('../ProfilePage'));

/* Other pages */
const ProjectDetailsPage = lazy(() => import('../ProjectDetailsPage'));
const ProjectTeamPage = lazy(() => import('../ProjectTeamPage'));

const MOBILE_WIDTH_BREAKPOINT = 992;

export class LoggedInContent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      fetchingProjectDetails: false,
      pageName: "",
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { projects, requestS3ProjectFileUploadToken, getProjectMembers } = this.props
    const { projectId } = projects.chosenProject

    const pageName = this.getPageName()

    this.setState({
      pageName
    })

    // If a project has been selected
    if (projects.chosenProject.projectId !== "") {
      requestS3ProjectFileUploadToken(projectId, pageName)
      getProjectMembers(projectId)
    }

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props !== prevProps) {
      this.getProjectID()

      const { projects, requestS3ProjectFileUploadToken, getProjectMembers } = this.props
      const { pageName } = this.state
      const { projectId } = projects.chosenProject

      if (projectId !== prevProps.projects.chosenProject.projectId) {
        requestS3ProjectFileUploadToken(projectId, pageName)
        getProjectMembers(projectId)
      }
    }
  }

  // Removes the screen size listener when component is removed
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // Stores the current screen size in the components state
  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  errorComponent = () => {

    // TODO: Make this a 404

    return (
      <div>
        This page doesn't exist
      </div>
    )
  }

  getPageName = () => {
    const { pathname } = this.props.location

    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    // Split and return the page name
    return pathnameToCheck.split("/")[1]
  }


  getProjectID = () => {
    const { pathname } = this.props.location
    const currentProjectID = this.props.projects.chosenProject.projectId

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
        this.props.getProjectDetails({ projectId: projectIDToSave }, this.returnFromFetchingProjectDetails)
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

  loadingPlaceholder = () => {
    return(
      <ProjectLoading text={Strings.LOADING_DATA_FOR_PAGE}/>
    )
  }


  render () {

    const { pathname } = this.props.location
    const { error } = this.props.projects
    const { width } = this.state

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
                    pathname.startsWith('/foundations') ? <FoundationsPage /> :
                    pathname.startsWith('/newproject') ? <NewProjectPage /> :
                    pathname.startsWith('/profile') ? <ProfilePage /> :
                    this.errorComponent()

    return (
      <div id='logged-in-content-container' className='full-width row'>

        <HeaderBar companyName='Prin-D' />

        <LayoutBody>

          {
            width > MOBILE_WIDTH_BREAKPOINT ? <SideBar {...this.props} /> : <SideBarMobile {...this.props} />
          }

          {
              width > MOBILE_WIDTH_BREAKPOINT ?
                  <LayoutContentArea1x1>
                      <Suspense fallback={this.loadingPlaceholder()}>
                          { error ? this.errorContent() : content }
                      </Suspense>
                  </LayoutContentArea1x1> :
                  <LayoutContentArea1x1Mobile>
                      <Suspense fallback={this.loadingPlaceholder()}>
                          { error ? this.errorContent() : content }
                      </Suspense>
                  </LayoutContentArea1x1Mobile>
            }

        </LayoutBody>

        <Footer />
      </div>
    )
  }
}

export default LoggedInContent
