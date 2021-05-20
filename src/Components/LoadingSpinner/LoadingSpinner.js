import React from 'react'

function Spinner(props) {

  var style = {}

  if (props.size) {
    style = {
      width: props.size,
      height: props.size,
      margin: props.size / 8,
      borderWidth: props.size / 8,
    }
  }

  if (props.style) {
    style = Object.assign(props.style, style)
  }

  return (
    <React.Fragment>
      <div className='lds-ring' style={style}>
        <div style={style}></div>
        <div style={style}></div>
        <div style={style}></div>
        <div style={style}></div>
      </div>
    </React.Fragment>
  )
}

export default Spinner
