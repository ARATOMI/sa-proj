import React, { useState, useEffect } from 'react'

const url_update = 'https://psycho.sudox.ru/api/Researcher/EditProject?';

const ProjectDetails = ({ project, user, loadProject }) => {

    const [isEditable, setIsEditable] = useState(false);
    const [edited, setEdited] = useState(project);

    useEffect(() => {setEdited(project)}, [project])

    const handleSubmit = (e) => {
        console.log('id: ', edited.id);
        e.preventDefault();
        console.log(JSON.stringify({
            "id": edited.id,
            "researcherID": user.id,
            "projectStatusID": Number(edited.status),
            "title": edited.title,
            "instructionText": edited.instructionText,
            "dateStart": edited.dateStart,
            "dateEnd": edited.dateEnd,
            "notificationCountPerDay": edited.notificationCountPerDay,
            "notificationTimeout": edited.notificationTimeout,
            "isNotificationsEnabled": edited.isNotificationsEnabled
        }));
        fetch(url_update + new URLSearchParams({
            token: user.token
        }), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": edited.id,
                "researcherID": user.id,
                "projectStatusID": edited.status,
                "title": edited.title,
                "instructionText": edited.instructionText,
                "dateStart": edited.dateStart,
                "dateEnd": edited.dateEnd,
                "notificationCountPerDay": edited.notificationCountPerDay,
                "notificationTimeout": edited.notificationTimeout,
                "isNotificationsEnabled": edited.isNotificationsEnabled
            })
        }).then(res => {
            console.log(res);
            if (res.ok) {
                console.log('UPDATED');
                setIsEditable(false);
                loadProject();
            } else {
                console.log('NOT_UPDATED');
            }
        }).catch(e => {
            console.log('ERROR');
            console.log(e);
        });

    };
    console.log('ProjectDetails: ', project);

    console.log(edited.title, edited.status, edited.dateStart, edited.dateEnd, edited.instructionText);

    if (isEditable) {
        return (
            <article >
                <div className='item'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='form-control'>
                            <label htmlFor='title'>Title: </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={edited.title}
                                onChange={(e) => setEdited({ ...edited, title: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='status'>Status: </label>
                            <input
                                type='number'
                                id='status'
                                name='status'
                                min='1' max='4'
                                value={edited.status}
                                onChange={(e) => setEdited({ ...edited, status: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='dateStart'>Start date: </label>
                            <input
                                type='datetime-local'
                                id='dateStart'
                                name='dateStart'
                                value={edited.dateStart}
                                onChange={(e) => setEdited({ ...edited, dateStart: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='dateEnd'>End date: </label>
                            <input
                                type='datetime-local'
                                id='dateEnd'
                                name='dateEnd'
                                value={edited.dateEnd}
                                onChange={(e) => setEdited({ ...edited, dateEnd: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='instructionText'>Instruction text: </label>
                            <textarea id='instructionText'
                                rows='5'
                                name='instructionText'
                                value={edited.instructionText}
                                onChange={(e) => setEdited({ ...edited, instructionText: e.target.value })}></textarea>
                        </div>

                        <button className='btn cancel' style={{ backgroundColor: 'brown' }} onClick={() => setIsEditable(false)}>Cancel</button>
                        <button type='submit' className='btn' >Save</button>
                    </form>
                </div>
            </article>
        );
    }

    return (
        <article key={project.id} className='project-info'>
            <div className='item'>
                <h3 className='project-title' >{project.title}</h3>
                <h4 className='project-status'>{project.status}</h4>
                <p className='project-date'>{project.dateStart} - {project.dateEnd}</p>
                <div className='project-desc'>{project.instructionText}</div>


                <button className='btn' onClick={() => {setIsEditable(true); setEdited(project)}}>Edit</button>
            </div>
        </article>
    );
}

export default ProjectDetails