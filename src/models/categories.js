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

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
    INSERT INTO public.service_project_has_category (category_id, project_id)
    VALUES ($1, $2);
    `;

    const queryParams = [categoryId, projectId];
    await db.query(query, queryParams);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
    DELETE FROM public.service_project_has_category
    WHERE project_id = $1;
    `;

    const queryParams = [projectId];
    await db.query(deleteQuery, queryParams);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

const createCategory = async (name) => {
    const query = `
      INSERT INTO public.service_project_category (name)
      VALUES ($1)
      RETURNING category_id;
    `;

    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

const updateCategory = async (id, name) => {
    const query = `
    UPDATE public.service_project_category
    SET name = $2
    WHERE category_id = $1
    RETURNING category_id;
    `;

    const queryParams = [id, name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', id);
    }

    return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments, createCategory, updateCategory }