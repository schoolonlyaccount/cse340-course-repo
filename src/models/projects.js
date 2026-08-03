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

export { getAllProjects, getProjectsByOrganizationId }