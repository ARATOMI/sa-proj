import React from 'react'

import Partisipant from './Partisipant';


const url_add = 'https://psycho.sudox.ru/api/Researcher/AddParticipant?';


const ProjectPartisipants = ({ project, user, loadProject }) => {


    const addPartisipant = () => {

        console.log(JSON.stringify({
            "id": Date.now() % 100000,
            "projectID": project.id,
            "participantStatus": "Inactive",
            "timeNotificationStart": "10:00:00",
            "timeNotificationEnd": "22:00:00",
            "notificationCountPerDay": 5,
            "notificationMinValueVariation": 15
        }));

        fetch(url_add + new URLSearchParams({
            token: user.token
        }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": Date.now() % 100000,
                "projectID": project.id,
                "participantStatus": "Inactive",
                "timeNotificationStart": "10:00:00",
                "timeNotificationEnd": "22:00:00",
                "notificationCountPerDay": 5,
                "notificationMinValueVariation": 15
            })
        }).then(res => {
            console.log(res);
            if (res.ok) {
                console.log('ADDED');
                loadProject();
            } else {
                console.log('NOT_ADDED');
            }
        }).catch(e => {
            console.log('ERROR');
            console.log(e);
        });
    };

    return (
        <article key={project.id} className='project-info'>
            <div className='item'>
                <h3 className='project-title'>ProjectPartisipants:</h3>
                {project.participantInfoList.map((partic) => {
                    return (
                        <Partisipant partisipant={partic} project={project} user={user} loadProject={loadProject} />
                    );
                })}

                <button
                    className='btn'
                    style={{ marginLeft: '2rem' }}
                    onClick={addPartisipant}
                >Add</button>
            </div>

        </article>
    )
}

export default ProjectPartisipants