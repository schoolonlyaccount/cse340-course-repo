import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.service_project_category;
        `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
    SELECT category_id, name
    FROM public.service_project_category
    WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
    SELECT c.category_id, c.name
    FROM public.service_project_category c
    JOIN public.service_project_has_category spc
        ON spc.category_id = c.category_id
    WHERE spc.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date
    FROM public.service_project sp
    JOIN public.service_project_has_category spc
        ON spc.project_id = sp.project_id
    WHERE spc.category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId }