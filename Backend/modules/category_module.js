import mong from 'mongoose'

const categories_schema = new mong.Schema({
  
    name : {
        type : String
    },
    weight : {
        type : String // the size of a certain category , e.g. phone is small, fridge is large
    }

});


const categories_module = mong.models.categories || new mong.model('categories' , categories_schema)

export default categories_module