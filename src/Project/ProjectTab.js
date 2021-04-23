import React from 'react'

import ProjectDetails from './ProjectDetails';
import ProjectPartisipants from './ProjectPartisipants';
import ProjectQuestions from './ProjectQuestions';
import ProjectNotifications from './ProjectNotifications';

const ProjectTab = ({ project, user,  currentTab }) => {

    console.log('ProjectTab: ', project);
    switch (currentTab) {
        case "PROJECT":
            return <ProjectDetails project={project} user={user} />;
        case "PARTISIPANTS":
            return <ProjectPartisipants project={project} user={user} />;
        case "QUESTIONS":
            return <ProjectQuestions project={project} user={user} />;
        case "NOTIFICATIONS":
            return <ProjectNotifications project={project} user={user} />;                
      }
    return (
            <h2>ERROR {currentTab}</h2>
    )
}

export default ProjectTab