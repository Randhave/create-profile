import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Contact = () => {
    const [userMessage, setuserMessage] = useState({ name: '', email: '', phone: '', message: '' });
    const history = useHistory()

    // send user message to database
    const inputEvent = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setuserMessage({ ...userMessage, [name]: value })
    }
    
    const PostMessage = async (e) => {
        e.preventDefault()
        const { name, email, phone, message } = userMessage
        const response = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        })
        const data = await response.json()
        if (!userMessage.name || !userMessage.email || !userMessage.phone || !userMessage.message) {
            alert("Please login before send message")
            history.push('/login')
        }
       else if (!data || response.status === 401) {
            console.log("message not send ! Login our Properly filled")
        }
        else {
            alert("message send successfully")
            history.push('/')
            setuserMessage({ ...userMessage, message: "", name: '', email: '', phone: '' })
        }
    }

    return (
        <>
            <div className="container my-5">
                <div className="row mx-auto info_div">
                    <div className="col-md-4 ">
                        <div className='phone info'>
                            <div className='phone_title'>Phone : </div>
                            <div className='phone_number'> +91 9607061247</div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className='email info'>
                            <div className='email_title'>Email : </div>
                            <div className='email_address'>aniketrandhave@gmail.com</div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="info">
                            <div className='address_title'>Address : </div>
                            <div className='address_name'> Jalna city</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex contact_form">
                <form method="POST">
                    <div className="title">Get in Touch</div>
                    <div className="row mx-auto">
                        <div className="col-md-4 ">
                            <div className='username'>
                                <input type="text" id='username' onChange={inputEvent} name="name" value={userMessage.name} className='username userInfo' autoComplete='off' placeholder='Your name' />
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className='email'>
                                <input type="email" id='email' onChange={inputEvent} name="email" value={userMessage.email} className='email userInfo' autoComplete='off' placeholder='Your Email' />
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className='number'>
                                <input type="text" id='number' onChange={inputEvent} name="phone" value={userMessage.phone} className='number userInfo ' autoComplete='off' placeholder='Your phone number' />
                            </div>
                        </div>
                    </div>
                    <div  >
                        <div className="row mx-auto my-5">
                            <div className="col-md-12 col-12">
                                <div className="message">
                                    <textarea name="message" id='message' onChange={inputEvent} name="message" value={userMessage.message} className='message userInfo ' placeholder='Your message' cols='' rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="btn">
                            <button onClick={PostMessage} >Send message</button>
                        </div>

                    </div>

                </form>
            </div>
        </>
    );
}

export default Contact;
