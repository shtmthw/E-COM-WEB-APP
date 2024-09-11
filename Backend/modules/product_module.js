import mong from 'mongoose'

const product_schema = new mong.Schema({
    name: {
        type : String
    },
    category: {
        type : String
    },
    price: {
        type : Number
    },
    image: {
        type : String
    },
    desc: {
        type : String
    }
})

const product_model = mong.model.product || mong.model( 'product' , product_schema)

export default product_model