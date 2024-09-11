import mong from 'mongoose'

export const DB = async() =>{
    mong.connect('mongodb://127.0.0.1:27017/E-COM-WAPP').then(()=>{console.log('DB Connected!!')}).catch((e)=>{
        console.log(`Error in DB ${e}`)
    })
}