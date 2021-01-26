import React, { lazy, Component } from 'react'
import { reduxForm } from 'redux-form'

import ReactGA from 'react-ga';

import {
  Button,
  ButtonGroup,
} from '@blueprintjs/core'

import * as Strings from '../../Data/Strings'

const NoProjectSelected = lazy(() => import('../../Components/Common/NoProjectSelected'));
const ContactTile = lazy(() => import('../../Components/ContactTile'));
const AddNewMemberForm = lazy(() => import('../../Components/AddNewTeamMember'));

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
        {
          this.state.addingMember ?
          <AddNewMemberForm
            handleSubmit={this.props.handleSubmit(this.addMember)}
            onItemSelected={this.onItemSelected}
            {...this.state}
            /> :
          this.memberList()
        }
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
