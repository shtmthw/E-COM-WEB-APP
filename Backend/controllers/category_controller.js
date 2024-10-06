import categories_module from "../modules/category_module.js";

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
        const checkdata = await categories_module.findOne({name : name})
        if(checkdata){
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