import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Button } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge } from '@fortawesome/free-solid-svg-icons'

import ProjectSelectorPopUp from './ProjectSelectorPopUp'
import PopOverHandler from '../popOverHandler'

import * as strings from '../../../data/Strings'

import * as Endpoints from '../../../endpoints'

class ProjectSelector extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    chosenProject: PropTypes.object.isRequired,
  }

  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  componentDidMount() {

  }


  // Fired when the user clicks on a project on the project selector popup
  projectChosen = (project) => {

    const { pathname } = this.props.location

    this.setState({ showPopup: false })
    this.props.updateChosenProject(project)

    if (pathname === '/NewProject') {
      this.props.history.push(Endpoints.DEFAULTLOGGEDINPAGE)
    }

  }

  changeProject = () => {
    this.setState({ showPopup: true })
  }

  cancelPopup = () => {
    this.setState({ showPopup: false })
  }

  createNewProject = () => {
    this.projectChosen({
      projectName: "Creating new project..."
    })

    this.props.history.push('/NewProject')
  }

  render() {
    const { chosenProject } = this.props

    var buttonText = strings.NO_PROJECT_SELECTED

    if (chosenProject !== undefined) {
      buttonText = chosenProject.projectName
    }

    const ico = <FontAwesomeIcon icon={faThLarge} />

    return (
      <div className='project-selector'>
        <Button
          className='search-field'
          id='search-field'
          large
          alignText='left'
          icon={<Icon icon={ico} />}
          onClick={this.changeProject}
        >
          {buttonText}
        </Button>

        {this.state.showPopup ?
          <PopOverHandler>
            <ProjectSelectorPopUp
              projects={ this.props.projects }
              onCancelPopup={ this.cancelPopup }
              onProjectChosen={ this.projectChosen }
              onCreateNewProject={ this.createNewProject }
            />
          </PopOverHandler>
          :
          null
        }
      </div>
    )
  }
}

export default ProjectSelector
