import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Redirect, useLocation } from "react-router-dom";


import { projects as projects_list } from './projects_list'

const url_load = 'https://psycho.sudox.ru/api/Researcher/GetAllProjects?';
const url_add = 'https://psycho.sudox.ru/api/Researcher/AddProject?';
const url_delete = 'https://psycho.sudox.ru/api/Researcher/DeleteProject?';

const Projects = ({ user }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    const [lastID, setlastID] = useState(0);

    const loadProjects = () => {
        fetch(url_load + new URLSearchParams({
            token: user.token
        }),
            {
                method: 'GET'
            }).then(res => {
                console.log(res);
                return res.json();
            }).then(data => {
                console.log(data);
                setProjects(data);
            }).catch(e => {
                console.log('ERROR');
                console.log(e);
            });
    };

    useEffect(() => {

        loadProjects();
        setIsLoading(false);
        setlastID(projects_list.length + 1);
    }, []);


    const addProject = () => {

        fetch(url_add + new URLSearchParams({
            token: user.token
        }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                "projectStatusID": 1,
                "title": "New project",
                "instructionText": "instruction text",  
                "notificationCountPerDay": 0,
                "notificationTimeout": 0,
                "isNotificationsEnabled": true
              })
        }).then(res => {
            console.log(res);
            if (res.ok) {
                console.log('ADDED');
            } else {
                console.log('NOT_ADDED');
            }
            loadProjects();
        }).catch(e => {
            console.log('ERROR');
            console.log(e);
        });        
    };

    const deleteProject = (id) => {

        fetch(url_delete + new URLSearchParams({
            id: id,
            token: user.token
        }), {
            method: 'DELETE'
        }).then(res => {
            console.log(res);
            if (res.ok) {
                console.log('DELETED');
            } else {
                console.log('NOT_DELETED');
            }
            loadProjects();
        }).catch(e => {
            console.log('ERROR');
            console.log(e);
        });
    }

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
                    <h2>Projects</h2>
                    <div className='underline'></div>
                </div>
                <div className='projects-list'>
                    <h3>Loading</h3>
                </div>

            </section>
        );
    }


    return (
        <section className='section'>
            <div className='title'>
                <h2>Projects</h2>
                <div className='underline'></div>
            </div>

            <button
                className='btn'
                style={{ marginLeft: '2rem' }}
                onClick={addProject}
            >Add</button>
            <div className='projects-list'>
                {projects.map((project) => {
                    return (
                        <article key={project.id} className='project-info'>
                            <div className='item'>
                                <h3 className='project-title'>{project.title}</h3>
                                <h4 className='project-status'>{project.status}</h4>
                                <p className='project-date'>{project.dateStart} - {project.dateEnd}</p>
                                <div className='project-desc'>{project.instructionText}</div>

                                <Link to={`/project/${project.id}`}><button className='btn project-details-btn'>Details</button></Link>
                                <button
                                    className='btn project-delete-btn'
                                    onClick={() => deleteProject(project.id)}
                                >Delete</button>
                            </div>
                        </article>
                    );
                })
                }
            </div>

        </section>
    )
}

export default Projects