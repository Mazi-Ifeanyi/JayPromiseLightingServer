const express = require('express');
const { addProduct, getGroups, addProductImages, getProductsAll } = require('../../databases/methods/admin/ProductsDB');
const { isNull, SYSTEM_PATH } = require('../../util/Util');
const router = express.Router();
const path = require('path');
const { getHash } = require('../../encryption/Hashing');

router.post('/add', async function(req,res){
  const query = req.query;
  const categoryId = query.category_id;
  const group = query.group;
  const productName = query.product_name;
  const price = query.price;
  const discount = query.discount;
  const discountPercent = (((discount - price) * 100)/price).toFixed(0);
  const dimension = query.dimension;
  const colors = query.colors;
  const quantity = query.quantity;
  const desc = query.desc;

  const prodId = await addProduct(categoryId, productName, price, discount, discountPercent, desc, dimension, quantity, colors, group);
  if(!isNull(prodId)){
    return res.status(200).json({ product_id: prodId });
  }else{
    return res.status(500).send('Unable to save this product');
  }
});

router.get('/get-groups', async function(req, res){
  const groups = await getGroups();
//   console.log('i entered here')
//   console.log(groups)
  res.status(200).json({ groups });
});


router.get('/get', async function(req, res){
    const result = await getProductsAll(req.offset);
 
    res.status(200).json({ result });
});


router.post('/upload-image', async function(req, res){
    const query = req.query;
    const productId = query.product_id;
     console.log('product id: ', productId);
    const files = req.files.image;
    // console.log('image files: ',files);
    let error = false, errorMessage = '', errorCode;
    let productImages = [];
    if(!isNull(files)){
        for(let i = 0; i< files.length; i++){
          const file = files[i];
            const ext = path.extname(file.name);
            const fileName = getHash(file.data).substring(0,15)+ext;
            const path_ = `${SYSTEM_PATH}/${fileName}`;
            const allowedExts = ['.png', '.jpg','.jpeg'];
            productImages.push(fileName);

            if(!allowedExts.includes(ext)){
                error = true;
                errorMessage ='Cannot process this image';
                errorCode = 422;
                break;
            }
            try{
                file.mv(path_, (err)=>{
                  console.log('i want to save to disk')
                    if(err){
                      error = true;
                      errorMessage ='Failed to save image';
                      errorCode = 500;
                    }
                });
            }catch(err){
            }
        }

        if(error){
           return res.status(errorCode).send(errorMessage)
        }

        const result = await addProductImages(productId, productImages);
        if(result)return res.status(200).send('Upload Successful');
        else return res.status(500).send('Failed to save image');
    }else{
       return res.sendStatus(200);
    }
   
});


module.exports = router;