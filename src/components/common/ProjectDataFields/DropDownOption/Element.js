import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  MenuItem,
  TextArea,
  FormGroup,
  Intent,
  Alignment,
} from '@blueprintjs/core'

import { Select } from "@blueprintjs/select";

import * as strings from '../../../../data/Strings'

// TODO: Implement FORM wrapper
// TODO: Disable save button until changes are made

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fieldDetails: PropTypes.object.isRequired,
    })
  }

  constructor() {
    super()
    this.state = {
      selectedValue: strings.NO_VALUE_SELECTED,
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  onItemSelected = (item) => {
    this.setState({
      selectedValue: item.name,
    })
  }

  itemRenderer = (item, { handleClick }) => {

    return(
      <MenuItem
          key={item.id}
          text={item.name}
          onClick={handleClick}
          shouldDismissPopover={true}
        />
      )
  }

  saveChanges = (e) => {
    console.log(e)
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { title, description, fieldDetails } = this.props.elementContent
    const { selectedValue } = this.state

    const values = [
      {
        id: 1,
        name: strings.YES
      },
      {
        id: 2,
        name: strings.NO
      },
    ]

    const input = {
      name: title
    }

    return (
      <div id='drop-down-element'>
        <div className={'drop-down-element-container'}>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>

            <div className='row'>
              <div className='col'>
                <Select
                  items={values}
                  noResults={<MenuItem disabled={true} text="No results." />}
                  itemRenderer={this.itemRenderer}
                  onItemSelect={this.onItemSelected}
                >
                  <Button
                    text={selectedValue}
                    rightIcon="double-caret-vertical"
                    alignText={Alignment.LEFT}
                  />
                </Select>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                {
                  selectedValue === strings.YES ?
                  <FormGroup
                    label={strings.IF_YES_PROVIDE_DETAILS}
                    labelFor="extraInfo"
                    labelInfo=""
                    className="last"
                  >
                    <TextArea
                      name="extraInfo"
                      growVertically={true}
                      fill={true}
                      placeholder={strings.IF_YES_PROVIDE_DETAILS}
                    />
                  </FormGroup> :
                  null
                }
              </div>
            </div>

            <div className='row'>
              <div className='col'>
              <Button
                text={strings.BUTTON_SAVE_CHANGES}
                intent={Intent.PRIMARY}
                onClick={e => this.saveChanges(e)}
              />
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Element
