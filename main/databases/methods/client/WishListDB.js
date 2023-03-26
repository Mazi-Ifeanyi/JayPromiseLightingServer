const { isConnected } = require('../../connection/DBConnection');
const { wishlistTable } = require('../../connection/Schema');
const { isNull } = require('../../../util/Util');


const addToWishList = async(emailOrPhone, productId) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const created = await wishlistTable.create({ email_or_phone: emailOrPhone, product_id: productId, createdAt: curDate, updatedAt: curDate });
            if(!isNull(created))return true;
        }
    }catch(err){}
    return false;
}

const getWishList = async(emailOrPhone, offset, limit) =>{
    try{
        if(isConnected()){
            const deleted = await wishlistTable.find({ email_or_phone: emailOrPhone}).skip(offset).limit(limit);
            if(deleted.acknowledged && deleted.deletedCount > 0)return true
        }
    }catch(err){}
    return false;
}


const removeFromWishList = async(emailOrPhone, productId) =>{
    try{
        if(isConnected()){
            const deleted = await wishlistTable.deleteOne({ email_or_phone: emailOrPhone, product_id: productId});
            if(deleted.acknowledged && deleted.deletedCount > 0)return true
        }
    }catch(err){}
    return false;
}

module.exports ={
    addToWishList,
    getWishList,
    removeFromWishList
}