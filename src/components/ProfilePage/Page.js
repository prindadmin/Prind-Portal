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

import * as strings from '../../data/Strings'
import * as validators from '../../validators'

import * as FormInputs from '../shared/formInputs'

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
      activeTab: tabName,
    }

    props.getUserDetails(props.auth.info.idToken.jwtToken)
  }


  componentDidMount() {

  }


  componentDidUpdate(prevProps) {

  }


  showLoadingPage = () => {
    return (
      <ProjectLoading text={strings.USER_DETAILS_LOADING}/>
    )
  }

  fileChosen = async (e) => {

    const { requestS3UserFileUploadToken, auth } = this.props

    console.log(e)

    console.log("Upload image to S3")
    //await requestS3UserFileUploadToken(auth.info.idToken.jwtToken, "profile-avatar")

    // TODO: Upload image to S3
  }

  updateProfile = (values) => {
    console.log("reached update profile")
    console.log(values)


    // TODO: Upload data to API
  }

  handleTabChange = (tabName) => {
    this.setState({
      activeTab: tabName,
    })
  }


  // TODO: Test reset button

  userPanel = () => {

    const { handleSubmit }  = this.props

    return(
      <div className="tab-pane active" id="home">
        <div className="row">
          <div className="col-md-12 col-lg-3">
            <div className="text-center">
              <img src="images/avatar_1x.png" className="avatar img-circle img-thumbnail" alt="avatar" />
              <h6>{strings.MEMBER_UPLOAD_DIFFERENT_AVATAR}</h6>

              <FileInput
                className="field bp3-fill"
                ref='fileInput'
                onInputChange={(e) => this.fileChosen(e)}
                text="Choose File"
              />
            </div>
            {/*
            <div className="panel panel-default">
              <div className="panel-heading">Website <i className="fa fa-link fa-1x"></i></div>
              <div className="panel-body"><a href="http://bootnipets.com">bootnipets.com</a></div>
            </div>


            <ul className="list-group">
              <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
              <li className="list-group-item text-right"><span className="pull-left"><strong>Shares</strong></span> 125</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> 13</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span> 37</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong>Followers</strong></span> 78</li>
            </ul>

            <div className="panel panel-default">
              <div className="panel-heading">Social Media</div>
              <div className="panel-body">
                <i className="fa fa-facebook fa-2x"></i> <i className="fa fa-github fa-2x"></i> <i className="fa fa-twitter fa-2x"></i> <i className="fa fa-pinterest fa-2x"></i> <i className="fa fa-google-plus fa-2x"></i>
              </div>
            </div>
            */}
          </div>



          <div className="col-md-12 col-lg-9">
            <form onSubmit={handleSubmit(this.updateProfile)} className='profile-form'>
              <div className="row">
                <FormGroup
                  label={strings.MEMBER_FIRST_NAME}
                  labelFor="firstName"
                  labelInfo={strings.FIELD_IS_REQUIRED}
                  className="col-6"
                >
                  <Field
                    name="firstName"
                    validate={[validators.required, validators.maxLength64]}
                    component={FormInputs.TextInput}
                    placeholder={strings.MEMBER_FIRST_NAME}
                  />
                </FormGroup>

                <FormGroup
                  label={strings.MEMBER_LAST_NAME}
                  labelFor="lastName"
                  labelInfo={strings.FIELD_IS_REQUIRED}
                  className="col-6"
                >
                  <Field
                    name="lastName"
                    validate={[validators.required, validators.maxLength64]}
                    component={FormInputs.TextInput}
                    placeholder={strings.MEMBER_LAST_NAME}
                  />
                </FormGroup>

                <FormGroup
                  label={strings.MEMBER_LANDLINE_PHONE_NUMBER_WORK}
                  labelFor="landlineWorkPhone"
                  className="col-6"
                >
                  <Field
                    name="landlineWorkPhone"
                    validate={[validators.maxLength32]}
                    component={FormInputs.TextInput}
                    placeholder={strings.MEMBER_LANDLINE_PHONE_NUMBER_WORK}
                  />
                </FormGroup>

                <FormGroup
                  label={strings.MEMBER_MOBILE_PHONE_NUMBER_WORK}
                  labelFor="mobileWorkPhone"
                  className="col-6"
                >
                  <Field
                    name="mobileWorkPhone"
                    validate={[validators.maxLength32]}
                    component={FormInputs.TextInput}
                    placeholder={strings.MEMBER_MOBILE_PHONE_NUMBER_WORK}
                  />
                </FormGroup>

                <FormGroup
                  label={strings.MEMBER_EMAIL_ADDRESS}
                  labelFor="emailAddress"
                  className="col-6"
                >
                  <Field
                    name="emailAddress"
                    validate={[validators.required, validators.isEmailAddress]}
                    component={FormInputs.TextInput}
                    placeholder={strings.MEMBER_EMAIL_ADDRESS}
                  />
                </FormGroup>
              </div>

              <div className="row button-row">
                <div className="form-group">
                  <div className="col-12">
                    <Button
                      intent={Intent.PRIMARY}
                      type="submit"
                      text={strings.BUTTON_SAVE_CHANGES}
                      icon="floppy-disk"
                      loading={this.props.submitting}
                      disabled={this.props.pristine}
                    />
                    <Button
                      intent={Intent.NONE}
                      type="reset"
                      text={strings.BUTTON_CANCEL}
                      icon="reset"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
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

  //Avatar panel


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
            <Tab id="user" title={strings.TAB_DETAILS} panel={this.userPanel()} />
            <Tab id="history" title={strings.TAB_HISTORY} panel={this.historyPanel()} />
            <Tab id="requests" title={strings.TAB_REQUESTS} panel={this.requestsPanel()} />
            <Tabs.Expander />
          </Tabs>
        </div>
      </div>
    )
  }







  render() {

    const { user } = this.props

    return (
      <div id='profile-page'>
        <div className="App-header">
          <HeaderBar />
        </div>

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
                user.fetching ?
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

export default reduxForm({
  enableReinitialize: true,
  form: 'profile'
})(Page)
