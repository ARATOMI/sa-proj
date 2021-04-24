import React, { useState, useEffect } from 'react'

const url_update = 'https://psycho.sudox.ru/api/Researcher/EditProject?';

const ProjectNotifications = ({ project, user, loadProject }) => {

    const [isEditable, setIsEditable] = useState(false);
    const [edited, setEdited] = useState(project);

    useEffect(() => {setEdited(project)}, [project])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            "id": edited.id,
            "researcherID": user.id,
            "projectStatusID": Number(1),
            "title": edited.title,
            "instructionText": edited.instructionText,
            "dateStart": edited.dateStart,
            "dateEnd": edited.dateEnd,
            "notificationCountPerDay": Number(edited.notificationCountPerDay),
            "notificationTimeout": Number(edited.notificationTimeout),
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
                "projectStatusID": Number(1),
                "title": edited.title,
                "instructionText": edited.instructionText,
                "dateStart": edited.dateStart,
                "dateEnd": edited.dateEnd,
                "notificationCountPerDay": Number(edited.notificationCountPerDay),
                "notificationTimeout": Number(edited.notificationTimeout),
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
                            <label htmlFor='notificationCountPerDay'>Notifications per day: </label>
                            <input
                                type='number'
                                id='notificationCountPerDay'
                                name='notificationCountPerDay'
                                min='0' max='30'
                                value={edited.notificationCountPerDay}
                                onChange={(e) => setEdited({ ...edited, notificationCountPerDay: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='notificationTimeout'>Notification timeout: </label>
                            <input
                                type='number'
                                id='notificationTimeout'
                                name='notificationTimeout'
                                min='0' max='130'
                                value={edited.notificationTimeout}
                                onChange={(e) => setEdited({ ...edited, notificationTimeout: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='isNotificationsEnabled'>Notification Enabled: </label>
                            <input
                                type='checkbox'
                                id='isNotificationsEnabled'
                                name='isNotificationsEnabled'
                                value={edited.isNotificationsEnabled}
                                onChange={(e) => setEdited({ ...edited, isNotificationsEnabled: e.target.checked })}
                            />
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
                <div className='project-desc'>Notifications per day: {project.notificationCountPerDay}</div>
                <div className='project-desc'>Notification timeout: {project.notificationTimeout}</div>
                <div className='project-desc'>Notification: {project.isNotificationsEnabled ? ('Enabled') : ('Disabled')}</div>


                <button className='btn' onClick={() => setIsEditable(true)}>Edit</button>
            </div>
        </article>
    );
}

export default ProjectNotifications