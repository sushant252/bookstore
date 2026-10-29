
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/cart/cartslice.js";
import axios from "axios";
import Login from "../../components/Login";
import "./AllBooks.css";

const apiUrl = import.meta.env.VITE_API_URL;

function AllBooks() {
  const dispatch = useDispatch();

  const [books, setBooks] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  // Login states
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("token")
  );

  // Fetch books
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

  // Add to Cart
  function addToCart(book) {
    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("token");

    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      alert("Please login first to add books to your cart!");

      setSelectedBook(book);
      setShowLogin(true);
      return;
    }

    dispatch(addProduct(book));
  }

  // Login successful
  function handleLoginSuccess() {
    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("token");

    setIsLoggedIn(loggedIn);
    setShowLogin(false);

    if (loggedIn && selectedBook) {
      dispatch(addProduct(selectedBook));
      setSelectedBook(null);
    }
  }

  return (
    <>
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
                    {book.bookCategory &&
                      ` · ${book.bookCategory}`}
                  </p>

                  <div className="book-bottom">
                    <div className="price-box">
                      <span className="book-original-price">
                        ₹{book.originalPrice}
                      </span>

                      <span className="book-discount">
                        {discounts?.discountValue ?? 0}% OFF
                      </span>

                      <span className="book-final-price">
                        ₹{Math.round(book.originalPrice)}
                      </span>
                    </div>

                    <div className="book-actions">
                      <button
                        className="buy-now-btn"
                        onClick={() => handleBuyNow(book)}
                      >
                        Buy Now
                      </button>

                      <button
                        className="add-book-btn"
                        onClick={() => addToCart(book)}
                        title="Add to Cart"
                        aria-label="Add to Cart"
                      >
                        <i className="bi bi-cart-plus"></i>
                      </button>
                    </div>
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

      {/* Login Modal */}
      <Login
        show={showLogin}
        onHide={() => {
          setShowLogin(false);
          setSelectedBook(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default AllBooks;
