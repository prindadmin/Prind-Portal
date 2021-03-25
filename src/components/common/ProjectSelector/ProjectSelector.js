import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge } from '@fortawesome/free-solid-svg-icons'

import ProjectSelectorPopUp from './elements/ProjectSelectorPopUp'
import PopOverHandler from '../popOverHandler'

import * as Strings from '../../../Data/Strings'

class ProjectSelector extends React.Component {
  static propTypes = {
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectName: PropTypes.string,
      }).isRequired,
    }).isRequired,
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
      this.setState({ showPopup: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.openProjectSelector !== prevProps.openProjectSelector) {
      this.setState({ showPopup: this.props.openProjectSelector })
    }
  }


  openProjectSelectorPopover = () => {
    this.setState({ showPopup: true })
  }


  cancelPopup = () => {
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
