import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import ReactGA from 'react-ga';

import {
  FormGroup,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import NoProjectSelected from '../common/NoProjectSelected'
import Footer from '../common/footer'

import * as FormInputs from '../common/formInputs'

import ContactTile from './elements/ContactTile'

import * as strings from '../../data/Strings'
import * as validators from '../../validators'

export class Page extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedRoleID: "0",
      selectedRoleName: strings.NO_ROLE_SELECTED,
      addingMember: false,
      addMemberError: false,
      errorText: ""
    }


    props.getCurrentMembers(
      props.auth.info.idToken.jwtToken,
      props.projects.chosenProject.projectId
    )

    // Get the available roles for this project
    props.getRoles(
      props.auth.info.idToken.jwtToken,
      props.projects.chosenProject.projectId
    )

  }

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);
  }

  componentDidUpdate(prevProps) {

    const { auth, projects, getCurrentMembers, getRoles } = this.props

    if (projects.chosenProject.projectId !== prevProps.projects.chosenProject.projectId && projects.chosenProject.projectId !== undefined) {

      // Get the current members of the project
      getCurrentMembers(
        auth.info.idToken.jwtToken,
        projects.chosenProject.projectId
      )

      // Get the available roles for this project
      getRoles(
        auth.info.idToken.jwtToken,
        projects.chosenProject.projectId
      )
    }
  }

  addMemberResolve = () => {

    this.props.reset()

    this.setState({
      addingMember: false,
    })

    // Get the current members of the project
    this.props.getCurrentMembers(
      this.props.auth.info.idToken.jwtToken,
      this.props.projects.chosenProject.projectId
    )
  }


  addMemberReject = () => {
    this.setState({
      addMemberError: true,
      errorText: strings.ERROR_ADDING_MEMBER_TO_PROJECT
    })
  }

  addMember = (values) => {

    this.setState({
      addingMember: true,
      addMemberError: false,
    })

    var newValues = values
    newValues.roleId = this.state.selectedRoleID

    this.props.addMember(
      this.props.auth.info.idToken.jwtToken,
      this.props.projects.chosenProject.projectId,
      newValues,
      this.addMemberResolve,
      this.addMemberReject,
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

  cancelNewMember = () => {

    this.props.reset()

    this.setState({
      addingMember: false,
    })
  }

  addNewMember = () => {

    const { handleSubmit } = this.props
    const { roles } = this.props.members
    const { addMemberError, errorText } = this.state

    // re-key the roles array so the keys match those required by the drop down
    var formattedRoles = roles.map(item => {
      return {
        id: item.roleId,
        name: item.roleName
      };
    });

    return (
      <form onSubmit={handleSubmit(this.addMember)} className='add-member-form'>
        {
          addMemberError ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <div>{errorText}</div>
          </Callout> :
          null
        }
        <FormGroup
          label={strings.MEMBER_DETAILS}
          labelFor="emailAddress"
        >
          <Field
            name="emailAddress"
            validate={[validators.required, validators.isEmailAddress]}
            component={FormInputs.TextInput}
            placeholder={strings.MEMBER_EMAIL_ADDRESS}
          />
        </FormGroup>

        <FormGroup
          label={strings.MEMBER_PROJECT_ROLE}
          labelFor="roleId"
        >
          <Field
            name="roleId"
            values={formattedRoles}
            component={FormInputs.SelectInput}
            placeholder={strings.MEMBER_PROJECT_ROLE_SELECT_ROLE}
            onItemSelect={this.onItemSelected}
            disabled={false}
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

        <ButtonGroup fill>
          <Button
            type='cancel'
            intent='none'
            text={strings.BUTTON_CANCEL}
            onClick={this.cancelNewMember}
          />
        </ButtonGroup>

      </form>
    )
  }

  onMemberRemove = () => {

    const { getCurrentMembers, auth, projects } = this.props

    getCurrentMembers(
      auth.info.idToken.jwtToken,
      projects.chosenProject.projectId
    )
  }

  memberList = () => {

    const { projects } = this.props

    return (
      <div className="member-list-container">
        <div className="row">
          <ButtonGroup fill>
            <Button
              onClick={(e) => this.setState({addingMember: true})}
              intent='primary'
              text={strings.BUTTON_ADD_MEMBER_TO_PROJECT}
            />
          </ButtonGroup>
        </div>

        <div className="member-list row">
          {
            projects.memberList !== undefined ?
              projects.memberList.confirmed !== undefined ?
                projects.memberList.confirmed.map((memberDetails, index) => {
                  return (
                    <div key={index} className="col-md-12 col-lg-12 col-xl-6">
                      <ContactTile
                        memberDetails={memberDetails}
                        onMemberRemove={this.onMemberRemove}
                        confirmed={true}
                      />
                    </div>
                  )
                }) : null
              : null
            }
            {
              projects.memberList !== undefined ?
                projects.memberList.invited !== undefined ?
                  projects.memberList.invited.map((memberDetails, index) => {
                    return (
                      <div key={index} className="col-md-12 col-lg-12 col-xl-6">
                        <ContactTile
                          memberDetails={memberDetails}
                          onMemberRemove={this.onMemberRemove}
                          confirmed={false}
                        />
                      </div>
                    )
                  }) : null
                : null
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
        {this.state.addingMember ? this.newMemberPageHeader() : this.pageHeader()}
        {this.state.addingMember ? this.addNewMember() : this.memberList()}
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
