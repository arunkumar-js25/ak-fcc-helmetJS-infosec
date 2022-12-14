const express = require('express');
const helmet = require('helmet');


const app = express();
app.use(helmet.hidePoweredBy()); //Hide Potentially Dangerous Information
app.use(helmet.frameguard({action: 'deny'})); //Risk of Clickjacking
app.use(helmet.xssFilter()); //Risk of Cross Site Scripting (XSS) Attacks
app.use(helmet.noSniff()); //Avoid Inferring the Response MIME Type
app.use(helmet.ieNoOpen()); //Prevent IE from Opening Untrusted HTML
ninetyDaysInSeconds = 90*24*60*60; //Ask Browsers to Access Your Site via HTTPS
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}))

app.use(helmet.dnsPrefetchControl())//Disable DNS Prefetching
app.use(helmet.noCache()); //Disable Client-Side Caching
//Set a Content Security Policy
app.use(helmet.contentSecurityPolicy(
  { directives:
    { defaultSrc: ["'self'"], 
     scriptSrc: ["'self'", "trusted-cdn.com"] 
    }}
));




































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
