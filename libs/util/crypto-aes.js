var CryptoJS = require('crypto-js');

// var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  // 32位密钥
// var iv   = '1234567812345678';  // 16位

var key  = CryptoJS.enc.Utf8.parse('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
var iv   = CryptoJS.enc.Utf8.parse('1234567812345678');

function getAes(data){ //加密
  var encrypted =CryptoJS.AES.encrypt(data,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return encrypted.toString();    //返回的是base64格式的密文
}

function getDAes(encrypted){//解密
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return decrypted.toString(CryptoJS.enc.Utf8);    
}

// var encrypted = getAes('lupeng');
// console.log('加密后：' + encrypted);

// var data = getDAes(encrypted);
// console.log('解密后：' + data);

exports.getAes = getAes;
exports.getDAes = getDAes;