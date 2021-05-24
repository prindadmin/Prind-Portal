import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './ProjectTemplatesSection.module.css'

// Data
import * as Strings from '../../Data/Strings'

// Components

export class ProjectTemplatesSection extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string,
        projectType: PropTypes.string,
        projectName: PropTypes.string,
        projectDescription: PropTypes.string,
        projectReference: PropTypes.string,
        projectAddressLine1: PropTypes.string,
        projectAddressLine2: PropTypes.string,
        projectAddressLine3: PropTypes.string,
        projectAddressTown: PropTypes.string,
        projectAddressRegion: PropTypes.string,
        projectAddressPostalCode: PropTypes.string,
        projectAddressCountry: PropTypes.string,
        projectTemplates: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            templates: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                selected: PropTypes.bool.isRequired,
                current: PropTypes.bool.isRequired
              })
            ).isRequired
          })
        ).isRequired
      })
    }).isRequired,
    isCreateProject: PropTypes.bool.isRequired,
    returnCurrentSelection: PropTypes.func,
    updateProjectDetails: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const originalTemplates = props.projects.chosenProject.projectTemplates
    var projectTemplateIdsInUse = originalTemplates.map((templateCategory, index) => {
      return this.getSelectedTemplatesInCategory(templateCategory.templates)
    })

    // Now flaten the array of array
    projectTemplateIdsInUse = projectTemplateIdsInUse.reduce((total, templateArray) => {
      return total.concat(templateArray)
    }, [])

    this.state = {
      projectTemplates: props.projects.chosenProject.projectTemplates,
      originalProjectTemplateIdsInUse: projectTemplateIdsInUse,
      currentProjectTemplatesIdsInUse: projectTemplateIdsInUse,
    }
  }

  getSelectedTemplatesInCategory = (templatesInCategory) => {
    const result = templatesInCategory.map((template, index) => {
      return template.selected ? template.id : null
    })
    return result.filter((entry) => entry !== null)
  }


  getHeader = () => {
    return (
      <div className='header-section'>
        <h2>{Strings.EDIT_PROJECT_TEMPLATES}</h2>
      </div>
    )
  }

  handleInputChange = (event) => {
    const { currentProjectTemplatesIdsInUse } = this.state
    const target = event.target;
    console.log(target)
    console.log(target.id)
    // TODO: Change the state of the recorded value
    var newProjectTemplates = currentProjectTemplatesIdsInUse.slice().sort();

    if (newProjectTemplates.includes(target.id)) {
      newProjectTemplates.splice(newProjectTemplates.indexOf(target.id))
    } else {
      newProjectTemplates.push(target.id)
    }
    // Set the state to the new list of projectIds
    this.setState({
      currentProjectTemplatesIdsInUse: newProjectTemplates
    })
    // If the project editor has been asked to return the selected templates to a parent, do it
    if (this.props.returnCurrentSelection) {
      this.props.returnCurrentSelection(newProjectTemplates)
    }
  }

  getTemplates = (templates) => {
    const mappedTemplates = templates.map((template, index) => {
      const checkedState = this.state.currentProjectTemplatesIdsInUse.includes(template.id) ? 1 : 0
      const originallyChecked = this.state.originalProjectTemplateIdsInUse.includes(template.id) ? 1 : 0
      return (
        <Fragment key={index}>
          <input
            type="checkbox"
            key={index}
            id={template.id}
            name={template.name}
            onChange={this.handleInputChange}
            checked={ checkedState }
            disabled={ originallyChecked }/>
          <label htmlFor={template.id}> {template.name}</label>
        </Fragment>
      )
    })
    return mappedTemplates
  }


  getTemplateCategories = () => {
    const { projectTemplates } = this.props.projects.chosenProject
    const categories = projectTemplates.map((templateCategory, index) => {
      return (
        <div key={index} className={classes.templateCategory}>
          <div className={classes.templateHeading}>{templateCategory.name}</div>
          <div className={classes.templateHolder}>
            {
              this.getTemplates(templateCategory.templates)
            }
          </div>
        </div>
      )
    });

    return categories
  }

  getFooter = () => {
    const { originalProjectTemplateIdsInUse, currentProjectTemplatesIdsInUse } = this.state
    const originalProjectTemplatesSorted = originalProjectTemplateIdsInUse.slice().sort();
    const currentProjectTemplatesSorted = currentProjectTemplatesIdsInUse.slice().sort();
    const hasChanged = JSON.stringify(originalProjectTemplatesSorted) !== JSON.stringify(currentProjectTemplatesSorted)
    // If this is a new project, don't have a save changes button
    if (this.props.isCreateProject) {
      return null
    }
    // Existing projects have a save changes button
    return (
      <div>
        <input
          type='submit'
          className={classes.button}
          disabled={!hasChanged}
          value={Strings.BUTTON_SAVE_CHANGES}
          onClick={this.updateProjectTemplates} />
      </div>
    )
  }

  updateProjectTemplates = () => {
    // TODO: Write this function
    return;
  }


  getTemplatesAvailable = () => {
    return (
      <div className={classes.formContainer}>
        {this.getHeader()}
        {this.getTemplateCategories()}
        {this.getFooter()}
      </div>
    )
  }


  // TODO: Make scrollable
  render() {
    return (
      <div id='project-templates-section' className={classes.projectTemplatesSection}>
        {
          this.getTemplatesAvailable()
        }
      </div>
    )
  }
}

export default ProjectTemplatesSection
