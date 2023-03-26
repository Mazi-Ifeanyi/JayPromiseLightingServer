const { isConnected } = require('../../connection/DBConnection');
const { notificationTable } = require('../../connection/Schema');
const { isNull } = require('../../../util/Util');


const addNotification = async(emailOrPhone, title, content) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const created = await notificationTable.create({ email_or_phone: emailOrPhone, title: title, content: content, read: false, time: curDate, createdAt: curDate, updatedAt: curDate});
            if(!isNull(created))return true;
        }
    }catch(err){}
    return false;
}


const getNotifications = async(emailOrPhone, offset, limit) =>{
    try{
        if(isConnected()){
            const result = await notificationTable.find({ email_or_phone: emailOrPhone }).select('-createdAt -updatedAt').skip(offset).limit(limit);
            if(!isNull(result))return result;
        }
    }catch(err){}
    return null
}
module.exports = {
    addNotification,
    getNotifications
}