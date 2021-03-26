import React from 'react'

function Spinner(props) {

  var style = {
    width: 100,
    height: 100,
    margin: 100 / 8,
    borderWidth: 100 / 8,
  }

  if (props.size !== undefined) {
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
