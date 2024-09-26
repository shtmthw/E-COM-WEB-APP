import mong from 'mongoose'

const order_schema = new mong.Schema({
    userID:{
        type : String,
        required : true
    },
    items:{
        type : Array,
        required : true
    },
    amount:{
        type : Number,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    state : {
        type : String,
        default : 'Item Is Being Processed!'
    },
    date : {
        type : String,
        default : Date.now()
    },
    payment:{
        type : Boolean,
        default : false
    },
    order_conformmation : {
        type : Boolean,
        default : false
    }

});


const order_module = mong.models.order || new mong.model('order' , order_schema)

export default order_module