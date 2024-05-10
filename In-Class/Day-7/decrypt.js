const openpgp = require("openpgp");
const fs = require("fs");

const privateKeyArmored = fs.readFileSync("./keys/private.key")
const passphrase = 'obiwan';

(async () => {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored.toString() }),
    passphrase
  });

  const encryptedData = fs.readFileSync("encrypted-secret-ethan.txt");
  const decrypted = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: encryptedData.toString() }),
    decryptionKeys: privateKey
  });
  console.log("successfully decrypted data.");
  console.log(decrypted.data);

})();
