import React from 'react'

const ProjectQuestions = ({ project }) => {
    return (
        <article key={project.id} className='project-info'>
            <div className='item'>
                <h3 className='project-title'>ProjectQuestions</h3>                
            </div>
        </article>
    )
}

export default ProjectQuestions