const { isConnected } = require('../../connection/DBConnection');
const { paymentTable } = require('../../connection/Schema');
const { isNull } = require('../../../util/Util');

const getPaymentAll = async(offset) =>{
     try{
        if(isConnected()){
            const result = await paymentTable.find({ }).lean().skip(offset).limit(20);
            if(!isNull(result))return result;
        }
     }catch(err){}
     return null;
}

const getPaymentByStatus = async(offset, status) =>{
    try{
       if(isConnected()){
           const result = await paymentTable.find({ status: status }).lean().skip(offset).limit(20);
           if(!isNull(result))return result;
       }
    }catch(err){}
    return null;
}

const updatePaymentStatus = async(emailOrPhone, status) =>{
    try{
       if(isConnected()){
           const updated = await paymentTable.updateOne({ email_or_phone: emailOrPhone },{ status: status });
           if(updated.acknowledged && updated.modifiedCount > 0)return true;
       }
    }catch(err){}
    return false;
}

module.exports = {
    getPaymentAll,
    getPaymentByStatus,
    updatePaymentStatus
}