import React from 'react'

function Spinner(props) {

  var style = {}

  if (props.size !== undefined) {
    console.log("spinner size provided")
    style = {
      width: props.size,
      height: props.size,
      margin: props.size / 8,
      borderWidth: props.size / 8,
    }
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
