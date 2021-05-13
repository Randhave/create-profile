import React, { useState, useEffect } from 'react';

const Home = () => {
    const [name, setname] = useState('');
    const [Show, setShow] = useState(false);

    const UserHomePage = async () => {
        try {
            const response = await fetch('/getData', {    
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json()
          
            setname(data.name)
            setShow(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        UserHomePage()
    }, [])

    return (
        <div className="home_div">
            <h4>{name} WELCOME TO HOME PAGE:</h4>
            <h4>{Show ? 'We will back' : 'We are the MERN devloper'}</h4>
        </div>
    );
}

export default Home;
