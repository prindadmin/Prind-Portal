import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Callout } from '@blueprintjs/core'
import * as Strings from '../../Data/Strings'
import Spinner from '../Common/LoadingSpinnerCSS'

import * as ComponentStates from './ComponentStates'

// TODO: Improve look of select box

export class AddNewTeamMember extends Component {
  static propTypes = {
    onSuccessAddingMember: PropTypes.func.isRequired,
    onCancelAddMember: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired,
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
    members: PropTypes.shape({
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          roleId: PropTypes.string.isRequired,
          roleName: PropTypes.string.isRequired
        })
      )
    })
  }

  constructor(props) {
    super()
    const { roles } = props.members
    this.state = {
      roleId: roles[0].roleId,
      emailAddress: '',
      errorText: '',
      state: ComponentStates.QUIESCENT
    }
  }

  getErrorBlock = () => {
    const { errorText } = this.state
    return(
      <Callout style={{marginBottom: '15px'}} intent='danger'>
        <div>{errorText}</div>
      </Callout>
    )
  }

  addTeamMember = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      state: ComponentStates.CREATING_NEW_USER
    })
    const { roleId, emailAddress } = this.state
    const memberValues = {
      roleId,
      emailAddress
    }
    const { projectId } = this.props.projects.chosenProject
    this.props.addMember(projectId, memberValues, this.successfullyAddedUser, this.failedAddingUser)
  }

  successfullyAddedUser = (result) => {
    this.props.onSuccessAddingMember()
  }

  // TODO: Check that error.message is the right key for the error text
  failedAddingUser = (error) => {
    console.error(`failed to add a new user to the system with email: ${this.state.emailAddress}`)
    this.setState({
      errorText: error.message,
      state: ComponentStates.CREATING_NEW_USER_FAILED
    })
  }


  cancelNewMember = (e) => {
    e.stopPropagation()
    this.props.onCancelAddMember()
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getFailedCreatingUser = () => {
    return (
      <React.Fragment>
        {this.getErrorBlock()}
        {this.getNewMemberForm()}
      </React.Fragment>
    )
  }


  getNewMemberForm = () => {
    const { addMemberError } = this.props
    const { roles } = this.props.members
    // Turn the roles array into options for the drop down
    const roleOptions = roles.map((role, index) => {
      return <option key={index} value={role.roleId}>{role.roleName}</option>
    })

    return (
      <form className='add-member-form'>

        <label htmlFor="emailAddress">{Strings.MEMBER_DETAILS}</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          placeholder={ Strings.PLACEHOLDER_EMAIL }
          value={this.state.emailAddress}
          onChange={this.handleInputChange}
          className={ this.state.email === null ? "default" : "filled" }/>

        <label htmlFor="roleId">{Strings.MEMBER_PROJECT_ROLE}</label>
        <select
          id="roleId"
          name="roleId"
          value={this.state.roleId}
          onChange={this.handleInputChange}
          className='role-select'>
          {roleOptions}
        </select>

        <input
          id="submit"
          name="submit"
          type="submit"
          value={ Strings.BUTTON_SAVE_CHANGES }
          className="submit-button"
          readOnly
          onClick={this.addTeamMember}/>

        <input
          id="cancel"
          name="cancel"
          type="cancel"
          value={ Strings.BUTTON_CANCEL }
          className="cancel-button"
          readOnly
          onClick={this.cancelNewMember}/>

      </form>
    )
  }

  render() {
    return(
      <React.Fragment>
        {
          this.state.state === ComponentStates.CREATING_NEW_USER_FAILED ? this.getFailedCreatingUser() : null
        }
        {
          this.state.state === ComponentStates.QUIESCENT ? this.getNewMemberForm() : null
        }
        {
          this.state.state === ComponentStates.CREATING_NEW_USER ? <Spinner /> : null
        }
      </React.Fragment>
    )
  }

}

export default AddNewTeamMember
