const querystring = require("querystring");

const url =
  "http://www.opencanvas.co.uk?myName=James&myAge=98&comment=Yes+I+am+getting+old";

const parseUrl = querystring.parse(url.substring(url.indexOf("?") + 1));

console.log(`Hi my name is ${parseUrl.myName}`);
console.log(`I am ${parseUrl.myAge}`);
console.log(`Oh and...${parseUrl.comment}`);
