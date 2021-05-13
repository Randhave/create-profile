import React, { useContext, useEffect } from 'react';
import logoutPic from '../images/logout.png'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App'

const Logout = () => {
   
    const history = useHistory()

    const { state, dispatch } = useContext(UserContext)

    // using logout frontend code by promices 
    useEffect(() => {
       
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: 'USER', payload: false })
            alert("You choose Logout")
            history.push('/', { replace: true })
            if (res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        }).catch((error) => { 
            console.log(error)
        })
    }, [])

    return (
        <div className='logout_div'>
         <figure className='logout_img'>
                <img id="logImg" src={logoutPic} alt="Logout" />
         </figure>
        </div>
    );
}

export default Logout;
