
import user_module from "../modules/user_model.js"

export const add_item_incart = async (req, res) => {

    try {
        const { userID, itemID } = req.body
        if (!userID || !itemID) {
            return res.json({ success: false, message: 'No UserID or itemID Recieved!!' })
        }
        const user = await user_module.findById(userID)
        if (user) {
            const cart_data = await user.cartObj

            if (!cart_data[itemID]) {
                cart_data[itemID] = 1;
            } else {
                cart_data[itemID] += 1;
            }

            await user_module.findByIdAndUpdate(userID, { cartObj: cart_data });
            res.json({ success: true, message: 'Added to the cart!' });
        }
    } catch (e) {
        return res.json({ success: false, message: e })
    }


}

export const remove_cartitem = async (req, res) => {
    try {
        if (!req.body.userID) {
            return res.json({ success: false, message: 'No UserID Recieved!!' })
        }

        const user_data = await user_module.findOne({ _id: req.body.userID })
        const cart_data = await user_data.cartObj

        if (cart_data[req.body.itemID] > 0) {
            cart_data[req.body.itemID] -= 1
        }
        await user_module.findByIdAndUpdate(req.body.userID, { cartObj: cart_data })
        res.json({ success: true, message: 'Removed Cart Item!!' })
    } catch (e) {
        return res.json({ success: false, message: e })
    }
}

export const get_cart = async (req, res) => {
    try {
        const { userID } = req.body
        if (!userID) {
            return res.json({ success: false, message: 'No UserID Recieved!!' })
        }
        const user = await user_module.findById(userID)
        if (user) {
            const cart = await user.cartObj
            return res.json({ success: true, message: 'Cart Successfully Fetched!', cartObj: cart })
        }

    } catch (e) {
        return res.json({ success: false, message: e })
    }

}