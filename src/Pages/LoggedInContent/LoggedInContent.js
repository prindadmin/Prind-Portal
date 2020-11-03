import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

// Components
const LayoutHeaderBar  = lazy(() => import('../../Components/LoggedInLayout/HeaderBar'));
const LayoutBody  = lazy(() => import('../../Components/LoggedInLayout/Body'));
const LayoutSideBar  = lazy(() => import('../../Components/LoggedInLayout/SideBar'));
const LayoutContentArea1x1  = lazy(() => import('../../Components/LoggedInLayout/ContentArea1x1'));

const HeaderBar = lazy(() => import('../../Components/HeaderBar'));
const SideBar = lazy(() => import('../../Components/SideBar'));

const HomePageContent = lazy(() => import('../HomePage'));
const ProjectsPageContent = lazy(() => import('../ProjectsPage'));
const SingleProjectPage = lazy(() => import('../SingleProjectPage'));
const CreateProjectPage = lazy(() => import('../CreateProjectPage'));
const TeamMemberPage = lazy(() => import('../TeamMemberPage'));
const StatisticsPageContent = lazy(() => import('../StatisticsPage'));
const SettingsPageContent = lazy(() => import('../SettingsPage'));

export class LoggedInContent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { username } = this.props.user
    this.props.getuserDetails(username)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If the user is changed, get their details
    if (this.props.user.username !== prevProps.user.username) {
      this.props.getUserDetails(this.props.user.username)
    }
  }

  projectsPageRouter = () => {
    const { pathname } = this.props.location
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    if (pathnameToCheck === '/projects') {
      return <ProjectsPageContent />
    }
    return <SingleProjectPage />
  }


  teamMemberPageRouter = () => {
    const { pathname } = this.props.location
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    if (pathnameToCheck === '/team-member') {
      return <HomePageContent />
    }
    return <TeamMemberPage />
  }


  render () {

    const { pathname } = this.props.location

    const content = pathname === '/home' ? <HomePageContent /> :
                    pathname === '/projects/create' ? <CreateProjectPage /> :
                    pathname.startsWith('/projects') ? this.projectsPageRouter() :
                    pathname.startsWith('/team-member') ? this.teamMemberPageRouter() :
                    pathname === '/statistics' ? <StatisticsPageContent /> :
                    pathname === '/settings' ? <SettingsPageContent /> :
                    <HomePageContent />


    return (
      <div id='logged-in-content-container' className='full-width row'>

        <HeaderBar companyName='Prin-D' />

        <LayoutSideBar>
          <SideBar
            {...this.props}
          />
        </LayoutSideBar>

        <LayoutBody>

          <LayoutContentArea1x1>
            { content }
          </LayoutContentArea1x1>

        </LayoutBody>

      </div>
    )
  }
}

export default LoggedInContent
