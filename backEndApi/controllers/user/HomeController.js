const Book = require('../../models/Book')
const Discount = require('../../models/Discount')
async function getBooks(req, res) {
    try {
        let books = await Book.find({});
        // console.log(books, 'books');
        const discount = await Discount.find({});
        res.status(200).send({data: books,discount: discount});

    } catch(err) {
        console.log(err)
        res.status(400).send({message: 'Somehing went wrong '})
    }
}
async function getBookForUser(req,res){
    try{
        let id = req.params.id;
        let book = await Book.findOne({_id : id});
        // console.log(book)
        res.status(200).send({data: book})
    }catch(err){
        console.log(err)
       res.status(400).send({message: "error at homecontroller getBookForUser"})
    }
}
module.exports = {
    getBooks,
    getBookForUser
}