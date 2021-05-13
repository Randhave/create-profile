import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import pic from '../images/user.png'

const About = () => {
    const [user, setuserData] = useState({ name: '', email: '', phone: '', profession: '' });
    const history = useHistory()

    const GetAboutPage = async () => {
        try {
            const response = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await response.json()
            setuserData(data)

            if (!response.status === 201) {
                const error = new Error(response.error)
                throw error
            }
        }
        catch (error) {
            console.log(error)
            history.push('/login')
        }
    }

    useEffect(() => {
        GetAboutPage()
    }, [])

    return (
        <>
            <div className="container mx-auto about_div my-5 about">
                <form method="GET" className='about_center'>
                    <div className="row mx-auto my-4">
                        <div className="col-md-4">
                            <figure>
                                <img src={pic} alt="image" />
                            </figure>
                        </div>
                        <div className="col-md-6 mx-auto">
                            <h4>{user.name}</h4>

                            <p>{user.profession}</p>
                            <p className="profile_rating mt--2 mb-3">RANKINGS : <strong>1/10</strong></p>

                            <ul className="nav nav-tabs my-5" role='tablist'>
                                <li className="nav-item mb-1">
                                    <a href="#home" className="nav-link active" id="home-tab" aria-controls='home' data-toggle="tab">About</a>
                                </li>
                                <li className="nav-item mx-4 mb-1">
                                    <a href="#profile" className="nav-link                                                                 " id="profile-tab" aria-controls='profile' data-toggle="tab">Timeline</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2 mx-auto">
                            <input type="button" className='profile_edit btn' value='Edit profile' placeholder='Edit profile' />
                        </div>
                    </div>

                    <div className="row column_div">
                        <div className="col-md-4 ">
                            <div className="profile_work  ">
                                <p>WORK LINK</p>
                                <a href="https://www.youtube.com/" taget="__aniket">YouTube</a><br />
                                <a href="https://nodejs.org/en/" taget="__aniket">Node js</a><br />
                                <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" taget="__aniket">Express</a><br />
                                <a href="https://reactjs.org/" taget="__aniket">React js</a><br />
                                <a href="https://www.mongodb.com/" taget="__aniket">mongoDB</a><br />
                                <a href="https://docs.oracle.com/javase/7/docs/api/" taget="__aniket">Java official</a>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role='tabpanel' aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user._id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p> {user.profession}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby='profile-tab'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label> Hourly Rate </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>10$ hr</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Total Projects </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>100</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label> Dream </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Complete full Stack devloper</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Habbits</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Thinking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default About;
