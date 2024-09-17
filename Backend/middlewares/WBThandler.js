import WBT from 'jsonwebtoken'
export const WTC_DECR = async(req , res) => {
 
    try{
        const web_token = req.header

        if(!web_token){
            res.json({success : false , message : 'No Token Recived By The Backend'})
        }
        else{
            const decrypted_token = WBT.verify(web_token , process.env.JWT_SECRET)
            // stuff underneath depends on what you want to do w the decrypted token!!
            req.body.userID = decrypted_token._id
            
            res.json({success : true , message : decrypted_token})
            
        }
    
    }catch(e){
        res.json({success : false , message : e})
    }
}
