const { isNull, generateId } = require("../../../util/Util");
const { isConnected } = require("../../connection/DBConnection");
const { categoryTable, productTable } = require("../../connection/Schema");


const addCategory = async(catName) =>{
    let catId = null;
    try{
        if(isConnected()){
            const curDate = new Date();
            const result = await categoryTable.findOne({ category_name: catName }).select('category_id');
            if(!isNull(result)){
                catId = result.category_id;
            }else {
                catId = generateId(8);
            }
            const updated = await categoryTable.updateOne({ category_name: catName },{ category_name: catName, category_id: catId, createdAt: curDate, updatedAt: curDate }, { upsert: true });
            // console.log('result after updating: ',updated);
            if(updated.acknowledged && (updated.modifiedCount > 0 || updated.upsertedCount > 0))return catId;
        }
    }catch(err){

    }
    return null;
}


const updateCategoryImage = async(categoryId, catImage) =>{
    try{
        if(isConnected()){
            const curDate = new Date();
            const updated = await categoryTable.updateOne({ category_id: categoryId },{ category_image: catImage, updatedAt: curDate });
            if(updated.acknowledged && updated.modifiedCount > 0)return true;
        }
    }catch(err){

    }
    return false;
}

const editCategoryName = async(catName, catId) =>{
    try{
        if(isConnected()){
            const updated = await categoryTable.updateOne({ category_id: catId }, { category_name: catName, updatedAt: new Date() }, { upsert: true });
            if(updated.acknowledged && updated.modifiedCount > 0 && updated.upsertedCount > 0)return true;
        }
    }catch(err){}
    return false;
}


const editCategoryImage = async(catImage, catId) =>{
    try{
        if(isConnected()){
            const updated = await categoryTable.updateOne({ category_id: catId }, { category_image: catImage, updatedAt: new Date() }, { upsert: true });
            if(updated.acknowledged && updated.modifiedCount > 0 && updated.upsertedCount > 0)return true;
        }
    }catch(err){}
    return false;
}


const getCategory = async() =>{
    try{
      if(isConnected()){
        const result = await categoryTable.find({}).lean();
        if(!isNull(result))return result;
      }
    }catch(err){

    }
  return null;
}

const deleteCategory = async(catId) =>{
    try{
        if(isConnected()){
            const result = await categoryTable.findOneAndDelete({ category_id: catId }).select('category_image -_id');
            if(!isNull(result)){
                productTable.deleteMany({ category_id: catId });
                return { status: true, category_image: result.category_image };
            }
        }
    }catch(err){

    }
  return { status: false, category_image: null };
}

module.exports ={
    addCategory,
    updateCategoryImage,
    editCategoryName,
    editCategoryImage,
    getCategory,
    deleteCategory
}