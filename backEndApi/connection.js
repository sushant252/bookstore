const mongoose = require('mongoose');

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost:27017/reactcrud-2026')
        console.log("DB connect")
    } catch (err) {
        console.log(err)
    }
}
module.exports = connect