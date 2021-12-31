const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('request made ===>')
    // Set response header
    res.setHeader('Content-type', 'text/html')
    // routing 
    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', 'about')
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    // return html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            // res.write(data); // instead of this we can directly write res.end(data); that will also work the same way
            res.end(data);
        }
    });
});

// localhost is like a domain name on the web
// port numbers are like a doors into a computer
server.listen(3000, 'localhost', () => {
    console.log('server listening on port 3000');
})

// Status Code 
// 100 range - informational response
// 200 range - success code 
// 300 range - codes for redirects
// 400 range - user or client eror code 
// 500 range - server error code 