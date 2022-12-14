const http = require('http');

const request = http.request({
   hostname: 'localhost',
   port: 4000,
   method: 'POST',
   path: '/checkStudentInfo/',
   headers: {
    'Content-type': 'application/json'
   }
}, response => {
    let parts = [];
    response.on('data', part => parts.push(part));
    response.on('end', () => {
    let responseData = Buffer.concat(parts).toString();
    console.log(responseData);
    });

});

const studentToCheck = {
   forename: 'Merima',
   surname: 'Kahvedzic',
   index: '2008213514'
};

const requestBodyData = JSON.stringify(studentToCheck);

request.write(requestBodyData);

request.end();