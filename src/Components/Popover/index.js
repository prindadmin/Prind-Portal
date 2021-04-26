import ReactDOM from "react-dom";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './Popover.module.css'

function PopOverPortal(props) {
  return ReactDOM.createPortal(props.children, document.querySelector("#popOver"));
}

export class Popover extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleClose: PropTypes.func.isRequired,
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  render() {
    return (
      <PopOverPortal>
        <div id='popover-greyer' className={classes.popoverGreyer} onClick={this.handleClick}>
          <div id='popover-container' className={classes.popoverContainer} onClick={(e) => {e.stopPropagation()}}>
            { this.props.children }
          </div>
        </div>
      </PopOverPortal>
    )
  }
}

export default Popover;
