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
    updateProjectDetails: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      projectTemplates: props.projects.chosenProject.projectTemplates
    }
  }

  getHeader = () => {
    return (
      <div className='header-section'>
        <h2>{Strings.EDIT_PROJECT_TEMPLATES}</h2>
      </div>
    )
  }

  handleInputChange = (event) => {
    const target = event.target;
    console.log(target)
    console.log(target.id)
    // TODO: Change the state of the recorded value
  }

  // TODO: Check options received from the server
  // TODO: Disable checked options received from the server
  getTemplates = (templates) => {
    const mappedTemplates = templates.map((template, index) => {
      return (
        <Fragment key={index}>
          <input type="checkbox" key={index} id={template.id} name={template.name} value={template.name} onChange={this.handleInputChange}/>
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
    return (
      <div>
        {/* footer here */}
      </div>
    )
  }

  // TODO: Add in save button
  getTemplatesAvailable = () => {
    return (
      <Fragment>
        <div className="form-container">
          {this.getHeader()}
          {this.getTemplateCategories()}
          {this.getFooter()}
        </div>
      </Fragment>
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
