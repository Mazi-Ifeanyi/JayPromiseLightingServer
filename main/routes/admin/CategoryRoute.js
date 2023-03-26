const express = require('express');
const { addCategory } = require('../../databases/methods/admin/CategoryDB');
const { isNull } = require('../../util/Util');
const router = express.Router();

router.post('/add', async function(req, res){
   const query = req.query;
   const catName = query.category_name;

   const catId = await addCategory(catName);
   console.log(catId);
   if(!isNull(catId)){
    res.status(200).json({ category_id: catId });
    return;
   }
   res.status(500).json({ category_id: null });
});

router.post('/upload-image', function(req, res){
    console.log(req.files.image);
    // console.log(req);
    const file = req.files.image;
    // const path = __dirname+'/images/'+
});


module.exports = router;