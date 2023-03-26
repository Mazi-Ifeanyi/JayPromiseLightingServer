const { isNull } = require('../../../util/Util');
const { isConnected } = require('../../connection/DBConnection');
const { orderTable } = require('../../connection/Schema');


const getOrdersAll = async(status, offset) =>{
    try{
        if(isConnected()){
            const result = await orderTable.find({ status: status }).lean().skip(offset).limit(20);
            if(!isNull(result))return result;
        }
    }catch(err){

    }
    return null;
}

const updateOrderStatus = async(orderId, newStatus) =>{
    try{
        if(isConnected()){
            const updated = await orderTable.updateOne({ order_id: orderId }, { status: newStatus, updatedAt: new Date() });
        if(updated.acknowledged && updated.modifiedCount > 0)return true;
        }
    }catch(err){

    }
    return false;
}

module.exports = {
    getOrdersAll,
    updateOrderStatus
}