const express = require("express");
const path = __dirname + '/server/views/';
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', require('./server/routes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});