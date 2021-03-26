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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.object,
    }).isRequired,
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string
      }).isRequired,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }).isRequired,
    getProjectDetails: PropTypes.func.isRequired,
    saveProjectID: PropTypes.func.isRequired,
    getProjectMembers: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      historyOpenProjectSelectorState: true,
      width: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { projects } = this.props
    const projectName = this.getURLProjectId()
    const pageName = this.getPageName()
    // If a project has been linked to directly then fetch the common project data
    if (projectName) {
      this.getCommonProjectData()
    }
    // If a project has been linked to directly and it's a stage page, get the specific page data
    if (projectName && !PAGENAMES.CommonPages.includes(pageName)) {
      this.getProjectDataForSpecificStage()
    }
    // Set up the listener for the screen width so the right components can be shown
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }


  // Removes the screen size listener when component is removed
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  // Stores the current screen size in the components state
  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If there was an error, don't do anything
    if (this.props.projects.error) {
      //console.log("error fetching project")
      return;
    }
    // If the props changed in the update
    if (this.props !== prevProps) {
      // Get the latest and last chosen project IDs
      const newProjectId = this.getURLProjectId()
      const oldProjectId = prevProps.projects.chosenProject.projectId

      // Get the current page name
      const pageName = this.getPageName()

      // If the project ID has changed, fetch the common project data
      if (newProjectId !== oldProjectId && !PAGENAMES.CommonPages.includes(pageName)) {
        this.getCommonProjectData()
      }
    }

    const locationState = this.props.location.state
    // If the location has a state (i.e. another page want's it to do something specific
    // with the project selector)...
    if (locationState !== undefined && locationState !== prevProps.location.state) {
      // Update the state with the passed data
      this.setState({
        historyOpenProjectSelectorState: locationState.openProjectSelector
      })
    }
  }

  getProjectDataForSpecificStage = () => {
    const pageName = this.getPageName()
    const projectId = this.getURLProjectId()
    // TODO: Move this to the stage page template
    //this.props.requestS3ProjectFileUploadToken(projectId, pageName)
  }


  getCommonProjectData = () => {
    const projectId = this.getURLProjectId()

    // Quick save the ID
    this.props.saveProjectID(projectId)
    // Fetch the details of the project
    this.props.getProjectDetails({ projectId })
    // Get the project members
    this.props.getProjectMembers(projectId)
  }


  getPageName = () => {
    const { pathname } = this.props.location
    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    // Split and return the page name
    return pathnameToCheck.split("/")[1]
  }


  getURLProjectId = () => {
    const { pathname } = this.props.location
    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    // Split the pathname
    const splitPath = pathnameToCheck.split("/")
    // eturn the project name or undefined
    return splitPath.length > 2 ? splitPath[2] : undefined
  }

  loadingPlaceholder = () => {
    return <ProjectLoading text={Strings.LOADING_DATA_FOR_PAGE}/>
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
    const projectName = this.getURLProjectId()
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
                    <Error404 />

    return content
  }

  shouldOpenProjectSelector = () => {
    const { historyOpenProjectSelectorState } = this.state
    const pageName = this.getPageName()
    const projectNotSelected = this.getURLProjectId() === undefined
    const pageCanAutoShowProjectSelector = !PAGES_WITHOUT_PROJECT_SELECTOR.includes(pageName)

    /*
    console.log(`projectNotSelected: ${projectNotSelected}`)
    console.log(`pageCanAutoShowProjectSelector: ${pageCanAutoShowProjectSelector}`)
    console.log(`historyState: ${historyOpenProjectSelectorState}`)
    */

    return projectNotSelected && pageCanAutoShowProjectSelector && historyOpenProjectSelectorState
  }

  // Get the layout of the screen if the width is above the breakpoint
  getDesktopContent = () => {
    // TODO: Urgent: Having an error should not completely stop the content from showing
    const { error } = this.props.projects

    return (
      <LayoutContentArea1x1>
          <Suspense fallback={this.loadingPlaceholder()}>
              { error ? <ProjectFetchError /> : this.getContent() }
          </Suspense>
      </LayoutContentArea1x1>
    )
  }

  // Get the layout of the screen if the width is below the breakpoint
  getMobileContent = () => {
    // TODO: Urgent: Having an error should not completely stop the content from showing
    const { error } = this.props.projects

    return (
      <LayoutContentArea1x1Mobile>
          <Suspense fallback={this.loadingPlaceholder()}>
              { error ? <ProjectFetchError /> : this.getContent() }
          </Suspense>
      </LayoutContentArea1x1Mobile>
    )
  }

  render () {
    return (
      <div id='logged-in-content-container' className='full-width row'>
        <HeaderBar companyName='Prin-D' openProjectSelector={this.shouldOpenProjectSelector()}/>
        <LayoutBody>
          {
            this.state.width > MOBILE_WIDTH_BREAKPOINT ? <SideBar {...this.props} /> : <SideBarMobile {...this.props} />
          }
          {
            this.state.width > MOBILE_WIDTH_BREAKPOINT ? this.getDesktopContent() : this.getMobileContent()
          }
        </LayoutBody>
        <Footer />
      </div>
    )
  }
}

export default LoggedInContent
