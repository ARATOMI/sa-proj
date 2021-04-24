import React, { useState, useEffect } from 'react'

import AffectGrid from './QuestionTypes/AffectGrid';
import Choose from './QuestionTypes/Choose';
import DiscreteSlider from './QuestionTypes/DiscreteSlider';
import Slider from './QuestionTypes/Slider';

const url_delete = 'https://psycho.sudox.ru/api/Researcher/DeleteQuestion?';


const Question = ({ question, project, user, loadProject }) => {


    const deleteQuestion = (id) => {

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

    return <DiscreteSlider question={question} project={project} user={user} loadProject={loadProject} deleteQuestion={deleteQuestion} />;

    switch (question.questionType) {
        case "AffectGrid":
            return <AffectGrid question={question} project={project} user={user} loadProject={loadProject} deleteQuestion={deleteQuestion} />;
        case "Choose":
            return <Choose question={question} project={project} user={user} loadProject={loadProject} deleteQuestion={deleteQuestion} />;
        case "DiscreteSlider":
            return <DiscreteSlider question={question} project={project} user={user} loadProject={loadProject} deleteQuestion={deleteQuestion} />;
        case "Slider":
            return <Slider question={question} project={project} user={user} loadProject={loadProject} deleteQuestion={deleteQuestion} />;
    };
    return (
        <h2>ERROR {question.questionType}</h2>
    );

    return (
        <div key={question.id} className='partisipant'>
            <h4>{question.questionType}</h4>
            <div className='project-desc'>id{question.id}</div>


            {/* <button className='btn' onClick={() => setIsEditable(true)}>Edit</button> */}
            <button
                className='btn project-delete-btn'
                onClick={() => deleteQuestion(question.id)}
            >Delete</button>
        </div>
    );
}

export default Question