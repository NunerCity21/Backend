const fs = require('fs');

fs.writeFile("./newMessage.txt", "Writing To A File.", (err) =>  {
    if (err) throw err;
    console.log("File Created Or Overwritten.")
})