import React from 'react'
import "./Error.css"

const Error = () => {
    return (
        <>
            <div className='error_container'>
                <div className='error_div'>
                    <h1 className='error_heading'>404</h1>
                    <h2 className='error_text'>You are not Authorised For This Page.</h2>
                </div>
            </div>
        </>
    )
}

export default Error