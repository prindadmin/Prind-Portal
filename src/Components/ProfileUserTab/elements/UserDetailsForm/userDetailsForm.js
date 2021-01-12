import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Intent,
  FileInput,
  Callout,
  Spinner,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';

import * as Strings from '../../../../Data/Strings'
import * as Validators from '../../../../Validators'

import * as FormInputs from '../../../Common/formInputs'

const defaultAvatar = `images/default-avatar.png`

// TODO: Resize the password change section

export class Page extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    const defaultAvatar = `images/default-avatar.png`

    // Check if there is an error fetching the user details
    if (props.user.error !== undefined) {
      this.state = {
        avatarLink: defaultAvatar,
        avatarLoading: false,
        avatarFile: {},
        detailsFetchError: true,
        errorText: Strings.USER_UNABLE_TO_FETCH_DETAILS,
      }
      return
    }

    this.state = {
      avatarLink: defaultAvatar,
      avatarLoading: true,
      avatarFile: {},
      detailsFetchError: false,
      errorText: "",
    }

    this.getImage(props)
  }

  getImage = (props) => {

    const { username } = props.user
    const that = this
    const avatarLink = `${process.env.REACT_APP_AWS_S3_USER_AVATAR_ENDPOINT}/${username}`

    var image = new Image();

    image.onload = function() {
        // image exists and is loaded
        that.setState({
          avatarLink: avatarLink,
          avatarLoading: false,
        })
        return
    }

    image.onerror = function() {
        // image did not load
        that.setState({
          avatarLink: defaultAvatar,
          avatarLoading: false,
        })

        return
    }

    image.src = avatarLink
  }


  componentDidUpdate(prevProps) {

    // If the user details change
    if (this.props.user.details !== prevProps.user.details) {
      this.getImage(this.props)

      if (this.props.user.details.emailAddress !== undefined) {
        this.setState({
          detailsFetchError: false,
        })
      }
    }

    // If there is a file to upload and there is a token to do it with
    if (this.props.user.userS3Token !== "" && this.state.avatarFile.value !== undefined) {
      this.uploadToS3()
    }

  }


  fileChosen = (e) => {

    const { requestS3UserFileUploadToken } = this.props

    // Get a token to allow the uploading of the file
    requestS3UserFileUploadToken("profile-avatar")

    e.persist()

    console.log(e)

    // Store the avatarFile event
    this.setState({
      avatarFile: e.target,
      avatarLoading: true,
    })

  }


  uploadToS3 = () => {

    const { user } = this.props
    const { avatarFile } = this.state

    console.log(avatarFile)

    const file = avatarFile.files[0]

    if (user.userS3Token === undefined) {
      console.log("error uploading image")
      return;
    }

    const { AccessKeyId, SecretAccessKey, SessionToken } = user.userS3Token

    // Update credentials to allow access to S3
    AWS.config.update({
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: SessionToken
      }
    });

    // Create an S3 service provider
    const s3 = new AWS.S3()

    // Fetch the parameters
    const bucketName = process.env.REACT_APP_AWS_S3_USER_AVATAR_BUCKET_NAME
    const key = `profile-avatar/${user.username}`

    // Create the parameters to upload the file with
    var uploadParams = {
      ACL: 'private',
      Body: file,
      Bucket: bucketName,
      ContentType: file.type,
      Key: key,
    };

    // Create a virtual version of the react object so it can be used in the request
    const that = this;

    // Create a request
    var request = s3.putObject(uploadParams);

    request.on('success', function(response) {

        that.setState({
          avatarFile: {},
          avatarLink: defaultAvatar,
        })

        that.getImage(that.props)

      })

      .on('error', function(error, response) {
        console.log("Error!");
        console.error(error)

        that.setState({
          avatarFile: {},
          avatarLink: defaultAvatar,
        })
      })

    request.send();
  }



  updateProfile = (values) => {
    console.log("reached update profile - does nothing")
  }



  render() {

    const { handleSubmit, initialValues }  = this.props
    const { avatarLink, avatarLoading } = this.state

    return(
      <div className="tab-pane active" id="profile-tab-container">
        <div className="row">
          <div className="col-md-12 col-lg-3">
            <div className="text-center">
              <div className='avatar-container'>
                <img src={avatarLink} className="avatar img-circle img-thumbnail" alt="avatar" />
                {
                  avatarLoading ?
                  <React.Fragment>
                    <div className='avatar-greyer' />
                    <Spinner className='avatar-spinner' size='75'intent={Intent.PRIMARY} />
                  </React.Fragment>
                  : null
                }
              </div>
              <h6>{Strings.MEMBER_UPLOAD_DIFFERENT_AVATAR}</h6>

              <FileInput
                className="field bp3-fill"
                ref='fileInput'
                onInputChange={(e) => this.fileChosen(e)}
                text="Choose File"
              />
            </div>
          </div>



          <div className="col-md-12 col-lg-9">
            <form onSubmit={handleSubmit(this.updateProfile)} className='profile-form'>

              {
                this.state.detailsFetchError ?
                <Callout style={{marginBottom: '15px'}} intent='danger'>
                  <div>{this.state.errorText}</div>
                </Callout> :
                null
              }

              <Callout className='foundations-info' intent='primary'>
                <div>
                  {
                    initialValues.foundationsID !== null ?
                    Strings.PROFILE_DATA_IS_MANAGED_IN_FOUNDATIONS_WITH_APP :
                    Strings.PROFILE_DATA_IS_MANAGED_IN_FOUNDATIONS_NO_APP
                  }
                </div>
              </Callout>

              <div className="row">
                <FormGroup
                  label={Strings.MEMBER_FIRST_NAME}
                  labelFor="firstName"
                  labelInfo={Strings.FIELD_IS_REQUIRED}
                  className="col-lg-6 col-md-12"
                >
                  <Field
                    name="firstName"
                    validate={[Validators.required, Validators.maxLength64]}
                    component={FormInputs.TextInput}
                    placeholder={Strings.MEMBER_FIRST_NAME}
                    disabled={true}
                    //disabled={initialValues.foundationsID !== null}
                  />
                </FormGroup>

                <FormGroup
                  label={Strings.MEMBER_LAST_NAME}
                  labelFor="lastName"
                  labelInfo={Strings.FIELD_IS_REQUIRED}
                  className="col-lg-6 col-md-12"
                >
                  <Field
                    name="lastName"
                    validate={[Validators.required, Validators.maxLength64]}
                    component={FormInputs.TextInput}
                    placeholder={Strings.MEMBER_LAST_NAME}
                    disabled={true}
                    //disabled={initialValues.foundationsID !== null}
                  />
                </FormGroup>

                <FormGroup
                  label={Strings.MEMBER_FOUNDATIONS_ID}
                  labelFor="foundationsID"
                  className="col-lg-6 col-md-12"
                >
                  <Field
                    name="foundationsID"
                    component={FormInputs.TextInput}
                    placeholder={Strings.MEMBER_FOUNDATIONS_ID_NOT_FOUND}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup
                  label={Strings.MEMBER_EMAIL_ADDRESS}
                  labelFor="emailAddress"
                  className="col-lg-6 col-md-12"
                >
                  <Field
                    name="emailAddress"
                    validate={[Validators.required, Validators.isEmailAddress]}
                    component={FormInputs.TextInput}
                    placeholder={Strings.MEMBER_EMAIL_ADDRESS}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup
                  label={Strings.MEMBER_LANDLINE_PHONE_NUMBER_WORK}
                  labelFor="homePhoneNumber"
                  className="col-lg-6 col-md-12"
                >
                  <Field
                    name="homePhoneNumber"
                    validate={[Validators.maxLength32]}
                    component={FormInputs.TextInput}
                    placeholder={Strings.MEMBER_LANDLINE_PHONE_NUMBER_WORK}
                    disabled={true}
                    //disabled={initialValues.foundationsID !== null}
                  />
                </FormGroup>

                <FormGroup
                  label={Strings.MEMBER_MOBILE_PHONE_NUMBER_WORK}
                  labelFor="mobilePhoneNumber"
                  className="col-lg-6 col-md-12"
                >
                  <Field
                    name="mobilePhoneNumber"
                    validate={[Validators.maxLength32]}
                    component={FormInputs.TextInput}
                    placeholder={Strings.MEMBER_MOBILE_PHONE_NUMBER_WORK}
                    disabled={true}
                    //disabled={initialValues.foundationsID !== null}
                  />
                </FormGroup>
              </div>


            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'profile'
})(Page)
