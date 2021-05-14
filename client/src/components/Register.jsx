import React, { useState } from 'react';
import loginPic from '../images/login_icon.jpg'
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        name: '', phone: '', profession: '', email: '', password: '', cpassword: ''
    });  
    const history = useHistory()
    let name, value

    const inputEvent = (event) => {
        name = event.target.name  
        value = event.target.value   
        setUser({
            ...user, [name]: value   
        })
    }
    
    const postData = async (event) => {
        event.preventDefault()
        try {
            const { name, phone, profession, email, password, cpassword } = user
            const response = await fetch("/register", {    
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, phone, profession, email, password, cpassword
                }),
            })
          
            const data = await response.json()
            if (response.status === 422 || !data) {
                window.alert('Invalid Registration')  
            }
            else {
                window.alert('Registered successfully')
                history.push('/login')
            }
        }
        catch (error) {
            window.alert('Invalid Registration  ! Password should be same')
            console.log(error)
        }
    }

    return (
        <>
            <div className='container my-4 '>
                <div className='col-md-10 col-12 mx-auto register_div '>
                    <div className="row ">
                        <div className="col-md-6  mx-auto  ">
                            <form method="POST"  >
                                <div className="mb-3">
                                    <label for="name" className="form-label">Name</label>
                                    <input type="text" onChange={inputEvent} autoComplete='off' className="form-control" value={user.name} name='name' id="name" placeholder='Enter Name' aria-describedby="emailHelp" />
                                </div>

                                <div className="mb-3">
                                    <label for="phone" className="form-label">Contact</label>
                                    <input type="text" onChange={inputEvent} autoComplete='off' className="form-control" value={user.phone} name='phone' id="phone" placeholder='Enter phone' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="Profession" className="form-label">Profession</label>
                                    <input type="text" onChange={inputEvent} autoComplete='off' className="form-control" value={user.profession} name='profession' id="Profession" placeholder='Enter Profession' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" onChange={inputEvent} autoComplete='off' className="form-control" value={user.email} name='email' id="email" placeholder='Enter Email' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" onChange={inputEvent} autoComplete='off' className="form-control" value={user.password} name='password' id="password" placeholder='Enter password' />
                                </div>
                                <div className="mb-3">
                                    <label for="cpassword" className="form-label">Confirm password</label>
                                    <input type="password" onChange={inputEvent} autoComplete='off' className="form-control" value={user.cpassword} name='cpassword' id="cpassword" placeholder='Confirm password' />
                                </div>

                                <button type="submit" id="register" onClick={postData} className="text-center btn btn-success">Register</button>
                            </form>
                        </div>
                        <div className="col-md-6 mx-auto image_div ">
                            <div className="imageclass ">
                                <figure my-0 mx-0>
                                    <img src={loginPic} alt="phone image" />
                                </figure>
                            </div>
                            <div>
                                <NavLink className="nav-link login_link" to="/Login" >Already have account</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

// postData ye jo function he , ye sirf user ka data './register' backend ke route ko post krega
// after user data post krne ke baad backend ka jo code he vo database se connected he , toh backend ka code he database ko stored/send krega
// Uper ka jo postData function he , ye database me user ka data stored nhi kr skta or nhi krega , vo sirf backend ke jo route he usme se './register'  ko post krega.
