const { isConnected } = require('../../connection/DBConnection');
const { supportTable } = require('../../connection/Schema');
const { isNull } = require('../../../util/Util');


const replyCustomer = async(emailOrPhone, msg) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const updated = await supportTable.updateOne({ email_or_phone: emailOrPhone },{ admin_reply: msg, reply_time: curDate, updatedAt:curDate });
            if(updated.acknowledged && updated.modifiedCount > 0)return true;
        }
    }catch(err){}
    return false;
}

const updateReadByAdmin = async(emailOrPhone) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const updated = await supportTable.updateOne({ email_or_phone: emailOrPhone },{ read_by_admin: true, view_time: curDate, updatedAt: curDate });
            if(updated.acknowledged && updated.modifiedCount > 0)return true;
        }
    }catch(err){}
    return false;
}

module.exports = {
    replyCustomer,
    updateReadByAdmin
}