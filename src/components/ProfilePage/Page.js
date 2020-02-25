import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import {
  FormGroup,
  Button,
  Intent,
  FileInput,
  Tab,
  Tabs,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';

import * as strings from '../../data/Strings'
import * as validators from '../../validators'

import * as FormInputs from '../shared/formInputs'

import {
  UserTab,
  HistoryTab,
  RequeetsTab,
} from './elements'

// TODO: Add spinner to image when loading / updating

export class Page extends Component {
  static propTypes = {
    tabToOpen: PropTypes.string,
  }

  constructor(props) {
    super(props)

    var tabName = "user"

    if (props.tabToOpen !== undefined && props.tabToOpen !== "") {
      tabName = props.tabToOpen
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


  historyPanel = () => {

    // TODO: Create data for history panel

    return(
      <div>
        This will soon contain all the projects the user has joined (and when), all the documents uploaded, and all the documents signed
      </div>
    )
  }

  requestsPanel = () => {

    // TODO: Create data for requests panel

    return(
      <div>
        This will soon contain all the requests the user has received
      </div>
    )
  }


  // TODO: See if any of the social media stuff could be useful in the final product
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
            <Tab id="history" title={strings.TAB_HISTORY} panel={this.historyPanel()} />
            <Tab id="requests" title={strings.TAB_REQUESTS} panel={this.requestsPanel()} />
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
