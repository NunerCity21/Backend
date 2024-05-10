//generate-keys.js
const openpgp = require("openpgp");
const fs = require("fs");

generate();
async function generate() {
  const { privateKey, publicKey }  = await openpgp.generateKey({
    type: 'ecc', // Type of the key, defaults to ECC
    curve: 'curve25519', // ECC curve name, defaults to curve25519
    userIDs: [{ name: "luke", email: "luke@tatooine.com" }],// you can pass multiple user IDs
    passphrase: "obiwan", // protects the private key
    format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
  });
  fs.writeFileSync("./keys/private.key", privateKey);
  fs.writeFileSync("./keys/public.key", publicKey);
  console.log(`keys generated and written to file...`);
}