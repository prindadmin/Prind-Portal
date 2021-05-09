import React, { Component, lazy, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './CalendarPicker.module.css'

import { DatePicker } from '@blueprintjs/datetime'

import * as Strings from '../../../Data/Strings'
import * as ComponentStates from '../../ComponentStates'
import SHORTCUTS from './shortcuts'

const ErrorTile = lazy(() => import('../../ErrorTile'));
const LoadingSpinner = lazy(() => import('../../LoadingSpinner'))

// TODO: BUG: Fix at mobile resolutions (extends past edge of screen)
// TODO: FUTURE: Remove blueprintjs/datetime from calendar


export class CalendarPicker extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fieldDetails: PropTypes.shape({
        dateValue: PropTypes.string,
      }).isRequired,
    }),
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string
      }).isRequired
    }).isRequired,
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      updateInProgress: false,
      updateError: false,
      errorText: "",
      selectedDate: new Date(),
      state: ComponentStates.QUIESCENT
    }
  }

  componentDidMount() {
    if (this.props.elementContent.fieldDetails.dateValue) {
      this.setState({
        selectedDate: new Date(this.props.elementContent.fieldDetails.dateValue)
      })
    }
  }


  // When the user wants to save the changes, update the server
  saveChanges = () => {
    const { pageName, projects, elementContent } = this.props
    this.setState({
      state: ComponentStates.LOADING
    })

    const fieldDetails = {
      dateValue: this.state.selectedDate
    }

    this.props.updateField(
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      { fieldDetails },
      this.saveResolve,
      this.saveReject,
    )
  }

  saveResolve = () => {
    this.setState({
      state: ComponentStates.QUIESCENT,
    })
  }

  saveReject = () => {
    console.log("error when updating field")
    this.setState({
      state: ComponentStates.ERROR_WHEN_LOADING,
      errorText: Strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }

  getDisabledDates = () => {
    const { editable } = this.props.elementContent
    const today = new Date()
    // If editable, set dates +- 10 years
    if (editable) {
      return {
        minDate: new Date(Math.min(today.getFullYear(), this.state.selectedDate.getFullYear()) - 10,1,1,0,0,0),
        maxDate: new Date(today.getFullYear() + 9,11,31,23,59,59)
      }
    }
    // If not editable, lock the date to today
    return {
      minDate: new Date(today.setHours(0,0,0,0)),
      maxDate: new Date(today.getTime() + 86400000 - 1000)
    }
  }

  onChangeDateSelection = (newDate) => {
    this.setState({
      selectedDate: newDate ? newDate : new Date()
    })
  }

  getCalendarPicker = () => {

    return (
      <DatePicker
        {...this.getDisabledDates()}
        onChange={this.onChangeDateSelection}
        highlightCurrentDay={true}
        reverseMonthAndYearMenus={true}
        shortcuts={SHORTCUTS}
        value={this.state.selectedDate}
        />
    )
  }

  getContent = () => {
    const { editable } = this.props.elementContent
    return (
      <Fragment>
        {
          this.getCalendarPicker()
        }
        <input
          type="submit"
          disabled={!editable}
          value={Strings.BUTTON_SAVE_CHANGES}
          onClick={this.saveChanges}
          />
      </Fragment>
    )
  }


  render() {
    return (
      <div id='calendar-picker-element'>
        <div className='calendar-picker-element-container'>
          <div className='element-title'>
            {this.props.elementContent.title}
          </div>

          <div className='element-description'>
            {this.props.elementContent.description}
          </div>

          <div className={classes.contentContainer}>
            {
              this.state.state === ComponentStates.LOADING ? <LoadingSpinner /> : null
            }
            {
              this.state.state === ComponentStates.ERROR_WHEN_LOADING ? <ErrorTile text={this.state.errorText} /> : null
            }
            {
              this.state.state === ComponentStates.QUIESCENT ? this.getContent() : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CalendarPicker
