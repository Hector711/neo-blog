function getTokenFromHeader(header){
  if(headers && header.authorization){
    const parted = header. authorization.split('');
    if(parted.lenght === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

module.exports = getTokenFromHeader