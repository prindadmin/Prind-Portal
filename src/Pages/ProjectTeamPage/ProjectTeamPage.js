import React, { lazy, Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import ReactGA from 'react-ga';

import {
  FormGroup,
  Button,
  ButtonGroup,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../../Components/Common/formInputs'

import * as Strings from '../../Data/Strings'
import * as Validators from '../../Validators'

const NoProjectSelected = lazy(() => import('../../Components/Common/NoProjectSelected'));
const ContactTile = lazy(() => import('../../Components/ContactTile'));

// TODO: Stop this requesting the team if there is no project selected
// TODO: Add :root variables to change number of tiles in a row dynamically to let them be smaller than 400px
// TODO: Move "Add team member" form to it's own component and import it

export class ProjectTeamPage extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedRoleID: "0",
      selectedRoleName: Strings.NO_ROLE_SELECTED,
      addingMember: false,
      addMemberError: false,
      errorText: ""
    }

    if (props.projects.chosenProject.projectId !== "") {
      // Get the members for the selected project
      props.getCurrentMembers(
        props.projects.chosenProject.projectId
      )

      // Get the available roles for this project
      props.getRoles(
        props.projects.chosenProject.projectId
      )
    }

  }

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);
  }

  componentDidUpdate(prevProps) {
    const { projects, getCurrentMembers, getRoles } = this.props

    if (projects.chosenProject.projectId !== prevProps.projects.chosenProject.projectId &&
      projects.chosenProject.projectId !== "") {

      // Get the current members of the project
      getCurrentMembers(
        projects.chosenProject.projectId
      )

      // Get the available roles for this project
      getRoles(
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
      this.props.projects.chosenProject.projectId
    )
  }


  addMemberReject = () => {
    this.setState({
      addMemberError: true,
      errorText: Strings.ERROR_ADDING_MEMBER_TO_PROJECT
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
      this.props.projects.chosenProject.projectId,
      newValues,
      this.addMemberResolve,
      this.addMemberReject,
    )

  }

  pageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{Strings.PROJECT_DIRECTORY_TITLE}</h2>
      </div>
    )
  }

  newMemberPageHeader = () => {
    return (
      <div className='header-section'>
        <h2>{Strings.PROJECT_DIRECTORY_ADD_NEW_TITLE}</h2>
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
          label={Strings.MEMBER_DETAILS}
          labelFor="emailAddress"
        >
          <Field
            name="emailAddress"
            validate={[Validators.required, Validators.isEmailAddress]}
            component={FormInputs.TextInput}
            placeholder={Strings.MEMBER_EMAIL_ADDRESS}
          />
        </FormGroup>

        <FormGroup
          label={Strings.MEMBER_PROJECT_ROLE}
          labelFor="roleId"
        >
          <Field
            name="roleId"
            values={formattedRoles}
            component={FormInputs.SelectInput}
            placeholder={Strings.MEMBER_PROJECT_ROLE_SELECT_ROLE}
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
            text={Strings.BUTTON_SAVE_CHANGES}
          />
        </ButtonGroup>

        <ButtonGroup fill>
          <Button
            type='cancel'
            intent='none'
            text={Strings.BUTTON_CANCEL}
            onClick={this.cancelNewMember}
          />
        </ButtonGroup>

      </form>
    )
  }

  onMemberRemove = () => {
    const { getCurrentMembers, projects } = this.props
    getCurrentMembers(
      projects.chosenProject.projectId
    )
  }


  getAddMemberButton = () => {
    return (
      <ButtonGroup fill>
        <Button
          onClick={(e) => this.setState({addingMember: true})}
          intent='primary'
          text={Strings.BUTTON_ADD_MEMBER_TO_PROJECT}
        />
      </ButtonGroup>
    )
  }

  mapMembers = ( memberList, confirmed ) => {
    if (memberList === undefined) {
      return (
        <React.Fragment />
      )
    }

    // Build a list of contact tiles
    const listToReturn = memberList.map((memberDetails, index) => {
      return (
        <ContactTile
          key={index}
          memberDetails={memberDetails}
          onMemberRemove={this.onMemberRemove}
          confirmed={confirmed}
        />
      )
    })

    // Once the list is built, return it
    return (
      <React.Fragment>
        { listToReturn }
      </React.Fragment>
    )

  }


  memberList = () => {
    const { projects } = this.props

    // If the member list is not available
    if (projects.memberList === undefined) {
      return (
        <div className="member-list-container row">
          { this.getAddMemberButton() }
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className="member-list-container">
          { this.getAddMemberButton() }
        </div>

        <div className="member-list">
          {
            this.mapMembers(projects.memberList.confirmed, true)
          }
          {
            this.mapMembers(projects.memberList.invited, false)
          }
        </div>
      </React.Fragment>
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
        <div className='page-content-section row'>
          {
            this.props.projects !== undefined ?
              this.props.projects.chosenProject.projectName === Strings.NO_PROJECT_SELECTED ?
                this.showEmptyPage() :
                this.teamDetails() :
            this.showEmptyPage()
          }
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'projectTeam'
})(ProjectTeamPage)
