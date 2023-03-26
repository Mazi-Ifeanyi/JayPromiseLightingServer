const { isConnected } = require('../../connection/DBConnection');
const { cartTable } = require('../../connection/Schema');
const { isNull } = require('../../../util/Util');


const addToCart = async(emailOrPhone, productId, quantity, amount) =>{
    try{
        if(isConnected()){
            const prodInfo = {
                product_id: productId,
                quantity: quantity,
                amount: amount
            }
            const updated = await cartTable.updateOne({ email_or_phone: emailOrPhone }, { $addToSet: { product_info: prodInfo }, updatedAt: new Date()}, { upsert: true, new: true, setDefaultsOnInsert: true });
            if(updated.acknowledged && (updated.modifiedCount > 0 || updated.upsertedCount > 0))return true;
        }
    }catch(err){}
    return false;
}

const removeFromCartSingle = async(emailOrPhone, productId) =>{
    try{
        if(isConnected()){
            const deleted = await cartTable.deleteOne({ email_or_phone: emailOrPhone, 'product_info.product_id': productId });
            if(deleted.acknowledged && deleted.deletedCount > 0)return true;
        }
    }catch(err){}
    return false;
}

const clearCart = async(emailOrPhone) =>{
    try{
        if(isConnected()){
            const deleted = await cartTable.deleteMany({ email_or_phone: emailOrPhone });
            if(deleted.acknowledged && deleted.deletedCount > 0)return true;
        }
    }catch(err){}
    return false;
}


const getCartAll = async(emailOrPhone) =>{
    try{
        if(isConnected()){
            const result = await cartTable.find({ email_or_phone: emailOrPhone });
            if(!isNull(result))return result;
        }
    }catch(err){}
    return null;
}


module.exports = {
    addToCart,
    removeFromCartSingle,
    clearCart,
    getCartAll
}