import React, { Component, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'

import ProjectLoading from '../../Components/Common/ProjectLoading'

import * as Strings from '../../Data/Strings'
import PAGENAMES from '../../Data/pageNames'

// Components
const HeaderBar = lazy(() => import('../../Components/HeaderBar'));
const SideBar = lazy(() => import('../../Components/SideBar'));
const SideBarMobile = lazy(() => import('../../Components/SideBarMobile'));
const LayoutBody  = lazy(() => import('../../Components/LoggedInLayout/Body'));
const LayoutContentArea1x1  = lazy(() => import('../../Components/LoggedInLayout/ContentArea1x1'));
const LayoutContentArea1x1Mobile  = lazy(() => import('../../Components/LoggedInLayout/ContentArea1x1Mobile'));
const Footer = lazy(() => import('../../Components/Common/footer'));
const ProjectFetchError = lazy(() => import('../../Components/Common/ProjectFetchError'));
const Error404 = lazy(() => import('../../Components/Error404'))

/* Pages that can be loaded */
const ProjectDetailsPage = lazy(() => import('../ProjectDetailsPage'));
const ProjectTeamPage = lazy(() => import('../ProjectTeamPage'));
const ProjectStagePage = lazy(() => import('../ProjectStagePageTemplate'));
const FoundationsPage = lazy(() => import('../FoundationsPage'));
const NewProjectPage = lazy(() => import('../NewProjectPage'));
const ProfilePage = lazy(() => import('../ProfilePage'));

const MOBILE_WIDTH_BREAKPOINT = 992;
const PAGES_WITHOUT_PROJECT_SELECTOR = ['newproject', 'profile', 'foundations']

export class LoggedInContent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      fetchingProjectDetails: false,
      historyOpenProjectSelectorState: true,
      pageName: "",
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { projects } = this.props
    const pageName = this.getPageName()

    this.setState({
      pageName
    })

    // If a project has been selected
    if (projects.chosenProject.projectId !== "" && !PAGENAMES.CommonPages.includes(pageName)) {
      this.attemptRefreshProjectDetails()
    }

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      if (this.props.projects.error !== null) {
        console.log("error fetching project")
        return;
      }
      this.getProjectData()
      const { projectId } = this.props.projects.chosenProject
      const { pageName } = this.state

      if (projectId !== prevProps.projects.chosenProject.projectId && !PAGENAMES.CommonPages.includes(pageName)) {
        this.attemptRefreshProjectDetails()
      }
    }

    const locationState = this.props.location.state
    const projectName = this.getProjectName()

    if (projectName !== prevState.projectName) {
      this.setState({
        projectName
      })
    }

    if (locationState !== undefined && locationState !== prevProps.location.state) {
      this.setState({
        historyOpenProjectSelectorState: locationState.openProjectSelector
      })
    }
  }

  attemptRefreshProjectDetails = () => {
    const { pageName } = this.state
    const { projectId } = this.props.projects.chosenProject
    this.props.requestS3ProjectFileUploadToken(projectId, pageName)
    this.props.getProjectMembers(projectId)
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
    return <Error404 />
  }


  getPageName = () => {
    const { pathname } = this.props.location
    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    // Split and return the page name
    return pathnameToCheck.split("/")[1]
  }


  getProjectName = () => {
    const { pathname } = this.props.location
    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    // Split the pathname
    const splitPath = pathnameToCheck.split("/")
    // eturn the project name or undefined
    return splitPath.length > 2 ? splitPath[2] : undefined
  }


  getProjectData = () => {
    const currentProjectID = this.props.projects.chosenProject.projectId
    const projectId = this.getProjectName()

    // If the path contains a project number, return that project number
    if (projectId === undefined) {
      return ''
    }

    if (projectId !== currentProjectID) {
      // Start the fetching cycle
      this.setState({
        fetchingProjectDetails: true,
      })
      // Quick save the ID
      this.props.saveProjectID(projectId)
      // Fetch the details of the project
      this.props.getProjectDetails({ projectId }, this.returnFromFetchingProjectDetails)
    }

    return projectId
  }

  returnFromFetchingProjectDetails = (result) => {
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

  getPossiblePages = () => {
    // Removed to allow separate DHSF and CDM2015 project portals
    //const { projectType } = this.props.projects.chosenProject
    //return projectType === undefined ? PAGENAMES['CDM2015Project'] : PAGENAMES[projectType]
    return PAGENAMES[process.env.REACT_APP_PORTAL]
  }

  getContent = () => {
    const { location } = this.props
    const { pathname } = location
    const pageName = this.getPageName()
    const projectName = this.getProjectName()
    const possiblePages = this.getPossiblePages()

    const stagePageNames = Object.keys(possiblePages).map((singlePageName, index) => {
      if (possiblePages[singlePageName].isStagePage) {
        return singlePageName
      }
      return null
    })

    if (stagePageNames.includes(pageName)) {
      return <ProjectStagePage pageName={pageName} projectId={projectName}/>
    }

    const content = pathname.startsWith('/team') ? <ProjectTeamPage /> :
                    pathname.startsWith('/project') ? <ProjectDetailsPage /> :
                    pathname.startsWith('/foundations') ? <FoundationsPage /> :
                    pathname.startsWith('/newproject') ? <NewProjectPage /> :
                    pathname.startsWith('/profile') ? <ProfilePage /> :
                    this.errorComponent()

    return content
  }

  shouldOpenProjectSelector = () => {
    const { historyOpenProjectSelectorState } = this.state
    const pageName = this.getPageName()
    const projectNotSelected = this.getProjectName() === undefined
    const pageCanAutoShowProjectSelector = !PAGES_WITHOUT_PROJECT_SELECTOR.includes(pageName)

    /*
    console.log(`projectNotSelected: ${projectNotSelected}`)
    console.log(`pageCanAutoShowProjectSelector: ${pageCanAutoShowProjectSelector}`)
    console.log(`historyState: ${historyOpenProjectSelectorState}`)
    */

    return projectNotSelected && pageCanAutoShowProjectSelector && historyOpenProjectSelectorState
  }


  render () {
    const { error } = this.props.projects
    const { width } = this.state
    const content = this.getContent()

    return (
      <div id='logged-in-content-container' className='full-width row'>
        <HeaderBar companyName='Prin-D' openProjectSelector={this.shouldOpenProjectSelector()}/>
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
