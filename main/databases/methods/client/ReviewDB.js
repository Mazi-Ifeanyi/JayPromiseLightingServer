const { isNull } = require('../../../util/Util');
const { isConnected } = require('../../connection/DBConnection');
const { reviewTable } = require('../../connection/Schema');


const addReview = async(emailOrPhone, name, images, productId, reply) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const created = await reviewTable.create({ email_or_phone: emailOrPhone, name: name, image: images, product_id: productId, reply: reply, first_reply_time: curDate, createdAt: curDate, updatedAt: curDate });
            if(!isNull(created))return true;
        }
    }catch(err){
        console.log(err)
    }
    return false;
}


const editReview = async(emailOrPhone, images, productId, reply) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const updated = await reviewTable.updateOne({ email_or_phone: emailOrPhone, product_id: productId }, { image: images, reply: reply, updatedAt: curDate }, { upsert: false });
            if(updated.acknowledged && updated.modifiedCount > 0 && updated.upsertedCount > 0)return true;
        }
    }catch(err){}
    return false;
}

const deleteReview = async(emailOrPhone, productId) =>{
    try{
        if(isConnected()){
            const deleted = await reviewTable.deleteOne({ email_or_phone: emailOrPhone, product_id: productId });
            if(deleted.acknowledged && deleted.deletedCount > 0)return true;
        }
    }catch(err){}
    return false;
}


module.exports = {
    addReview,
    editReview,
    deleteReview
}
