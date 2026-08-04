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

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }