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

import * as strings from '../../data/Strings'
import * as validators from '../../validators'

const rolesArray = [
  {
    roleID: 1,
    roleName: "Principal Designer",
  },
  {
    roleID: 2,
    roleName: "Principal Contractor",
  },
  {
    roleID: 3,
    roleName: "Client",
  },
]

export class Page extends Component {
  static propTypes = {
  }

  constructor() {
    super()
    this.state = {
      selectedRoleID: 0,
      selectedRoleName: strings.NO_ROLE_SELECTED,
      creatingNewUser: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.projects.chosenProject.id !== prevProps.projects.chosenProject.id) {
      this.props.reset()
    }
  }

  addMember = async (values) => {

    var newValues = values
    newValues.roleID = this.state.selectedRoleID

    await this.props.addMember(
      this.props.auth.info.idToken.jwtToken,
      this.props.projects.chosenProject.id,
      newValues
    )

    this.setState({
      creatingNewUser: false,
    })

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
      selectedRoleID: item.roleID,
      selectedRoleName: item.roleName,
    })
  }

  addNewMember = () => {

    const { handleSubmit } = this.props

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
            values={rolesArray}
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
            text={strings.BUTTON_SAVE_CHANGES_TO_PROJECT}
          />
        </ButtonGroup>
      </form>
    )
  }

  memberList = () => {

    // TODO: Add existing members list to screen

    return (
      <div>
        <ButtonGroup fill>
          <Button
            onClick={(e) => this.setState({creatingNewUser: true})}
            intent='primary'
            text={strings.BUTTON_ADD_MEMBER_TO_PROJECT}
          />
        </ButtonGroup>
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
          <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
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
