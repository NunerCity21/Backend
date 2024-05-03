const crypto = require('crypto');
const fs = require('fs');

encrypt("file.txt");


function encrypt(fileName) {
    const algorithm = 'aes-192-cbc';
    const password = 'Password123!'
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const inFile = fs.createReadStream(fileName);
    const outFile = fs.createWriteStream(fileName + ".out")
    const encrypt = crypto.createCipheriv(algorithm, key, iv)
    inFile.pipe(encrypt).pipe(outFile);
}


