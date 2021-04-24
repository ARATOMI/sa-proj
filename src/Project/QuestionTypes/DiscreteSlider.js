import React, { useState, useEffect } from 'react'

const url_update = 'https://psycho.sudox.ru/api/Researcher/EditDiscreteSliderQuestion?';

const DiscreteSlider = ({ question, partisipant, project, user, loadProject, deleteQuestion }) => {

    const [isEditable, setIsEditable] = useState(false);
    const scText = question.scaleTexts ? (question.scaleTexts[0]) : ('');
    const [edited, setEdited] = useState({ ...question, scaleText: scText });

    useEffect(() => { setEdited({ ...question, scaleText: scText }) }, [question])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            "id": edited.id,
            "projectID": project.id,
            "questionText": edited.questionText,
            "questionSubtext": edited.questionSubtext,
            "instructionText": edited.instructionText,
            "questionNumber": Number(edited.questionNumber),
            "discreteSliderMinValue": Number(edited.discreteSliderMinValue),
            "discreteSliderMaxValue": Number(edited.discreteSliderMaxValue),
            "scaleText": edited.scaleText
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
                "questionText": edited.questionText,
                "questionSubtext": edited.questionSubtext,
                "instructionText": edited.instructionText,
                "questionNumber": Number(edited.questionNumber),
                "discreteSliderMinValue": Number(edited.discreteSliderMinValue),
                "discreteSliderMaxValue": Number(edited.discreteSliderMaxValue),
                "scaleText": edited.scaleText
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
                            <label htmlFor='questionNumber'>Question number: </label>
                            <input
                                type='number'
                                id='questionNumber'
                                name='questionNumber'
                                min='1' max='1000'
                                value={edited.questionNumber}
                                onChange={(e) => setEdited({ ...edited, questionNumber: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='questionText'>Text: </label>
                            <input
                                type='text'
                                id='questionText'
                                name='questionText'
                                value={edited.questionText}
                                onChange={(e) => setEdited({ ...edited, questionText: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='questionSubtext'>Subtext: </label>
                            <input
                                type='text'
                                id='questionSubtext'
                                name='questionSubtext'
                                value={edited.questionSubtext}
                                onChange={(e) => setEdited({ ...edited, questionSubtext: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='instructionText'>Instruction text: </label>
                            <input
                                type='text'
                                id='instructionText'
                                name='instructionText'
                                value={edited.instructionText}
                                onChange={(e) => setEdited({ ...edited, instructionText: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='scaleText'>Scale text:  </label>
                            <input
                                type='text'
                                id='scaleText'
                                name='scaleText'
                                value={edited.scaleText}
                                onChange={(e) => setEdited({ ...edited, scaleText: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='discreteSliderMinValue'>Min value: </label>
                            <input
                                type='number'
                                id='discreteSliderMinValue'
                                name='discreteSliderMinValue'
                                min='-1000' max='1000'
                                value={edited.discreteSliderMinValue}
                                onChange={(e) => setEdited({ ...edited, discreteSliderMinValue: e.target.value })}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='discreteSliderMaxValue'>Max value: </label>
                            <input
                                type='number'
                                id='discreteSliderMaxValue'
                                name='discreteSliderMaxValue'
                                min='-1000' max='1000'
                                value={edited.discreteSliderMaxValue}
                                onChange={(e) => setEdited({ ...edited, discreteSliderMaxValue: e.target.value })}
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
        <div className='partisipant'>
            <h4>{question.questionType}</h4>
            <div className='project-desc'>Question number: {question.questionNumber}</div>
            <div className='project-desc'>Text: {question.questionText}</div>
            <div className='project-desc'>Subtext: {question.questionSubtext}</div>
            <div className='project-desc'>Instruction text: {question.instructionText}</div>
            <div className='project-desc'>Scale text: {question.scaleTexts ? (question.scaleTexts[0]) : ('')}</div>
            <div className='project-desc'>Min value: {question.discreteSliderMinValue}</div>
            <div className='project-desc'>Max value: {question.discreteSliderMaxValue}</div>


            <button className='btn' onClick={() => setIsEditable(true)}>Edit</button>
            <button
                className='btn project-delete-btn'
                onClick={() => deleteQuestion(question.id)}
            >Delete</button>
        </div>
    );
}

export default DiscreteSlider