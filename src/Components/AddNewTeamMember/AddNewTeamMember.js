import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import {
  FormGroup,
  ButtonGroup,
  Button,
  Callout,
} from '@blueprintjs/core'

import * as FormInputs from '../Common/formInputs'
import * as Strings from '../../Data/Strings'
import * as Validators from '../../Validators'


export class AddNewTeamMember extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    onCancelAddMember: PropTypes.func.isRequired,
    addMemberError: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
  }

  getErrorBlock = () => {
    const { errorText } = this.props
    return(
      <Callout style={{marginBottom: '15px'}} intent='danger'>
        <div>{errorText}</div>
      </Callout>
    )
  }

  cancelNewMember = (e) => {
    e.stopPropagation()
    this.props.onCancelAddMember()
  }

  addNewMember = () => {

    const { handleSubmit, addMemberError } = this.props
    const { roles } = this.props.members

    // re-key the roles array so the keys match those required by the drop down
    var formattedRoles = roles.map(item => {
      return {
        id: item.roleId,
        name: item.roleName
      };
    });

    return (
      <form onSubmit={handleSubmit} className='add-member-form'>
        {
          addMemberError ? this.getErrorBlock() : null
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
            onItemSelect={this.props.onItemSelected}
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

  render() {
    return(
      <React.Fragment>
        {this.addNewMember()}
      </React.Fragment>
    )
  }

}

export default AddNewTeamMember
