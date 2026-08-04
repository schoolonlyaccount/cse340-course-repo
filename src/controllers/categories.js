import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories);
    const title = 'Service Project Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const serviceProjects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails, serviceProjects });
};

export { showCategoriesPage, showCategoryDetailsPage }