import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Button } from '@blueprintjs/core'
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
      this.setState({ showPopup: true })
    }
  }


  openProjectSelectorPopover = () => {
    this.setState({ showPopup: true })
  }

  cancelPopup = () => {
    this.setState({ showPopup: false })
  }

  render() {
    const { chosenProject } = this.props.projects

    var buttonText = Strings.NO_PROJECT_SELECTED

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
          onClick={this.openProjectSelectorPopover}
        >
          {buttonText}
        </Button>

        {this.state.showPopup ?
          <PopOverHandler>
            <ProjectSelectorPopUp
              onCancelPopup={ this.cancelPopup }
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
