//encrypt.js
// encrypt.js
const openpgp = require("openpgp");
const fs = require("fs");

const publicKeyArmored = fs.readFileSync("./keys/tage.key");

(async () => {
  const plainData = fs.readFileSync("./secret.txt");
  const encrypted = await openpgp.encrypt({
    message: (await openpgp.createMessage({ text: plainData.toString() })),
    encryptionKeys: (await openpgp.readKey({ armoredKey: publicKeyArmored.toString() })),
  });

  fs.writeFileSync("encrypted-tage-secret.txt", encrypted);
  console.log(`data has been encrypted...`);
})();