import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import CreateCustomFieldPopover from '../common/CreateCustomFieldPopover'
import { FileUpload, DropDown, CalendarPicker, LongText } from '../common/ProjectDataFields'
import NoProjectSelected from '../common/NoProjectSelected'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../data/Strings'

const pageName = 'inception'

export class Page extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      popOverIsOpen: false
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  onClosePopOver = () => {
    this.setState({
      popOverIsOpen: false
    })
  }

  showLoadingPage = () => {
    return (
      <ProjectLoading />
    )
  }

  showFilledPage = () => {

    //const { fields }  = this.props.pageContent.inception

    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{strings.PROFILE_PAGE_TITLE}</h1>
          <span>{strings.PROFILE_PAGE_DESCRIPTION}</span>
        </div>
        This will be the fields of the user
      </div>
    )
  }



  render() {

    const { projects } = this.props
    const { popOverIsOpen } = this.state

    return (
      <div id='profile-page'>
        <div className="App-header">
          <HeaderBar />
        </div>

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            hello, profile
            {/*
              this.props.projects !== undefined ?
                this.props.projects.chosenProject.projectName === strings.NO_PROJECT_SELECTED ?
                this.showEmptyPage() :
                  this.props.pageContent.inception.fetching ?
                  this.showLoadingPage() :
                  this.showFilledPage() :
              null
            */}
            {/*
              popOverIsOpen ?
              <CreateCustomFieldPopover
                projectID={projects.chosenProject.projectId}
                pageName={pageName}
                onClosePopover={this.onClosePopup}
                />
              : null
            */}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
