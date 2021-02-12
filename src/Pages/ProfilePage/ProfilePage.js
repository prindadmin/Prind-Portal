import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import ProjectLoading from '../../Components/Common/ProjectLoading'

import { Tab, Tabs, Callout } from '@blueprintjs/core'
import * as Strings from '../../Data/Strings'

/* Page elements */
const ProfileUserTab = lazy(() => import('../../Components/ProfileUserTab'));
const ProfileHistoryTab = lazy(() => import('../../Components/ProfileHistoryTab'));
const ProfileRequestsTab = lazy(() => import('../../Components/ProfileRequestsTab'));

export class ProfilePage extends Component {
  static propTypes = {
    tabToOpen: PropTypes.string,
    getProjectInvitations: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    props.getUserDetails(
      this.profileResolve,
      this.profileReject,
    )

    props.getProjectInvitations(
      this.projectRequestsResolve,
      this.projectRequestsReject,
    )

    props.getSignatureRequests(
      this.signatureRequestsResolve,
      this.signatureRequestsReject,
    )

    props.getHistory(
      this.historyResolve,
      this.historyReject,
    )

    var tabName = "user"

    if (props.location.state !== undefined) {
      if (props.location.state.tabToOpen !== undefined && props.location.state.tabToOpen !== "") {
        tabName = props.location.state.tabToOpen
      }
    }

    this.state = {
      activeTab: tabName,
      historyFetching: true,
      historyError: false,
      historyErrorText: "",
      profileFetching: true,
      profileError: false,
      profileErrorText: "",
      projectRequestsFetching: true,
      projectRequestsError: false,
      projectRequestsErrorText: "",
      signatureRequestsFetching: true,
      signatureRequestsError: false,
      signatureRequestsErrorText: "",
    }

  }

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);
  }

  historyResolve = () => {
    this.setState({
      historyFetching: false,
    })

  }

  historyReject = () => {
    this.setState({
      historyFetching: false,
      historyError: true,
      historyErrorText: Strings.ERROR_FETCHING_USER_HISTORY
    })
  }

  profileResolve = () => {
    this.setState({
      profileFetching: false,
    })

  }

  profileReject = () => {
    this.setState({
      profileFetching: false,
      profileError: true,
      profileErrorText: Strings.ERROR_FETCHING_USER_PROFILE
    })
  }

  projectRequestsResolve = () => {
    this.setState({
      projectRequestsFetching: false,
    })

  }

  projectRequestsReject = () => {
    this.setState({
      projectRequestsFetching: false,
      projectRequestsError: true,
      projectRequestsErrorText: Strings.ERROR_FETCHING_USER_PROJECT_REQUESTS
    })
  }

  signatureRequestsResolve = () => {
    this.setState({
      projectRequestsFetching: false,
    })

  }

  signatureRequestsReject = () => {
    this.setState({
      signatureRequestsFetching: false,
      signatureRequestsError: true,
      signatureRequestsErrorText: Strings.ERROR_FETCHING_USER_SIGNATURE_REQUESTS
    })
  }


  showLoadingPage = () => {
    return (
      <ProjectLoading text={Strings.USER_DETAILS_LOADING}/>
    )
  }


  handleTabChange = (tabName) => {
    this.setState({
      activeTab: tabName,
    })
  }


  showFilledPage = () => {

    const {
      activeTab,
      historyError,
      historyErrorText,
      profileError,
      profileErrorText,
      projectRequestsError,
      projectRequestsErrorText,
      signatureRequestsError,
      signatureRequestsErrorText,
    }  = this.state

    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{Strings.PROFILE_PAGE_TITLE}</h1>
          <span>{Strings.PROFILE_PAGE_DESCRIPTION}</span>
        </div>

        {
          historyError ?
          <div className='row'>
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{historyErrorText}</div>
            </Callout>
          </div> : null
        }

        {
          profileError ?
          <div className='row'>
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{profileErrorText}</div>
            </Callout>
          </div> : null
        }

        {
          projectRequestsError ?
          <div className='row'>
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{projectRequestsErrorText}</div>
            </Callout>
          </div> : null
        }

        {
          signatureRequestsError ?
          <div className='row'>
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{signatureRequestsErrorText}</div>
            </Callout>
          </div> : null
        }

        <div className="row">
          <Tabs id='profileTabs' className="nav nav-tabs" onChange={this.handleTabChange} selectedTabId={activeTab}>
            <Tab id="user" title={Strings.TAB_DETAILS} panel={<ProfileUserTab />} />
            <Tab id="history" title={Strings.TAB_HISTORY} panel={<ProfileHistoryTab />} />
            <Tab id="requests" title={Strings.TAB_REQUESTS} panel={<ProfileRequestsTab />} />
            <Tabs.Expander />
          </Tabs>
        </div>
      </div>
    )
  }



  render() {

    const { fetching } = this.props

    return (
      <div id='profile-page'>
        <div className='page-content-section row'>
          {
              fetching ?
              this.showLoadingPage() :
              this.showFilledPage()
          }
        </div>
      </div>
    )
  }
}

export default ProfilePage
