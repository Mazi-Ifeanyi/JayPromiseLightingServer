const express = require('express');
const path = require('path')
const { addCategory, updateCategory, getCategory, deleteCategory } = require('../../databases/methods/admin/CategoryDB');
const { countProductByCategoryId } = require('../../databases/methods/admin/ProductsDB');
const { getHash } = require('../../encryption/Hashing');
const { isNull, SYSTEM_PATH } = require('../../util/Util');
const router = express.Router();

router.post('/add', async function(req, res){
   const query = req.query;
   const catName = query.category_name;

   const catId = await addCategory(catName);
   if(!isNull(catId)){
    res.status(200).json({ category_id: catId });
    return;
   }
   res.status(500).json({ category_id: null });
});


router.post('/upload-image', function(req, res){
    const query = req.query;
    const categoryId = query.category_id;

    const file = req.files.image;
    if(!isNull(file)){
        const ext = path.extname(file.name);
        const fileName = getHash(file.data).substring(0,15)+ext;
        const path_ = `${SYSTEM_PATH}/${fileName}`;
        const allowedExts = ['.png', '.jpg','.jpeg'];
    
        if(!allowedExts.includes(ext)){
            return res.status(422).send('Cannot process this image');
        }
    
        file.mv(path_, async(err)=>{
            if(err){
                return res.status(500).send('Failed to save image');
            }
            const result = await updateCategory(categoryId, fileName);
            if(result)return res.status(200).send('Upload Successful');
            else return res.status(500).send('Failed to save image');
        });
    }
   
});

router.get('/get', async function(req, res){
    const result = await getCategory();
    if(!isNull(result)){
        for(let i = 0; i < result.length; i++){
            const count = await countProductByCategoryId(result[i].category_id);
            result[i].product_count = count;
        }
        return res.status(200).json({ result });
    }else{
        return res.status(500).send('No Category have been added.');
    }
});

router.get('/delete', async function(req, res){
    const query = req.query;
    const catId = query.category_id;

    const result = await deleteCategory(catId);
    return res.status(200).json({ result });
});


module.exports = router;