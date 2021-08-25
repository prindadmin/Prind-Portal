import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './StandardMapper.module.css'

/*  Components  */
import PageFieldMapper from '../PageFieldMapper'


export class StandardMapper extends Component {
  static propTypes = {
    pageName: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["file", "dropdown", "calendar", "longText"]),
        default: PropTypes.bool.isRequired,
        editable: PropTypes.bool.isRequired,
        fileDetails: PropTypes.arrayOf(
          PropTypes.shape({
            uploadName: PropTypes.string.isRequired,
            uploadedBy: PropTypes.string.isRequired,
            ver: PropTypes.string.isRequired,
            uploadedDateTime: PropTypes.number.isRequired,
            proofLink: PropTypes.string,
            signatures: PropTypes.arrayOf(
              PropTypes.shape({
                signerName: PropTypes.string.isRequired,
                signatureDateTime: PropTypes.number.isRequired,
                proofLink: PropTypes.string.isRequired,
              })
            )
          })
        )
      })
    ).isRequired
  }

  constructor() {
    super()
    this.state = {
      open: false
    }
  }


  onClickHeading = (e) => {
    console.log("heading clicked")
    e.stopPropagation()
    this.setState({
      open: !this.state.open
    })
  }


  getFields = () => {
    const mappedFields = this.props.fields.map((singleField, index) => {
      return <PageFieldMapper
        key={index}
        pageName={this.props.pageName}
        projectId={this.props.projectId}
        singleField={singleField} />
    })
    return mappedFields
  }

  render() {

    var fieldsStyle = {
      maxHeight: this.state.open ? 9999 : 0,
      opacity: this.state.open ? 1 : 0,
      paddingTop: this.state.open ? "var(--standard-padding)" : 0,
    }

    return (
      <div id='standard' className={classes.standard}>
        <div className={classes.heading} onClick={(e) => this.onClickHeading(e)}>
          <b>{ this.props.name }</b>
          { /* TODO: Add in symbol to show the open and closed states */ }
        </div>
        <div className={classes.fields} style={fieldsStyle}>
          { this.getFields() }
        </div>
      </div>
    )
  }
}

export default StandardMapper
