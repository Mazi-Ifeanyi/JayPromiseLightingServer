const express = require('express');
const router = express.Router();
const fs = require('fs');
const { isNull, SYSTEM_PATH } = require('../../util/Util');


router.get('/:image_name', async function(req, res){
   const catImage = req.params.image_name;
   if(!isNull(catImage) && catImage.indexOf('.') >= 0){
      try{
         const PATH = SYSTEM_PATH+catImage;
         if(fs.existsSync(PATH)){
            const reader = fs.createReadStream(PATH);
            reader.pipe(res);
         }else{
            return res.status(500).send('File does not exist.');
         }
      }catch(err){
         return res.status(500).send('Failed to load image');
      }
   }
});

module.exports = router;
