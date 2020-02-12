import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  FormGroup,
  Button,
  ButtonGroup,
} from '@blueprintjs/core'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import NoProjectSelected from '../common/NoProjectSelected'
import Footer from '../common/footer'

import * as FormInputs from '../shared/formInputs'

import ContactTile from './elements/ContactTile'

import * as strings from '../../data/Strings'
import * as validators from '../../validators'

export class Page extends Component {
  static propTypes = {
  }

  constructor() {
    super()
    this.state = {
      selectedRoleID: "0",
      selectedRoleName: strings.NO_ROLE_SELECTED,
      creatingNewUser: false,
    }
  }

  componentDidMount() {

    if (this.props.projects.chosenProject.id !== "" && this.props.projects.memberList.length === 0) {
      this.props.getCurrentMembers(
        this.props.auth.info.idToken.jwtToken,
        this.props.projects.chosenProject.id
      )

      // Get the available roles for this project
      this.props.getRoles(
        this.props.auth.info.idToken.jwtToken,
        this.props.projects.chosenProject.id
      )
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.projects.chosenProject.id !== prevProps.projects.chosenProject.id) {

      // Get the current members of the project
      this.props.getCurrentMembers(
        this.props.auth.info.idToken.jwtToken,
        this.props.projects.chosenProject.id
      )

      // Get the available roles for this project
      this.props.getRoles(
        this.props.auth.info.idToken.jwtToken,
        this.props.projects.chosenProject.id
      )
    }
  }

  addMember = async (values) => {

    var newValues = values
    newValues.id = this.state.selectedRoleID

    await this.props.addMember(
      this.props.auth.info.idToken.jwtToken,
      this.props.projects.chosenProject.id,
      newValues
    )

    this.setState({
      creatingNewUser: false,
    })

    // Get the current members of the project
    this.props.getCurrentMembers(
      this.props.auth.info.idToken.jwtToken,
      this.props.projects.chosenProject.id
    )
  }

  pageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{strings.PROJECT_DIRECTORY_TITLE}</h2>
      </div>
    )
  }

  newMemberPageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{strings.PROJECT_DIRECTORY_ADD_NEW_TITLE}</h2>
      </div>
    )
  }

  onItemSelected = (item) => {
    this.setState({
      selectedRoleID: item.id,
      selectedRoleName: item.name,
    })
  }

  addNewMember = () => {

    const { handleSubmit } = this.props
    const { roles } = this.props.members

    // TODO: Improve formatting so that invalid messages aren't on top of the next box

    return (
      <form onSubmit={handleSubmit(this.addMember)} className='add-member-form'>
        <FormGroup
          label={strings.MEMBER_DETAILS}
          labelFor="firstName"
        >
          <Field
            name="firstName"
            validate={[validators.required, validators.maxLength64]}
            component={FormInputs.TextInput}
            placeholder={strings.MEMBER_FIRST_NAME}
          />
          <Field
            name="lastName"
            validate={[validators.required, validators.maxLength64]}
            component={FormInputs.TextInput}
            placeholder={strings.MEMBER_LAST_NAME}
          />
          <Field
            name="emailAddress"
            validate={[validators.required, validators.isEmailAddress]}
            component={FormInputs.TextInput}
            placeholder={strings.MEMBER_EMAIL_ADDRESS}
          />
        </FormGroup>

        <FormGroup
          label={strings.MEMBER_PROJECT_ROLE}
          labelFor="role"
        >
          <Field
            name="role"
            values={roles}
            component={FormInputs.SelectInput}
            placeholder={strings.MEMBER_PROJECT_ROLE}
            onItemSelect={this.onItemSelected}
            value={this.state.selectedRoleName}
            selectedItem={this.state.selectedRoleName}
          />
        </FormGroup>


        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={strings.BUTTON_SAVE_CHANGES}
          />
        </ButtonGroup>
      </form>
    )
  }

  memberList = () => {

    return (
      <div className="member-list-container">
        <ButtonGroup fill>
          <Button
            onClick={(e) => this.setState({creatingNewUser: true})}
            intent='primary'
            text={strings.BUTTON_ADD_MEMBER_TO_PROJECT}
          />
        </ButtonGroup>

        <div className="member-list">
          {
            this.props.projects.memberList.map((memberDetails, index) => {
              return (
                <ContactTile
                  key={index}
                  memberDetails={memberDetails}
                />
              )
            })
          }
        </div>

      </div>
    )
  }


  pageFooter = () => {
    return (
      <div>
        {/*new project page footer here*/}
      </div>
    )
  }

  teamDetails = () => {
    return (
      <div className="form-container">
        {this.state.creatingNewUser ? this.newMemberPageHeader() : this.pageHeader()}
        {this.state.creatingNewUser ? this.addNewMember() : this.memberList()}
        {this.pageFooter()}
      </div>
    )
  }


  showEmptyPage = () => {
    return(
      <NoProjectSelected />
    )
  }


  render() {

    return (
      <div id='project-team-page'>
        <div className="App-header">
          <HeaderBar />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
              this.props.projects !== undefined ?
                this.props.projects.chosenProject.projectName === strings.NO_PROJECT_SELECTED ?
                  this.showEmptyPage() :
                  this.teamDetails() :
              this.showEmptyPage()
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'projectTeam'
})(Page)
