import axios from "axios"
import { useEffect, useState } from "react"

function DSA() {

    const [data, setData] = useState([])
    const fetch_data = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/photos')
        setData(resp.data)
    }

    useEffect(() => {
        fetch_data()
    }, [])

    // Extract unique albumIds using Set
    const uniqueAlbumIds = [...new Set(data.map(item => item.albumId))]

    return (
        <>
            <div>
                <h1>Dsa Q-1 page</h1>
                {uniqueAlbumIds.map((albumId) => (
                    <h2 key={albumId}>{albumId}</h2>
                ))}
            </div>
        </>
    )
}


const org = { 
    name: 'matthew' , 
    age : 22 , 
    talents : {
        T1 : 'Golf',
        T2 : "Sex"
    }
}
const ref = { 
    name: 'Tasnim' , 
    age : 12 , 
    talents : {
        T1 : 'Golf',
        T2 : org.talents.T2
    }
}

ref.T1 = 'Hockey'
org.talents.T2 = 'Cokey'

console.log(ref)
console.log(org)


const string = 'hello harash bhai'
 

let str_arr = []
for(i = string.length - 1 ; i >= 0; i--){
    str_arr.push(string.charAt(i))
}

console.log(str_arr)

export default DSA


let x = 10

function foo(){
    console.log(x)
    let x = 20
}
foo()

function outer(){
    function inner(){
        console.log(x)
    }
    const x = 10
    return inner
}

const inner = outer()
inner()

function iter_addtion(iter){
    for(let i = 0 ; i <= iter ; i++){
        setTimeout(()=>{
            console.log(i)
        }, 1000)
    } 
}

var iter = 3
if(iter > 3){
    iter = 3
    iter_addtion(iter)
}else{
    iter_addtion(iter)
}


// using promises to fetch data

async function fetch_data(userID) {
    return new Promise((resolve, reject) => {
        if (!userID) {
            reject('No userID recived')
        }
        else if (userID) {
            setTimeout(async () => {
                const resp = await axios.post('api')
                if (resp.data.success) {
                    resolve(resp.data.objDATA)
                } else {
                    reject('Failed Fetching Data')
                }
            }, 0)
        }
    })
}
fetch_data('sexxman').then((data) => {
    setCart(data)
}).catch((error) => {
    console.log(error)
})


const user_ids = [1, 2, 3]


const resolve_promise = async(userID)=> {
    return new Promise(async(resolve , reject) => {
        try{
            if(userID > 3){
                reject("User Id not Available")
            }
            else{
                const resp =await axios.post('-apiCall-')      
                if(resp.data.success){
                    resolve(resp.data.info)
                }else{
                    reject('Failed Fetching Info!')
                }
            }
        }catch(e){
            reject('Eorror Occured : ' , e)
        }
    })
}


for (let i = 0 ; i <= user_ids.length - 1 ; i++){
    setTimeout(()=>{
        resolve_promise(user_ids[i]).then((data)=>{
            setData(prev=>({...prev, data})) //is array of obj
        }).catch((error)=>{
            console.log(error)
        })
    } , i * 1000)
}

// better solution for the upper code

const get_user_id= async(id)=>{
    if(!id){
        console.log(id , 'Not found')
    }
    const resp =await axios.post('api')
    if(resp.data.success){
        const info = await resp.data.info// obj
        setData(prev => ({...prev, info}))//arr of obj
    }else{
        console.log('Failed Fetching user info of' , id)
    }
}
        

for (let i = 0 ; i <= user_ids.length - 1 ; i++){
    setTimeout(()=>{
        get_user_id(user_ids[i])

    },i*1000)
}

//