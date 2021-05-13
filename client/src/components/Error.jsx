import React from 'react';
import errorPage from '../images/errorPage.jpg'
const Error = () => {
    return (
        <div className='error'>
            <figure>
                <img src={errorPage} alt="Errpr" />
            </figure>
            <a href="/" className='btn error_btn'>Back to Home</a>
        </div>
    );
}

export default Error;
