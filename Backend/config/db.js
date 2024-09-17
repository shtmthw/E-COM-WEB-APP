import mong from 'mongoose'

export const DB = async() =>{
    mong.connect('mongodb+srv://Matthew:baroi@main.0fbro.mongodb.net/?retryWrites=true&w=majority&appName=MAIN').then(()=>{console.log('DB Connected!!')}).catch((e)=>{
        console.log(`Error in DB ${e}`)
    })
}