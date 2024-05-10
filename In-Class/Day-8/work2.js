const http = require('http');
const fs = require('fs');
const path = require("path");

const data = require("./data/inventory.json");

http
    // .createServer((req, res) => {
    //     if (req.url === "/") {
             
    //         fs.readFile('./public/index.html', 'utf-8', (err, html) => {
    //             if (err) throw err;
    //             res.writeHead(200, {'Content-Type': 'text/html'})
    //             res.end(html);
    //         });
            
    //     } else if (req.url.match(/.css$/)) {
    //         const cssPath = path.join(__dirname, 'public', req.url);
    //         // fs.read and file stream acan ethier be used

    //         const fileStream = fs.createReadStream(cssPath, "utf-8");
    //         res.writeHead(200, {"Content-Type": "text/css"});

            

    //         fileStream.pipe(res);
    //     } else if (req.url.match(/.jpg$/)) {
    //         const jpgPath = path.join(__dirname, 'public', req.url);

    //         const fileStream = fs.createReadStream(jpgPath);
    //         res.writeHead(200, {"Content-Type": "image/jpeg"});

            

    //         fileStream.pipe(res);
    //     }else {
    //         res.writeHead(404, {'Content-Type': 'text/plain'})
    //         res.end("404 File Not Found.");
    //     }
    // })

    .createServer((req, res) => {

        if (req.url === "/") {
            res.writeHead(200, {"Content-Type": "text/json"});
            res.end(JSON.stringify(data));
        } else if (req.url.match(/.css$/)) {
            const cssPath = path.join(__dirname, 'public', req.url);
            // fs.read and file stream acan ethier be used
        
            const fileStream = fs.createReadStream(cssPath, "utf-8");
            res.writeHead(200, {"Content-Type": "text/css"});
        
                    //Re right for stocks only /instock
        
            fileStream.pipe(res);
        } else if (req.url.match(/.jpg$/)) {
            const jpgPath = path.join(__dirname, 'public', req.url);
        
            const fileStream = fs.createReadStream(jpgPath);
            res.writeHead(200, {"Content-Type": "image/jpeg"});
        
                    //Re right for backorder. /onbackorder
        
            fileStream.pipe(res);
        }else {
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end("404 File Not Found.");
        }
    })


    
    .listen(3000, () => {
        console.log("Listening On Port 3000.");
    }); 