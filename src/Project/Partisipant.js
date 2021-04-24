import React, { useState, useEffect } from 'react'

const url_update = 'https://psycho.sudox.ru/api/Researcher/EditParticipant?';
const url_delete = 'https://psycho.sudox.ru/api/Researcher/DeleteParticipant?';

const Partisipant = ({ partisipant, project, user, loadProject }) => {

    const [isEditable, setIsEditable] = useState(false);
    const [edited, setEdited] = useState(partisipant);

    useEffect(() => { setEdited(partisipant) }, [partisipant])


    const deletePartisipant = (id) => {

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
            loadProject();
        }).catch(e => {
            console.log('ERROR');
            console.log(e);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            "id": edited.id,
            "projectID": project.id,
            "participantStatus": edited.participantStatus,
            "timeNotificationStart": edited.timeNotificationStart,
            "timeNotificationEnd": edited.timeNotificationEnd,
            "notificationCountPerDay": Number(edited.notificationCountPerDay),
            "notificationMinValueVariation": Number(edited.notificationMinValueVariation)
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
                "projectID": project.id,
                "participantStatus": edited.participantStatus,
                "timeNotificationStart": edited.timeNotificationStart,
                "timeNotificationEnd": edited.timeNotificationEnd,
                "notificationCountPerDay": Number(edited.notificationCountPerDay),
                "notificationMinValueVariation": Number(edited.notificationMinValueVariation)
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
    console.log('PartisipantDetails: ', edited);


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
                            <label htmlFor='notificationMinValueVariation'>Notification  min value variation: </label>
                            <input
                                type='number'
                                id='notificationMinValueVariation'
                                name='notificationMinValueVariation'
                                min='0' max='130'
                                value={edited.notificationMinValueVariation}
                                onChange={(e) => setEdited({ ...edited, notificationMinValueVariation: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='timeNotificationStart'>Notification start time: </label>
                            <input
                                type='time'
                                id='timeNotificationStart'
                                name='timeNotificationStart'
                                value={edited.timeNotificationStart}
                                onChange={(e) => setEdited({ ...edited, timeNotificationStart: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='timeNotificationEnd'>Notification end time: </label>
                            <input
                                type='time'
                                id='timeNotificationEnd'
                                name='timeNotificationEnd'
                                value={edited.timeNotificationEnd}
                                onChange={(e) => setEdited({ ...edited, timeNotificationEnd: e.target.value })}
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
        <div key={partisipant.id} className='partisipant'>
            <h4>id{partisipant.id}</h4>
            <div className='project-desc'>Status: {partisipant.participantStatus}</div>
            <div className='project-desc'>Notification start time: {partisipant.timeNotificationStart}</div>
            <div className='project-desc'>Notification end time: {partisipant.timeNotificationEnd}</div>
            <div className='project-desc'>Notification per day: {partisipant.notificationCountPerDay}</div>
            <div className='project-desc'>Notification min value variation: {partisipant.notificationMinValueVariation}</div>


            <button className='btn' onClick={() => setIsEditable(true)}>Edit</button>
            <button
                className='btn project-delete-btn'
                onClick={() => deletePartisipant(partisipant.id)}
            >Delete</button>
        </div>
    );
}

export default Partisipant