const express = require('express');
const { getGroups, countProductByGroup } = require('../../databases/methods/admin/ProductsDB');
const { isNull } = require('../../util/Util');
const router = express.Router();

router.get('/get', async function(req, res){
    const groups = await getGroups();
    if(!isNull(groups)){
        for(let i = 0; i < groups.length; i++){
            const count = await countProductByGroup(groups[i]._id);
            groups.product_count = count;
        }
    }
    res.status(200).json({ result: groups });
});
  
module.exports = router;