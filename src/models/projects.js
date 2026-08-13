import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o
            ON o.organization_id = sp.organization_id
        ORDER BY sp.date ASC;
        `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
    SELECT project_id, organization_id, title, description, location, date
    FROM public.service_project
    WHERE organization_id = $1
    ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
    SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
    FROM public.service_project sp
    JOIN public.organization o
        ON o.organization_id = sp.organization_id
    WHERE sp.date >= CURRENT_DATE
    ORDER BY sp.date ASC
    LIMIT $1;
    `;

    const queryParams = [numberOfProjects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (serviceProjectId) => {
    const query = `
    SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
    FROM public.service_project sp
    JOIN public.organization o
        ON o.organization_id = sp.organization_id
    WHERE sp.project_id = $1;
    `;

    const queryParams = [serviceProjectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO public.service_project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create service project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new service project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const updateProject = async (id, title, description, location, date, organizationId) => {
    const query = `
    UPDATE public.service_project
    SET title = $2, description = $3, location = $4, date = $5, organization_id = $6
    WHERE project_id = $1
    RETURNING project_id;
    `;

    const queryParams = [id, title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Service Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated service project with ID:', id);
    }

    return result.rows[0].project_id;
};

const projectAddVolunteer = async (projectId, userId) => {
    const query = `
    INSERT INTO public.project_has_volunteer (project_id, user_id)
    VALUES ($1, $2)
    ON CONFLICT (project_id, user_id) DO NOTHING;
    `;

    const queryParams = [projectId, userId];
    await db.query(query, queryParams);
};

const projectRemoveVolunteer = async (projectId, userId) => {
    const query = `
    DELETE FROM public.project_has_volunteer
    WHERE project_id = $1 AND user_id = $2;
    `;

    const queryParams = [projectId, userId];
    await db.query(query, queryParams);
};

const getUserVolunteerProjects = async (userId) => {
    const query = `
    SELECT sp.project_id, sp.title
    FROM public.project_has_volunteer phv
    JOIN public.service_project sp
        ON sp.project_id = phv.project_id
    WHERE phv.user_id = $1
    ORDER BY sp.date ASC;
    `;

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const isVolunteerOfProject = async (userId, projectId) => {
    const query = `
    SELECT project_id
    FROM public.project_has_volunteer
    WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject, projectAddVolunteer, projectRemoveVolunteer, getUserVolunteerProjects, isVolunteerOfProject }