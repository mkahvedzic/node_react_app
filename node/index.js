const express = require('express');

const app = express();


app.use('/', express.static('public/'));

app.use((request, response) => {
    response.status(404);
    response.send('Page Not Found!');
});


app.listen(3000);