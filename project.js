const http = require("http");
const fs = require("fs");
const queryString = require("querystring");


const server = http.createServer((req, res) =>{
       
    if(req.url === '/' && req.method === 'GET'){

        fs.readFile('form.html', (err, data) => {

            if(err){
                res.end("Internal server Error !");
                return;
            }

            res.writeHead(200, {"content-type" : "text/html"});
            res.end(data);
        });
    }
    else if(req.url === '/contact' && req.method === 'POST'){

        let body = "";

        req.on("data", chunk => {

            body += chunk.toString();
        });

        req.on("end",  () => {
                const formdata = queryString.parse(body);
                console.log(formdata);

               res.writeHead(200, { "Content-Type": "text/html" });
                res.end(`<h2>Thank you  , your message has been received !! </h2>`);
        });
    }

    else{
            res.end("404 Not Found ");
    }
});

port = 2200;
 server.listen(port, () => console.log(`server start on ${port} port`));

