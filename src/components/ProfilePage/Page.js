import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import {
  Tab,
  Tabs,
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
    props.getUserDetails(props.auth.info.idToken.jwtToken)
    props.getProjectInvitations(props.auth.info.idToken.jwtToken)

    console.log(props)

    var tabName = "user"

    if (props.location.state !== undefined) {
      if (props.location.state.tabToOpen !== undefined && props.location.state.tabToOpen !== "") {
        tabName = props.location.state.tabToOpen
      }
    }

    this.state = {
      activeTab: tabName
    }

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

    const { activeTab }  = this.state

    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{strings.PROFILE_PAGE_TITLE}</h1>
          <span>{strings.PROFILE_PAGE_DESCRIPTION}</span>
        </div>

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
