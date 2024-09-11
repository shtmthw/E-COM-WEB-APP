import mong from 'mongoose'

const user_schema = new mong.Schema({
    name: {
        type: String
    },
    profile_img: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    cartObj: {
        type: Object,
        default: {}
    }
}, { minimize: false });

const user_module = mong.model.user || new mong.model('user' , user_schema)

export default user_module