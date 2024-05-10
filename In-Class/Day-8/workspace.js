// Get Post Put Delete Trace Connect Options
// 401 we dont know who u are
// 403 we know who you are but ur banned

const https = require("https");
const fs = require("fs");

const options = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/George_Washington",
  method: "GET",
};

const request = https
  .request(options, (response) => {
    response.setEncoding("utf8");
    let responseBody = "";

    console.log(`Server Status Code: ${response.statusCode}`);
    console.log(`Response headers %j`, response.headers);

    response.once("data", (chunk) => {
      console.log(chunk);
    });

    response.on("data", (chunk) => {
      console.log(`--chunk-- ${chunk.length}`);
      responseBody += chunk;
    });

    response.on("end", () => {
      fs.writeFile("george-washington.html", responseBody, (err) => {
        if (err) throw err;
        console.log("file downloaded");
      });
    });
  })
  .end();