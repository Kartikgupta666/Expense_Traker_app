import React from 'react'

export default function Alert(props) {
    return (
        <>
            <div>
                {props.alert && (<div className={`position-relative float-end alert alert-${props.alert.types} alert-dismissible fade show`} role="alert">
                    <b>{props.alert.msg}</b>
                </div>)}
            </div>

           
        </>
    )
}
