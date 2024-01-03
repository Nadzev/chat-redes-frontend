// const crypto = require('crypto');
import sha256 from 'crypto-js/sha256'
// // Replace 'aes-256-cbc' & keys with your algorithm and key of choice
// const algorithm = 'camellia256';
// const key = crypto.randomBytes(32); // Key size depends on the algorithm
// const iv = crypto.randomBytes(16); // For AES, this is always 16

// // Encrypt function
// function encrypt(text) {
//     let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Decrypt function
// function decrypt(text) {
//     let iv = Buffer.from(text.iv, 'hex');
//     let encryptedText = Buffer.from(text.encryptedData, 'hex');
//     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//     let decrypted = decipher.update(encryptedText);
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
// }

// // Example usage
// const hw = encrypt("Hello World!");
// console.log(hw);
// console.log(decrypt(hw));
var CryptoJS = require("crypto-js");
CryptoJS.
const crypto = require('crypto-js');
const key = crypto.randomBytes(32);
console.log(key);