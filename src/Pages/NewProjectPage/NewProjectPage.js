import React, { Component, lazy } from 'react'
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
import * as Endpoints from '../../Data/Endpoints'

const CreatingProjectPopover = lazy(() => import('../../Components/CreatingProjectPopover'));

export class Page extends Component {
  static propTypes = {
  }

  constructor() {
    super()

    this.state = {
      showCreatingPopover: false,
      createError: false,
      errorText: "",
    }
  }

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname);

    const searchParams = this.getQueryStringParams(location.search)

    // TODO: CONTINUE HERE
    // TODO: Test this when a project isn't selected.  Seems to fail to work.
    console.log(searchParams);
    console.log(searchParams.project_type);
  }

  getQueryStringParams = query => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
                  let [key, value] = param.split('=');
                  params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                  return params;
              }, {}
          )
      : {}
  };


  createProject = (values) => {

    this.setState({
      showCreatingPopover: true,
      createError: false,
    })

    const { createProject } = this.props

    createProject(
      values,
      this.createResolve,
      this.createReject,
    )
  }

  createResolve = () => {
    const { history } = this.props
    history.push(Endpoints.PROJECTDETAILSPAGE)
  }

  createReject = () => {
    this.setState({
      showCreatingPopover: false,
      createError: true,
      errorText: Strings.ERROR_CREATING_NEW_PROJECT,
    })
  }

  newProjectPageHeader = () => {
    return (
      <div className='header-section row'>
        <h2>Create a new project</h2>
      </div>
    )
  }

  newProjectForm = () => {

    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.createProject)} className='auth-form row'>
        <FormGroup
          label={Strings.PROJECT_NAME}
          labelFor="projectName"
          labelInfo={Strings.FIELD_IS_REQUIRED}
          className='col-12'
        >
          <Field
            name="projectName"
            validate={[Validators.required, Validators.maxLength64]}
            component={FormInputs.TextInput}
            placeholder={Strings.PROJECT_NAME}
          />
        </FormGroup>

        <FormGroup
          label={Strings.PROJECT_REFERENCE}
          labelFor="projectReference"
          className='col-12'
        >
          <Field
            name="projectReference"
            component={FormInputs.TextInput}
            placeholder={Strings.PROJECT_REFERENCE}
          />
        </FormGroup>

        <FormGroup
          label={Strings.PROJECT_ADDRESS}
          labelFor="projectAddressLine1"
          labelInfo=""
          className='col-12'
        >
          <Field
            name="projectAddressLine1"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_1}
          />
          <Field
            name="projectAddressLine2"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_2}
          />
          <Field
            name="projectAddressLine3"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_3}
          />
          <Field
            name="projectAddressTown"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_TOWN}
          />
          <Field
            name="projectAddressRegion"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_REGION}
          />
          <Field
            name="projectAddressPostalCode"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_POSTAL_CODE}
          />
          <Field
            name="projectAddressCountry"
            component={FormInputs.TextInput}
            placeholder={Strings.ADDRESS_LINE_COUNTRY}
          />
        </FormGroup>

        <FormGroup
          label={Strings.PROJECT_DESCRIPTION}
          labelFor="projectDescription"
          labelInfo=""
          className="col-12 last"
        >
          <Field
            name="projectDescription"
            component={FormInputs.TextBoxInput}
            placeholder={Strings.PROJECT_DESCRIPTION}
          />
        </FormGroup>

        <ButtonGroup fill>
          <Button
            loading={this.props.submitting}
            disabled={this.props.invalid}
            type='submit'
            intent='primary'
            text={Strings.BUTTON_CREATE_PROJECT}
          />
        </ButtonGroup>
        <ButtonGroup fill>
          <Button
            text={Strings.BUTTON_CANCEL}
            intent='none'
            className="last"
            onClick={() => {
              this.props.resetChosenProject()
              this.props.history.push(Endpoints.DEFAULTLOGGEDINPAGE)
            }}
          />
        </ButtonGroup>
      </form>
    )
  }

  newProjectPageFooter = () => {
    return (
      <div className='content-footer'>
        {/*new project page footer here*/}
      </div>
    )
  }


  render() {

    const { showCreatingPopover, createError, errorText } = this.state

    return (
      <div id='new-project-page'>
        <div className='page-content-section'>
          {this.newProjectPageHeader()}
          {
            createError ?
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{errorText}</div>
            </Callout> :
            null
          }
          {this.newProjectForm()}
          {this.newProjectPageFooter()}
        </div>
        {
          showCreatingPopover ? <CreatingProjectPopover /> : null
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'newproject'
})(Page)
