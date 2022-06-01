const http = require('http');
const data = require('./data.json');
const URL = require('url');
const fs = require('fs');
const path = require('path');

function writeFile(cb) {
    return fs.writeFile(
        path.join(__dirname, 'data.json'), 
        JSON.stringify(data, null,2), 
        err => {
            if(err) throw err
        
            cb(JSON.stringify({message:"Deletado com sucesso"}));
        }
    );
}

http.createServer((req, res) => {
    const { name, url, del} = URL.parse(req.url, true).query;

    res.writeHead(200,{'Access-Control-Allow-Origin': '*'});
    
    if (!name || !url) {
        return res.end(JSON.stringify(data));
    }

    if(del){
        data.urls = data.urls.filter(item => String(item.url) !== String(url));

        return writeFile((message) => {res.end(message)});
    }

    data.urls.push({ name, url });

    return writeFile((message) => {res.end(message)});

}).listen(3000, () => console.log('Api running at http://localhost:3000/'));