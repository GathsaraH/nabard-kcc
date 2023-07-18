import React from 'react'

const DefaultButtonComponent = ({ title, onClick, className, isDisabled}) => {
    return (
        <button disabled={isDisabled} type="button" className={`btn btn-primary ${className}`} onClick={onClick} >
            {title}
        </button>
    )
}

export default DefaultButtonComponent