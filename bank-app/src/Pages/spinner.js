import React from 'react'
import './Css/spinner.css'
export default function spinner(props) {
  return (
    <>
      {props.loading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </>
  )
}
