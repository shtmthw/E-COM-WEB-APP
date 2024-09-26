import order_module from "../modules/order_model.js";
import user_module from "../modules/user_model.js";
import { Stripe } from 'stripe'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ServerSide_email,
        pass: process.env.ServerSide_email_App_Pass,
    },
});

const stripe = new Stripe(process.env.STRIPE_SEC_KEY);


export const order_placement = async (req, res) => {
    try {

        const { items, amount, address, quantity, userID } = req.body

        if (!items || !amount || !address || !quantity || !userID) {
            return res.json({ success: false, message: 'Every Order Data Is Not Sent!!' })
        }

        if (!Array.isArray(items)) {
            return res.json({ success: false, message: 'Items Is Not An Array!!' })
        }

        const new_order = await new order_module({
            userID: userID,
            items: items,
            amount: amount,
            address: address
        })

        await new_order.save()
        await user_module.findByIdAndUpdate(userID, { cartObj: {} });

        const line_item = items.map((item) => ({
            price_data: {
                currency: 'BDT',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        }));

        line_item.push({
            price_data: {
                currency: 'BDT',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 180,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${new_order._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${new_order._id}`,
        });
        res.json({ success: true, session_url: session.url });


    } catch (e) {
        return res.json({ success: false, message: e })

    }

}


// use in admin panel
export const order_confirmation = async (req, res) => {
    try {
        const { orderID } = req.body;
        if (!orderID) {
            return res.json({ success: false, message: "No Order ID Received!" });
        }
        
        const order = await order_module.findById(orderID);
        if (order) {
            order.status = 'Order Has Been Confirmed!';
            order.order_confirmation = true;
            await order.save();
            return res.json({ success: true, message: 'Order Confirmed' });
        } else {
            return res.json({ success: false, message: 'Order Wasnt Found In Database!' });
        }
    } catch (e) {
        return res.json({ success: false, message: 'Error confirming order: ' + e.message });
    }
};


// Send Order to Logistics panel
export const filter_confirmed_orders = async (req, res) => {
    try {
        const confirmed_orders = await order_module.find({ order_confirmation: true });

        // Check if any confirmed orders were found
        if (confirmed_orders.length === 0) {
            return res.json({ success: false, message: 'No orders have been Confirmed.' });
        }

        // Respond with the confirmed orders
        return res.json({ success: true, message: 'Orders fetched!', orders: confirmed_orders });
    } catch (e) {
        // Handle any errors that occur during the database operation
        return res.json({ success: false, message: 'Error fetching orders.', error: e.message });
    }
};

// Send all orders to admin panel
export const send_orders = async (req, res) => {
    try {
        const orders = await order_module.find({});

        // Check if any orders were found
        if (orders.length === 0) {
            return res.json({ success: false, message: 'No orders have been placed.' });
        }

        // Respond with the fetched orders
        return res.json({ success: true, message: 'Orders fetched!', orders });
    } catch (e) {
        // Handle any errors that occur during the database operation
        return res.json({ success: false, message: 'Error fetching orders.', error: e.message });
    }
};

// use in user frontend
export const fetch_singleUser_order = async (req, res) => {
    try {
      const orders_by_user = await order_module.find({ userID: req.body.userID });
      if(orders_by_user.length === 0){
        res.status(200).json({ success: false, message: 'No Orders Placed!' });

      }
      res.status(200).json({ success: true, message : 'Orders Fetched!',orders: orders_by_user });
    } catch (e) {
      console.error('Error fetching orders:', e);
      res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
  };


// Use in logistics panel to handle order status
export const handle_order_status = async (req, res) => {
    const { newStatus, orderID } = req.body;

    // Check if orderID is provided
    if (!orderID) {
        return res.json({ success: false, message: 'No Order ID provided.' });
    }

    // Fetch the order
    const order = await order_module.findById(orderID);

    // Check if the order was found
    if (!order) {
        return res.json({ success: false, message: 'Order not found with the provided ID.' });
    }

    // Update the order status
    order.status = newStatus;
    await order.save();
    
    return res.json({ success: true, message: 'Order status updated!' });
}