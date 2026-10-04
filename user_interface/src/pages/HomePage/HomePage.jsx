import { useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All books");
  const navigate = useNavigate();
  const goForBooks = () =>  {
    navigate('/books')
  }
  const categories = [
    "All books",
    "Fiction",
    "Self-growth",
    "Romance",
    "Mystery",
    "Poetry",
    "Classics",
  ];

  const books = [
    {
      title: "The Quiet Garden",
      author: "Maya Bell",
      category: "Literary Fiction",
      price: "₹499",
      tag: "NEW",
      color: "green",
    },
    {
      title: "Midnight Stories",
      author: "Aria Cole",
      category: "Short Stories",
      price: "₹399",
      tag: "BESTSELLER",
      color: "orange",
    },
    {
      title: "The Art of Slow",
      author: "Nora Lane",
      category: "Self-growth",
      price: "₹549",
      tag: "",
      color: "purple",
    },
    {
      title: "Small Wonders",
      author: "Eli Rowan",
      category: "Poetry",
      price: "₹349",
      tag: "EDITOR'S PICK",
      color: "gold",
    },
  ];

  const handleCategory = (category) => {
    setActiveCategory(category);
  };

  const handleAddToCart = (book) => {
    alert(`${book.title} added to cart 🛒`);
  };

  return (
    <div className="homepage">

      {/* ================= HERO ================= */}

      <section className="hero-section" id="home">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-eyebrow">
              A little escape, delivered
            </span>

            <h1>
              Find a book.
              <br />
              <em>Find yourself.</em>
            </h1>

            <p>
              Curated stories, timeless classics and fresh voices —
              thoughtfully chosen for readers who love getting lost
              in a good book.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore the collection →
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Our story
              </button>
            </div>
          </div>

          {/* Bookshelf */}

          <div className="hero-bookshelf">

            <div className="bookshelf-background"></div>

            <div className="bookshelf">
              <div className="shelf-books">
                <div className="hero-book book-green">
                  THE QUIET GARDEN
                </div>

                <div className="hero-book book-orange">
                  MIDNIGHT STORIES
                </div>

                <div className="hero-book book-gold">
                  SMALL WONDERS
                </div>

                <div className="hero-book book-purple">
                  THE ART OF SLOW
                </div>
              </div>
            </div>

            <div className="floating-card floating-top">
              <span>✦</span>
              <div>
                Editor's picks
                <small>Updated weekly</small>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <span>★</span>
              <div>
                <strong>★★★★★</strong>
                <small>4.9 from readers</small>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="categories-section" id="categories">
        <div className="page-container">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                Browse by mood
              </span>

              <h2>
                What are you in the mood for?
              </h2>
            </div>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= BOOKS ================= */}

      <section className="books-section" id="shop">
        <div className="page-container">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                Handpicked for you
              </span>

              <h2>Featured reads</h2>
            </div>

            <button className="view-all" onClick = {goForBooks}>
              View all books →
            </button>
          </div>

          <div className="books-grid">

            {books.map((book) => (
              <article className="book-card" key={book.title}>

                <div className={`book-cover ${book.color}`}>

                  {book.tag && (
                    <span className="book-tag">
                      {book.tag}
                    </span>
                  )}

                  <strong>{book.title}</strong>
                </div>

                <div className="book-info">

                  <h3>{book.title}</h3>

                  <p>
                    {book.author} · {book.category}
                  </p>

                  <div className="book-bottom">

                    <span className="book-price">
                      {book.price}
                    </span>

                    <button
                      className="add-cart"
                      onClick={() => handleAddToCart(book)}
                    >
                      +
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>

          {/* ================= BOOK CLUB ================= */}

          <div className="book-club" id="about">

            <div className="club-content">

              <span className="section-eyebrow">
                The book club
              </span>

              <h2>
                Read more.
                <br />
                Feel more.
              </h2>

              <p>
                Join curious readers for monthly recommendations,
                author notes and a little reading inspiration
                in your inbox.
              </p>

              <button className="primary-btn">
                Join the club →
              </button>

            </div>

            <div className="mini-books">
              <span className="mini-book mini-green"></span>
              <span className="mini-book mini-orange"></span>
              <span className="mini-book mini-purple"></span>
              <span className="mini-book mini-gold"></span>
            </div>

          </div>

        </div>
      </section>

      {/* ================= QUOTE ================= */}

      <section className="quote-section">
        <div className="page-container">

          <div className="quote-mark">“</div>

          <blockquote>
            A room without books is like a body without a soul.
          </blockquote>

          <span>— Cicero</span>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="home-footer">
        <div className="page-container">

          <div className="footer-logo">
            BookHaven
          </div>

          <p>
            © 2026 BookHaven · Made for readers
          </p>

          <p>
            Instagram · Pinterest · Contact
          </p>

        </div>
      </footer>

    </div>
  );
}

export default HomePage;