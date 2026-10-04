const express = require('express');
const cors = require('cors');
const connect = require('./connection')
const book = require('./routes/book')
const user = require('./routes/user')
const Home = require('./routes/user/Home')
const createAdmin = require('./createAdmin')
const frontuser = require('./routes/user/User')
const discount = require('./routes/discount')

const app  = express();
app.use(cors());
app.use(book);
app.use(user);
app.use(Home);
app.use(discount);
app.use(frontuser)
connect();
createAdmin();
app.listen(3000, (err) =>{
    if(err){
        console.log(err)
    } else {
        console.log("Server running on 3000......")
    }
})