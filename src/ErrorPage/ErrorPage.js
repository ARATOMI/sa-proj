import React, { useState, useContext, useEffect } from 'react'


const url = 'https://psycho.sudox.ru/api/Researcher/GetAllProjects?';

const ErrorPage = () => {

    const [req, setReq] = useState({});

    console.log(JSON.stringify({
        emailOrPhoneNumber: "bys@mail.ru",
        password: "21"
    }));
    useEffect(() => {


        // fetch(url,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: JSON.stringify({
        //             emailOrPhoneNumber: "bys@mail.ru",
        //             password: "21"
        //         })
        //     }).then(res => {
        //         console.log(res);
        //         return res.json();
        //     }).then(data => {
        //         console.log(data);
        //         setReq(data);
        //     }).catch(e => {
        //         console.log('ERROR');
        //         console.log(e);
        //     })


        fetch(url + new URLSearchParams({
            token: 'fB@/|f2Y;@\\5B@<eD$*MK)52*:M6!&nH\'1<eVQJO1H_Gp~|jX[9a>:i]-/&b'
        }),
            {
                method: 'GET'
            }).then(res => {
                console.log(res);
                return res.json();
            }).then(data => {
                console.log(data);
                setReq(data);
            }).catch(e => {
                console.log('ERROR');
                console.log(e);
            });
    }, []);

    return (
        <section className='section'>
            <div className='title'>

                <h2>ErrorPage</h2>

                <div className='underline'></div>
            </div>
        </section>
    )
}

export default ErrorPage