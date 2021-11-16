import React from 'react'
import PropTypes from 'prop-types'
import classes from "./ErrorBoundary.module.css";

import * as Strings from '../../Data/Strings'

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    onRetry: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
    console.warn(error, errorInfo)
  }

  retryClicked = (e) => {
    if (this.props.onRetry) {
      this.props.onRetry(e)
    }
    this.setState({
      hasError: false
    })
  }


  render() {
    // If there is no error, render the children
    if (!this.state.hasError) {
      return this.props.children;
    }

    // If there is an error, render some fallback UI
    return (
      <div className={classes.container}>
        <h1>Something went wrong.</h1>
        <input
          id="retry-button"
          type="submit"
          value={Strings.BUTTON_RETRY}
          onClick={this.retryClicked} />
      </div>
    )
  }
}
