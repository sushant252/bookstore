import { useEffect, useState } from "react";
import axios from "axios";
import "./AllBooks.css";

const apiUrl = import.meta.env.VITE_API_URL;

function AllBooks() {

  const [books, setBooks] = useState([]);
 const [discounts, setDiscounts] = useState([]);
  useEffect(() => {
    axios({
      url: apiUrl + "/user/books",
      method: "get",
    })
      .then((res) => {
        setBooks(res.data.data);
        setDiscounts(res.data.discount);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to load books");
      });
  }, []);

  
  const addToCart = (book) => {
  alert(`Add ${book.bookTittle} item to cart`);
};
  return (
    <section className="all-books-page">
      <div className="all-books-container">

        {/* Header */}
        <div className="all-books-header">
          <span className="all-books-eyebrow">
            THE COMPLETE COLLECTION
          </span>

          <h1>All Books</h1>

          <p>
            Every story. Every shelf. Find your next favorite book.
          </p>
        </div>

        {/* Books */}
        <div className="all-books-grid">

          {books.map((book, index) => (
            <article
              className="book-card"
              key={book._id || book.id || index}
            >

              {/* Book Image */}
              <div className="book-cover">

                <img
                  src={book.bookImage}
                  alt={book.bookTittle}
                  className="book-image"
                />

                {/* Genre */}
                {book.genre && (
                  <span className="book-tag">
                    {book.genre}
                  </span>
                )}

              </div>

              {/* Book Information */}
              <div className="book-info">

                <h2>{book.bookTittle}</h2>

                <p>
                  {book.authorName}
                  {book.bookCategory && ` · ${book.bookCategory}`}
                </p>

               <div className="book-bottom">
  <div className="price-box">
    <span className="book-original-price">
      ₹{book.originalPrice}
    </span>

    <span className="book-discount">
      {discounts.discountValue}% OFF
    </span>

    <span className="book-final-price">
      ₹
      {Math.round(
        book.originalPrice -
        (book.originalPrice * book.discount) / 100
      )}
    </span>
  </div>

  <button
    className="add-book-btn"
    onClick={() => addToCart(book)}
  >
    <i className="bi bi-plus"></i>
  </button>
</div>

              </div>

            </article>
          ))}

        </div>

        {/* No Books */}
        {books.length === 0 && (
          <div className="no-books">
            <i className="bi bi-book"></i>
            <h3>No books available</h3>
            <p>Please check back later.</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default AllBooks;