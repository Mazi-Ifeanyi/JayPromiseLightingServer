const SYSTEM_PATH = 'C:/Users/SAMSUNG/MY_PROJECTS/SERVER/jaypromise_server/images/'

const isNull = (value) =>{
    if(value === undefined)return true;
    if(value === null) return true;
    if(value.length === 0) return true;
    return false;
}

const generateId = (length = 12) =>{
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-_1234567890abcdefghijklmnopqrstuvwxyz';
  let appender = '';
  for(let i = 0; i < length; i++){
    const rand = Math.floor((Math.random() * chars.length));
    appender+=chars.charAt(rand);
  }

  return appender
}


module.exports={
    SYSTEM_PATH,
    isNull,
    generateId
}