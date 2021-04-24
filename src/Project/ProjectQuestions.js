import React from 'react'

import Question from './Question';

const ProjectQuestions = ({ project, user, loadProject }) => {
    return (
        <article key={project.id} className='project-info'>
            <div className='item'>
                <h3 className='project-title'>ProjectQuestions:</h3>

                {project.questions.map((question) => {
                    return (
                        <Question key={question.id} question={question} project={project} user={user} loadProject={loadProject} />
                    );
                })}

                <button
                    className='btn'
                    style={{ marginLeft: '2rem' }}
                    //onClick={addPartisipant}
                >Add</button>
            </div>
        </article>
    )
}

export default ProjectQuestions