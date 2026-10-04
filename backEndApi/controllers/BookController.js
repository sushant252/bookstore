const Book = require('../models/Book')
const Discount = require('../models/Discount')
const cloudinary = require('cloudinary').v2

async function addBook(req, res) {
    try {
        cloudinary.config({
            cloud_name:"ur4xcd9y",
            api_key:"986588523488659",
            api_secret:"WpRD4tp79FSSV6exLngYEbJMTU0"
        })
        const upload = await cloudinary.uploader.upload(req.file.path)
        // console.log(upload)
        req.body.bookImage = upload.secure_url;
        let book = new Book(req.body)
        await book.save();
        // console.log("Data saved successfully.......")
        res.status(200).send({message : 'Data has been saved successfully'})

    } catch (err) {
        res.status(400).send({message: 'Something went wrong'})
    }
}
async function getBooks(req,res) {
    try{
        let totalBooks = await Book.countDocuments({});
        // console.log(totalBooks)
        let books = await Book.find({bookTittle: new RegExp(req.query.searchBook, "i")}).skip((req.query.pageNo - 1)*(req.query.booksPerPage)).limit(req.query.booksPerPage);
        // console.log(books)
        
        res.status(200).send({data: books, totalBooks: totalBooks })

    } catch(err) {
        // console.log(err)
         res.status(400).send({message: err})
    }
}

async function deleteBook(req, res) {
    try {
        let id = req.params.id;
        await Book.deleteOne({_id:id});
        res.status(200).send({success:true })
    } catch(err) {
    
        res.status(400).send({success:false })
        // console.log(err)

    }
}
async function getBookForEdit(req, res) {
    try {
        let id = req.params.id;
        // console.log(id);
         let  book = await Book.findOne({_id: id});
        // console.log(book)
        res.status(200).send({data: book})
    } catch(err) {
        // console.log(err)
        res.status(400).send({data: err})
    }
} 
async function editBook(req, res) {
    try{
        let id = req.params.id;
        // console.log(id)
        let book =  req.body;
        // console.log(book)
        await Book.updateOne({_id: id}, req.body);
        // console.log("Book update Sucessfully....")
        res.status(200).send({success : true})

    } catch(err) {
        // console.log(err)
        res.status(400).send({success : false})
    }
}
async function getBook(req, res) {
    try {
        const bookId = req.params.id;

        const book = await Book.findOne({_id: bookId});
        
        if (!book) {
            return res.status(404).send({
                message: "Book not found"
            });
        }

        const discount = await Discount.findOne({
            book: bookId,
            status: "Active",
            validFrom: { $lte: new Date() },
            validTo: { $gte: new Date() }
        });

        // console.log("Book:", book);
        // console.log("Discount:", discount);

        res.status(200).send({
            data: book,
            discount: discount
        });

    } catch (err) {
        console.log(err);

        res.status(400).send({
            message: "Something went wrong"
        });
    }
}
module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    editBook,
    getBook
}