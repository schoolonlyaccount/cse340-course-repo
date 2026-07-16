import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT name
        FROM public.service_project_category;
        `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllCategories }