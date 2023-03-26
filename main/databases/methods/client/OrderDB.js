const { isConnected } = require('../../connection/DBConnection');
const { orderTable } = require('../../connection/Schema');
const { isNull, generateId } = require('../../../util/Util');



const placeOrder = async(emailOrPhone, deliveryType, deliveryInfo) =>{
    const orderId = generateId(8);
    const curDate = new Date();
    let totalProduct = 0, totalAmount = 0, productInfo = [], receiverName='',receiverPhone='',receiverAddress='',state='',city='';
    let created = null;
    try{
        if(isConnected()){
            if(deliveryType === 'no'){
                totalProduct = deliveryInfo.total_products;
                totalAmount = deliveryInfo.total_amount;
                productInfo = deliveryInfo.product_info; //this will contain product id, amount and quantity just like addToCart

                created = await orderTable.create({ email_or_phone: emailOrPhone, total_products: totalProduct, total_amount: totalAmount, product_info: productInfo, delivery_option: 'no', order_id: orderId, createdAt: curDate, updatedAt: curDate });
            }
            if(deliveryType === 'yes'){
                receiverName = deliveryInfo.receiver_name;
                receiverPhone = deliveryInfo.receiver_phone;
                receiverAddress = deliveryInfo.receiver_address;
                state = deliveryInfo.state;
                city = deliveryInfo.city;
                totalProduct = deliveryInfo.total_products;
                totalAmount = deliveryInfo.total_amount;
                productInfo = deliveryInfo.product_info; //this will contain product id, amount and quantity just like addToCart

                created = await orderTable.create({ email_or_phone: emailOrPhone, total_products: totalProduct, total_amount: totalAmount, product_info: productInfo, delivery_option: 'yes', receiver_name: receiverName, receiver_phone: receiverPhone, receiver_address: receiverAddress, state: state,city: city, order_id: orderId, createdAt: curDate, updatedAt: curDate });
            }

            if(!isNull(created))return true;
        }
    }catch(err){}
    return false;
}

const getOrdersAll = async(emailOrPhone, status, offset, limit) =>{
    try{
        if(isConnected()){
            const result = await orderTable.find({ email_or_phone: emailOrPhone, status: status }).lean().skip(offset).limit(limit);
            if(!isNull(result))return result;
        }
    }catch(err){}
    return null;
}

const getOrderSingle = async(orderId) =>{
    try{
        if(isConnected()){
            const result = await orderTable.findOne({ order_id: orderId }).lean();
            if(!isNull(result))return result;
        }
    }catch(err){}
    return null;
}

const deleteOrder = async(emailOrPhone, orderId) =>{
    try{
        if(isConnected()){
            const deleted = await orderTable.deleteOne({ email_or_phone: emailOrPhone, order_id: orderId, status: 'pending'});
            if(deleted.acknowledged && deleted.deletedCount > 0)return true;
        }
    }catch(err){}
    return false;
}


module.exports = {
    placeOrder,
    getOrdersAll,
    getOrderSingle,
    deleteOrder
}