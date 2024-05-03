const fs = require('fs');
const fsp = fs.promises;

// fs.readdir('./', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// })
// console.log("Reading Files...");

fs.readFile('./Hi.txt', "utf8", (err, data) =>  {
    if (err) throw err;
    console.log(data);

})

try {
    const data = fs.readFileSync('./Hi.txt', "utf8")
    console.log(data);
} catch (err) {
    console.log(err);
}


fsp.readFile("./Hi.txt", "utf8").then((data) => console.log(data)).catch((err) => console.log(err));

(async () => {
    try {
        const data = await fsp.readFile("./Hi.txt", "utf8");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})();