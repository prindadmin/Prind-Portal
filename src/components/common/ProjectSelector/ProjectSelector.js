import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge } from '@fortawesome/free-solid-svg-icons'

import ProjectSelectorPopUp from './elements/ProjectSelectorPopUp'
import PopOverHandler from '../popOverHandler'

import * as Strings from '../../../Data/Strings'

class ProjectSelector extends React.Component {
  static propTypes = {
    projects: PropTypes.object.isRequired,
    openProjectSelector: PropTypes.bool.isRequired,
  }

  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  componentDidMount() {
    if (this.props.openProjectSelector) {
      console.log("opening project selector")
      this.setState({ showPopup: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.openProjectSelector !== prevProps.openProjectSelector) {
      console.log("changing state of project selector")
      this.setState({ showPopup: this.props.openProjectSelector })
    }
  }


  openProjectSelectorPopover = () => {
    console.log("opening project selector")
    this.setState({ showPopup: true })
  }


  cancelPopup = () => {
    console.log("closing popup selector")
    this.setState({ showPopup: false })
  }


  getButton = ( buttonText ) => {
    const ico = <FontAwesomeIcon icon={faThLarge} size="1x"/>
    return (
      <button
        id='search-field'
        className='search-field'
        onClick={this.openProjectSelectorPopover} >
        <span>
          {ico}{buttonText}
        </span>
      </button>
    )
  }


  render() {
    const { chosenProject } = this.props.projects

    var buttonText = Strings.NO_PROJECT_SELECTED

    if (chosenProject !== undefined) {
      buttonText = chosenProject.projectName
    }

    return (
      <div className='project-selector'>
        {
          this.getButton(buttonText)
        }
        {
          this.state.showPopup ?
          <PopOverHandler>
            <ProjectSelectorPopUp
              onCancelPopup={ this.cancelPopup }
            />
          </PopOverHandler> :
          null
        }
      </div>
    )
  }
}

export default ProjectSelector
