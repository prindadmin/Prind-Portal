import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import {
  Tab,
  Tabs,
  Callout,
} from '@blueprintjs/core'

import * as strings from '../../data/Strings'

import {
  UserTab,
  HistoryTab,
  RequestsTab,
} from './elements'

export class Page extends Component {
  static propTypes = {
    tabToOpen: PropTypes.string,
    getProjectInvitations: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    props.getUserDetails(
      props.auth.info.idToken.jwtToken,
      this.profileResolve,
      this.profileReject,
    )

    props.getProjectInvitations(
      props.auth.info.idToken.jwtToken,
      this.projectRequestsResolve,
      this.projectRequestsReject,
    )

    props.getSignatureRequests(
      props.auth.info.idToken.jwtToken,
      this.signatureRequestsResolve,
      this.signatureRequestsReject,
    )

    props.getHistory(
      props.auth.info.idToken.jwtToken,
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
      historyErrorText: strings.ERROR_FETCHING_USER_HISTORY
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
      profileErrorText: strings.ERROR_FETCHING_USER_PROFILE
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
      projectRequestsErrorText: strings.ERROR_FETCHING_USER_PROJECT_REQUESTS
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
      signatureRequestsErrorText: strings.ERROR_FETCHING_USER_SIGNATURE_REQUESTS
    })
  }


  showLoadingPage = () => {
    return (
      <ProjectLoading text={strings.USER_DETAILS_LOADING}/>
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
          <h1>{strings.PROFILE_PAGE_TITLE}</h1>
          <span>{strings.PROFILE_PAGE_DESCRIPTION}</span>
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
            <Tab id="user" title={strings.TAB_DETAILS} panel={<UserTab />} />
            <Tab id="history" title={strings.TAB_HISTORY} panel={<HistoryTab />} />
            <Tab id="requests" title={strings.TAB_REQUESTS} panel={<RequestsTab />} />
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
        <div className="App-header">
          <HeaderBar />
        </div>

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
                fetching ?
                this.showLoadingPage() :
                this.showFilledPage()
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
