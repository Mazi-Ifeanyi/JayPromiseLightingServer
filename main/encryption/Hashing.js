const { createHash } = require('crypto');


const getHash = (content) =>{
    return createHash('sha3-256').update(content).digest('hex');
}

module.exports ={
    getHash
}