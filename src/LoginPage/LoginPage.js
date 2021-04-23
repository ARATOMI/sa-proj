import React, { useState, useEffect } from 'react'
import { Redirect, useLocation } from "react-router-dom";

import { users } from './users_list'

const url = 'https://psycho.sudox.ru/api/ResearcherAuth/Login';

const LoginPage = ({ setUser, user }) => {

    const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [tooltip, setTooltip] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email);
        if (emailOrPhoneNumber && password) {

            console.log(JSON.stringify({
                "emailOrPhoneNumber": emailOrPhoneNumber,
                "password": password
            }));

            // const user = users.find(u => u.email === emailOrPhoneNumber || u.phoneNumber === emailOrPhoneNumber);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailOrPhoneNumber: emailOrPhoneNumber,
                    password: password
                })
            }).then(res => {
                console.log(res);
                if (res.status === 400) {
                    return undefined;
                }
                return res.json();
            }).then(data => {
                console.log(data);
                if (data) {
                    setUser({
                        "isLogined": true,
                        "id": data.id,
                        "token": data.token,
                        "nickname": data.nickname,
                        "email": data.email,
                        "phoneNumber": data.phoneNumber
                    });
                } else {
                    setTooltip('wrong values');
                }
            }).catch(e => {
                console.log('ERROR');
                console.log(e);
            });

           
            

        } else {
            setTooltip('empty values');
        }
    };

    let location = useLocation();
    if (user.isLogined) {
        return (
            <Redirect
                to={{
                    pathname: "/projects",
                    state: { from: location }
                }}
            />
        );
    }


    return (
        <section className='section'>
            <div className='title'>

                <h2>Login</h2>
                <div className='underline'></div>

                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='emailOrPhoneNumber'>email/#: </label>
                        <input
                            type='text'
                            id='emailOrPhoneNumber'
                            name='emailOrPhoneNumber'
                            value={emailOrPhoneNumber}
                            onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>password: </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
                {tooltip}
            </div>
        </section>
    )
}

export default LoginPage