import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as state from '../../states'

import * as Endpoints from '../../endpoints'

class PrivateRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    console.log("private path loaded")
    this.state = {
      fetchingProjectDetails: false,
    }
  }


  componentDidMount() {
    //console.log("private path mounted")
    this.storeRoute()
  }

  componentDidUpdate(prevProps) {

    //console.log("componentDidUpdate")

    if (this.props.path !== prevProps.path) {
      // Store the route so that the correct page can be loaded if a login is required
      //console.log("componentDidUpdate paths do not match")
      //console.log(`this.props.path: ${this.props.path}`)
      //console.log(`prevProps.path: ${prevProps.path}`)
      this.storeRoute()
      this.getProjectNumber()
    }

    // If the props have changed
    if (this.props !== prevProps) {
      this.getProjectNumber()
    }

  }

  getProjectNumber = () => {

    console.log("getting project number")

    const { pathname } = this.props.location
    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    // Count the number of slashes in the path to be checked
    const numSlashes = pathnameToCheck.split("/").length - 1;

    console.log(numSlashes)

    // If the path contains a project number, load that project number
    if (numSlashes > 1) {
      const projectId = pathnameToCheck.split("/").pop()
      console.log(`projectId: ${projectId}`)
      console.log(`current project id: ${this.props.projects.chosenProject.projectId}`)
      console.log(`fetching?: ${this.state.fetchingProjectDetails}`)

      if (projectId !== this.props.projects.chosenProject.projectId && !this.state.fetchingProjectDetails) {
        console.log("fetching details for project")

        this.setState({
          fetchingProjectDetails: true,
        })

        this.props.updateChosenProject(this.props.auth.info.idToken.jwtToken, { projectId }, this.returnFromFetchingProject)
      }
    }
  }

  returnFromFetchingProject = (result) => {
    console.log(result)

    this.setState({
      fetchingProjectDetails: false,
    })
  }

  storeRoute = () => {

    const { pathname } = this.props.location
    const { currentRoute } = this.props.user

    console.log(this.props.location)
    //console.log(`pathname: ${pathname}`)
    //console.log(`currentRoute: ${currentRoute}`)

    // If the user is on the same page as the store already has, do nothing
    if (pathname === currentRoute) {
      return
    }

    // If the users path is not equal the default logged in page, store the path
    if (pathname !== Endpoints.DEFAULTLOGGEDINPAGE) {
      this.props.storeRoute(pathname)
    }
  }


  render() {
    let { auth } = this.props
    const { component: Component, ...rest } = this.props

    // Store the route so that the correct page can be loaded if a login is required
    this.storeRoute()

    return (
      <Route
        { ...rest }
        render={props => {
          return auth.isSignedIn === state.AUTH_SUCCESS ? (
            <Component { ...props } />
          ) : (
            <Redirect to="/signin" />
          )
        }}
      />
    )
  }
}

export default PrivateRoute
