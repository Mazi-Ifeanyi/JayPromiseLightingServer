const { isConnected } = require('../../connection/DBConnection');
const { productTable } = require('../../connection/Schema');
const { isNull, generateId } = require('../../../util/Util');


const addProduct = async(catId, productName, originalPrice, discountPrice, discountPercent, desc, dimension, quantity, colors, group) =>{
    try{
        if(isConnected()){
            const productId = generateId(10);
            const curDate = new Date();
            const created = await productTable.create({ category_id: catId, product_name: productName, product_id: productId, original_price: originalPrice, discounted_price: discountPrice, discounted_percentage: discountPercent, description: desc, dimension: dimension, quantity: quantity, colors: colors, group: group, createdAt: curDate, updatedAt: curDate });
            if(!isNull(created))return productId;
        }
    }catch(err){

    }
    return null;
}

const addProductImages = async(productId, productImages)=>{
    console.log('i want to save: ', productId, '-----', productImages)
   try{
     const updated = await productTable.updateOne({ product_id: productId }, { product_images: productImages });
     if(updated.acknowledged && (updated.modifiedCount > 0))return true;
   }catch(err){}

   return false;
}


const editProduct = async(catId, productName, originalPrice, discountPrice, discountPercent, desc, dimension, quantity, colors, productImages, group) =>{
    try{
        if(isConnected()){
            const updated = await productTable.updateOne({ category_id: catId, product_id: productId }, { product_name: productName, original_price: originalPrice, discounted_price: discountPrice, discounted_percentage: discountPercent, description: desc, dimension: dimension, quantity: quantity, colors: colors, product_images: productImages, group: group, updatedAt: new Date() }, { upsert: true });
            if(updated.acknowledged && updated.modifiedCount > 0 && updated.upsertedCount > 0)return true;
        }
    }catch(err){}
    return false
}

const getProductsAll = async(offset) =>{
    try{
        if(isConnected()){
            const found = await productTable.find({ }).lean().skip(offset).limit(20);
            if(!isNull(found))return found;
        }
    }catch(err){

    }
    return [];
}

const getProductsByGroup = async(group, offset) =>{
    try{
        if(isConnected()){
            const found = await productTable.find({ group: group }).lean().skip(offset).limit(20);
            if(!isNull(found))return found;
        }
    }catch(err){

    }
    return null;
}


const getGroups = async() =>{
    try{
        if(isConnected()){
            const found = await productTable.aggregate([
                {$group: {'_id': '$group'}}
            ]);
            if(!isNull(found))return found;
        }
    }catch(err){

    }
    return [];
}

const getProductsByCategoryId = async(categoryId, offset) =>{
    try{
        if(isConnected()){
            const found = await productTable.find({ category_id: categoryId }).lean().skip(offset).limit(20);
            if(!isNull(found))return found;
        }
    }catch(err){

    }
    return null;
}


const deleteProduct = async(productId) =>{
    try{
        if(isConnected()){
            const deleted = await productTable.deleteOne({ product_id: productId });
            if(deleted.acknowledged && deleted.deletedCount > 0)return true;
        }
    }catch(err){}
    return false;
}

const countProductByCategoryId = async(catId) =>{
    try{
        if(isConnected()){
            const count = await productTable.countDocuments({ category_id: catId });
            return count;
        }
    }catch(err){}
    return 0;
}

const countProductByGroup = async(group) =>{
    try{
        if(isConnected()){
            const count = await productTable.countDocuments({ group: group });
            return count;
        }
    }catch(err){}
    return 0;
}


module.exports = {
    addProduct,
    addProductImages,
    editProduct,
    getProductsAll,
    getProductsByGroup,
    getGroups,
    getProductsByCategoryId,
    deleteProduct,
    countProductByCategoryId,
    countProductByGroup
}
