import categories_module from "../modules/category_module.js";
import product_model from "../modules/product_module.js";

export const get_categories = async (req, res) => {

    try {
        const categories = await categories_module.find({})

        if (categories.length === 0) {
            return res.json({ success: false, message: 'Categories Not Fetched!' })
        }

        res.json({ success: true, message: 'Successfully Fetched Categories!', categories: categories })

    } catch (e) {
        return res.json({ success: false, message: e })
    }


}

export const add_new_categories = async (req, res) => {
    try {
        const { name, weight } = req.body
        if (!name || !weight) {
            return res.json({ success: false, message: 'Category Data Not Recieved!' })
        }
        const checkdata = await categories_module.findOne({ name: name })
        if (checkdata) {
            return res.json({ success: false, message: 'Category Already Exists!' })
        }
        const new_category = await new categories_module({
            name: name,
            weight: weight
        })
        await new_category.save()
        res.json({ success: true, message: 'Category Added!' })
    } catch (e) {
        return res.json({ success: false, message: e })
    }
}

export const remove_category = async (req, res) => {
    try {
        const { categoryID } = req.body
        if (!categoryID) {
            return res.json({ success: false, message: 'Category ID not recieved.' })
        }

        const deletion = await categories_module.findByIdAndDelete(categoryID)

        if (!deletion) {
            return res.json({ success: false, message: 'Category not found.' });
        }
        return res.json({ success: true, message: 'Successfully Delted Category.' })

    } catch (e) {
        return res.json({ success: false, message: e })
    }
}

export const lazy_category_loading = async (req, res) => {
    const { page = 1, limit = 4, category = 'N/A' } = req.query; // Default to page 1 and limit of 4
    if (!page || !limit) {
        return res.status(500).json({ success: false, message: 'page number or limit number not recived!' });
    }
    const skip = (page - 1) * limit;

    try {
        const items = await product_model.find({ category }).skip(skip).limit(Number(limit));
        const totalProducts = await product_model.countDocuments(); // Total number of products
        res.json({
            success: true,
            items,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}

export const lazy_categorySelection_loading = async (req , res) => {
    try {

        const { itemSkip = 4, page = 1 } = req.query
        if (!itemSkip || !page) {
            return res.status(500).json({ success: false, message: 'page number or limit number not recived!' });
        }
        const skip = (page - 1) * itemSkip;


        const categoires = await categories_module.find({}).skip(skip).limit(itemSkip)
        if (!categoires) {
            return res.status(500).json({ success: false, message: 'Failed Fethcing Category List!' });
        }

        const totalItems = await categories_module.countDocuments()
        if (totalItems < 0) {
            return res.status(500).json({ success: false, message: 'No Items In The DataBase' });
        }

        res.json({
            success: true,
            message: 'Fethched Total Category List Successfully',
            totalItems: totalItems,
            items: categoires
        })
    } catch (e) {
        res.status(500).json({ success: false, message: 'Internal Server Error', e });

    }

}