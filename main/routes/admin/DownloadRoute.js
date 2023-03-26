const express = require('express');
const router = express.Router();
const fs = require('fs');
const { isNull, SYSTEM_PATH } = require('../../util/Util');


router.get('/:prod_id', async function(req, res){
   const prodId = req.params.prod_id;
   console.log(prodId)
   console.log(typeof prodId)
   if(!isNull(prodId)){
      const reader = fs.createReadStream(SYSTEM_PATH+prodId);
      reader.pipe(res);
   }
});

module.exports = router;
