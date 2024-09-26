import user_module from "../modules/user_model.js";
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import validator from 'validator';
import path from 'path';
import product_model from "../modules/product_module.js";

export const add_itemm = async(req , res)=>{
    const {name, price , desc , category} = req.body
    const image_name = req.file ? req.file.filename : null;
    if(!name || !price || !desc || !category){
        return res.json({success : false , message: 'Item Info Not Recived!'})
    }
    if(!image_name){
        return res.json({success : false , message: 'Item Image Not Recived!'})
    }
    const new_item = await new product_model({
        name : name,
        category : category,
        price : price,
        image : image_name,
        desc: desc,
    })
    await new_item.save()
    return res.json({success : true , message: 'Item Added!'})
}

export const fetch_items = async(req , res)=>{
    try{
        const resp = await product_model.find({})
        return res.json({success : true , message: 'Successfully Fetched Every Items!' , items : resp})

    }catch(e){
        res.json({success : false , message : 'Error Fetching Every Items!!'})
    }
}

export const del_item = async(req , res) => {
    try{
        const { itemID }= req.body
        const resp = await product_model.findById(itemID)
        if(!itemID){
            return res.json({success : false , message: 'No Item Id Recieved!'})
        }
        if(resp){
            await product_model.findByIdAndDelete(itemID)
            return res.json({success : true , message: 'Successfully Removed Item!'})
        }
        else{
            return res.json({success : false , message: 'Item not found!'})
        }

    }catch(e){
        return res.json({success : false , message: e})

    }
}

export const update_item_ordered_amnt = async (req, res) => {
    try {
        const { itemIDs } = req.body; // Array of objects: [{itemID: 1020412}, {itemID: 2013124}]

        // Check if itemIDs is an array and has at least one object
        if (!Array.isArray(itemIDs) || itemIDs.length === 0) {
            return res.status(400).json({ success: false, message: 'No Item IDs received!' });
        }

        // Iterate over each item in the array and update its total_bought field
        const updatePromises = itemIDs.map(async (obj) => {
            const itemID = obj.itemID; // Extract itemID from the object

            // Find the item by ID
            const item = await product_model.findOne({ itemID });

            if (item) {
                item.total_bought += 1; // Increment the total_bought field
                await item.save(); // Save the updated item
                return { success: true, message: `Successfully updated item with ID: ${itemID}` };
            } else {
                return { success: false, message: `Item not found with ID: ${itemID}` };
            }
        });

        // Wait for all the updates to complete
        const results = await Promise.all(updatePromises);

        // Return the aggregated results
        return res.status(200).json({
            success: true,
            message: 'Processed all items',
            results, // Results of each item's update
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error updating items', error });
    }
};
