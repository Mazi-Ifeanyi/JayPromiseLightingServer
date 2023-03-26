const { isConnected } = require('../../connection/DBConnection');
const { productTable } = require('../../connection/Schema');
const { isNull, generateId } = require('../../../util/Util');


const getProductGroups = async() =>{
    try{
        if(isConnected()){
            const result = await productTable.aggregate([
                { $project: {
                     category_id: 1,
                     product_name: 1,
                     product_id: 1,
                     original_price: 1,
                     discounted_price: 1,
                     discounted_percentage: 1,
                     description: 1,
                     quantity: 1,
                     colors: 1,
                     product_images: 1,
                     views: 1,
                     group: 1,
                }},
                { $group: { _id: '$group', categoryId: { $push: '$category_id'}, prodName: { $push: '$product_name'}, prodId: { $push: '$product_id'}, originalPrice: { $push: '$original_price'}, discountPrice:{ $push: '$discounted_price'}, discountPercent: { $push: '$discounted_percentage'}, desc:{ $push: '$description'}, quantity: { $push: '$quantity'}, colors: { $push: '$colors'}, prodImages:{ $push: '$product_images'}, views: { $push: '$views'}, group: { $push: '$group'}} },
                { $limit: 20 },
            ]);
            if(!isNull(result))return result;
        }
    }catch(err){

    }
    return null;
}

const getProductsAll = async(group, offset, limit) =>{
    try{
        if(isConnected()){
            const result = await productTable.find({ group: group }).lean().skip(offset).limit(limit);
            if(!isNull(result))return result;
        }
    }catch(err){}
    return null;
}

const getProductsByCategoryId = async(catId, offset, limit) =>{
    try{
        if(isConnected()){
            const result = await productTable.find({ category_id: catId }).lean().skip(offset).limit(limit);
            if(!isNull(result))return result;
        }
    }catch(err){}
    return null;
}


module.exports = {
    getProductGroups,
    getProductsAll,
    getProductsByCategoryId
}