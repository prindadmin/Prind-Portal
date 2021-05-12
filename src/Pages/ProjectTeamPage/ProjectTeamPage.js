import React, { lazy, Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga';

import {
  Button,
  ButtonGroup,
} from '@blueprintjs/core'

// Data
import * as Strings from '../../Data/Strings'
import * as PageStates from '../PageStates'

// Components
import Spinner from '../../Components/Common/LoadingSpinnerCSS'
import NoProjectSelected from '../../Components/Common/NoProjectSelected'
import ContactTile from '../../Components/ContactTile'
import AddNewMemberForm from '../../Components/AddNewTeamMember'
import FullScreenTile from '../../Components/FullScreenTile'

// TODO: FUTURE: Refactor component without redux form and blueprintjs

export class ProjectTeamPage extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    getCurrentMembers: PropTypes.func.isRequired,
    getRoles: PropTypes.func.isRequired,
    //reset: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const { projectId } = props.projects.chosenProject
    var initialState = PageStates.NO_PROJECT_SELECTED

    if (projectId !== "") {
      initialState = PageStates.FETCHING_CURRENT_PROJECT_MEMBERS
      // Get the members for the selected project
      props.getCurrentMembers(projectId)
      // Get the available roles for this project
      props.getRoles(projectId)
    }

    this.state = {
      state: initialState
    }
  }

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname);
  }

  componentDidUpdate(prevProps) {
    const { projects, getCurrentMembers, getRoles } = this.props
    const { projectId } = projects.chosenProject

    if (projectId !== prevProps.projects.chosenProject.projectId && projectId !== "") {
      // Get the current members of the project
      getCurrentMembers(projectId)
      // Get the available roles for this project
      getRoles(projectId)
    }

    if (projects.memberList !== prevProps.projects.memberList) {
      this.setState({
        state: PageStates.QUIESCENT
      })
    }
  }

  addMemberResolve = () => {
    //this.props.reset()
    this.setState({
      state: PageStates.FETCHING_CURRENT_PROJECT_MEMBERS,
    })

    // Get the current members of the project
    this.props.getCurrentMembers(this.props.projects.chosenProject.projectId)
  }


  addMemberReject = () => {
    this.setState({
      state: PageStates.ADDING_MEMBERS_TO_PROJECT_FAILED,
      errorText: Strings.ERROR_ADDING_MEMBERS_TO_PROJECT
    })
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


  cancelNewMember = () => {
    //this.props.reset()
    this.setState({
      state: PageStates.QUIESCENT
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
          onClick={(e) => this.setState({state: PageStates.SHOW_NEW_MEMBERS_SETTINGS})}
          intent='primary'
          text={Strings.BUTTON_ADD_MEMBERS_TO_PROJECT}
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

  successAddingMember = () => {
    const { projectId } = this.props.projects.chosenProject
    this.props.getCurrentMembers(projectId)
    this.closeAddMemberForm()
  }

  closeAddMemberForm = () => {
    this.setState({
      state: PageStates.QUIESCENT
    })
  }

  getAddNewMemberForm = () => {
    return <AddNewMemberForm
      onSuccessAddingMember={this.successAddingMember}
      onCancelAddMember={this.closeAddMemberForm} />
  }

  getFailedTeamMemberFetch = () => {
    return (
      <FullScreenTile
        text={Strings.FULL_SCREEN_FAILED_FETCHING_TEAM_MEMBERS}
        icon='times-circle' />
    )
  }

  getFailedTeamMemberAdd = () => {
    return (
      <FullScreenTile
        text={Strings.FULL_SCREEN_FAILED_FETCHING_TEAM_MEMBERS}
        icon='times-circle' />
    )
  }

  pageFooter = () => {
    return (
      <div>
        {/*new team member footer here*/}
      </div>
    )
  }

  teamDetails = () => {
    return (
      <div className="form-container">
        <Suspense fallback={<Spinner />}>
          {
            this.state.state === PageStates.SHOW_NEW_MEMBERS_SETTINGS ? this.newMemberPageHeader() : this.pageHeader()
          }
          {
            this.state.state === PageStates.QUIESCENT ? this.memberList() : null
          }
          {
            this.state.state === PageStates.SHOW_NEW_MEMBERS_SETTINGS ? this.getAddNewMemberForm() : null
          }
          {
            this.state.state === PageStates.ADDING_MEMBERS_TO_PROJECT ? <Spinner /> : null
          }
          {
            this.state.state === PageStates.ADDING_MEMBERS_TO_PROJECT_FAILED ? this.getFailedTeamMemberAdd() : null
          }
          {
            this.state.state === PageStates.FETCHING_CURRENT_PROJECT_MEMBERS ? <Spinner /> : null
          }
          {
            this.state.state === PageStates.FETCHING_CURRENT_PROJECT_MEMBERS_FAILED ? this.getFailedTeamMemberFetch() : null
          }
          {
            this.pageFooter()
          }
        </Suspense>
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
            this.state.state === PageStates.NO_PROJECT_SELECTED ? this.showEmptyPage() : null
          }
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

export default ProjectTeamPage
