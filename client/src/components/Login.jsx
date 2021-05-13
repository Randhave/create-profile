import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginPic from '../images/login_icon.jpg'
import { UserContext } from '../App'
import {NavLink} from 'react-router-dom'
const Login = () => {

    const { state, dispatch } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await response.json()

            if (response.status !== 201 || response.status === 422 ) {
                alert("Invalid Registration")
            }
            else {
                dispatch({ type: 'USER', payload: true })
                alert("Looged in Successfully")
                history.push('/')
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='container my-4 login_div '>
                <div className='col-md-10 col-12 mx-auto d-flex justify-content-center align-items-center  '>
                    <div className="row main_div">
                        <div className="col-md-6 mx-auto  ">
                            <div >
                                <figure>
                                    <img src={loginPic} alt="contact image" />
                                </figure>
                            </div>

                        </div>
                        <div className="col-md-6  mx-auto   ">
                            <form className='login_form' method="POST">

                                <div className="mb-3">
                                    <label for="username" className="form-label">username</label>
                                    <input type="username" autoComplete='off' className="form-control" onChange={(e) => setEmail(e.target.value)} name='username' id="username" placeholder='Enter Email' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">password</label>
                                    <input type="password" autoComplete='off' className="form-control" onChange={(e) => setPassword(e.target.value)} name='password' id="password" placeholder='Enter password' />
                                </div>

                                <button type="submit" onClick={loginUser} className="text-align-center btn btn-success">Login</button>
                                <NavLink to='/register' className='btn'>Create an Account</NavLink>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
