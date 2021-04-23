import React, { useState, useEffect } from 'react'
import { Redirect, useLocation } from "react-router-dom";
import { Link, useParams } from 'react-router-dom';

import ProjectTab from './ProjectTab';

const url_load = 'https://psycho.sudox.ru/api/Researcher/GetInfoForProjectById?';

const Project = ({ user }) => {

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState({});
    const [currentTab, setCurrentTab] = useState('PROJECT')

    const loadProject = () => {
        fetch(url_load + new URLSearchParams({
            id: id,
            token: user.token
        }),
            {
                method: 'GET'
            }).then(res => {
                console.log(res);
                return res.json();
            }).then(data => {
                console.log(data);
                setProject(data);
            }).catch(e => {
                console.log('ERROR');
                console.log(e);
            });
    };

    useEffect(() => {

        loadProject();
        setIsLoading(false);
    }, []);



    let location = useLocation();
    if (!user.isLogined) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />
        );
    };

    if (isLoading) {
        return (
            <section className='section'>
                <div className='title'>
                    <h2>Project</h2>
                    <div className='underline'></div>
                </div>
                <div className='projects-list'>
                    <h3>Loading</h3>
                </div>

            </section>
        );
    }
    console.log('Project: ', project);
    return (
        <section className='section'>
            <div className='title'>

                <h2>Project ID: {id}</h2>
                <div className='underline'></div>

                <div className='project-details'>
                    <div className='project-details-sidebar'>
                        <button className={`project-tab ${currentTab === 'PROJECT' && 'active-tab'}`} onClick={() => setCurrentTab('PROJECT')}>
                            Project
                        </button>
                        <button className={`project-tab ${currentTab === 'PARTISIPANTS' && 'active-tab'}`} onClick={() => setCurrentTab('PARTISIPANTS')}>
                            Partisipants
                        </button>
                        <button className={`project-tab ${currentTab === 'QUESTIONS' && 'active-tab'}`} onClick={() => setCurrentTab('QUESTIONS')}>
                            Questions
                        </button>
                        <button className={`project-tab ${currentTab === 'NOTIFICATIONS' && 'active-tab'}`} onClick={() => setCurrentTab('NOTIFICATIONS')}>
                            Notifications
                        </button>
                    </div>

                    <div className='project-details-content'>
                        <ProjectTab project={project} user={user} currentTab={currentTab} />
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Project