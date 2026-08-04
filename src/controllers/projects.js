const NUMBER_OF_UPCOMING_PROJECTS = 5;

import { getCategoriesByProjectId } from '../models/categories.js';
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const serviceProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    //console.log(serviceProjects);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, serviceProjects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Service Project Details';

    res.render('project', { title, projectDetails, categories });
};

export { showProjectsPage, showProjectDetailsPage }