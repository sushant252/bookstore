
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { deleteProduct } from "../../features/cart/cartslice";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { products = [], totalCost = 0 } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function deleteBookFromCart(id) {
    dispatch(deleteProduct(id));
  }

  function goToCheckoutPage() {
    navigate("/CheckOut");
  }

  return (
    <div className="bh-cart-page">
      {/* Page Heading */}
      <Container className="bh-cart-container">
        <div className="bh-cart-heading">
          <div className="bh-cart-heading-icon">
            <i className="bi bi-bag-heart-fill"></i>
          </div>

          <div>
            <span className="bh-cart-eyebrow">
              YOUR PERSONAL BOOKSHELF
            </span>
            <h1>
              Your <span>Shopping Cart</span>
            </h1>
            <p>Great stories are just a step away from you.</p>
          </div>
        </div>

        {/* Cart Card */}
        <div className="bh-cart-card">
          <div className="bh-cart-topbar">
            <div className="bh-cart-item-info">
              <i className="bi bi-book-half"></i>
              <span>
                You have <strong>{products.length}</strong>{" "}
                {products.length === 1 ? "book" : "books"} in your cart
              </span>
            </div>

            <span className="bh-cart-message">
              <i className="bi bi-heart-fill"></i>
              Keep reading, keep growing!
            </span>
          </div>

          {/* Empty Cart */}
          {products.length === 0 ? (
            <div className="bh-empty-cart">
              <div className="bh-empty-icon">
                <i className="bi bi-basket3"></i>
              </div>

              <h3>Your cart is waiting for a story!</h3>
              <p>
                Looks like you haven't added any books yet.
                Find your next favourite read.
              </p>

              <Button
                className="bh-shop-btn"
                onClick={() => navigate("/books")}
              >
                <i className="bi bi-book me-2"></i>
                Explore Books
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="table-responsive bh-cart-table-wrap">
                <table className="table bh-cart-table align-middle">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Book Details</th>
                      {/* <th>Author</th> */}
                      <th>Price</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id || product.id || index}>
                        <td>
                          <div className="bh-cart-book-cover">
                            <img
                              src={product.bookImage}
                              alt={product.bookTittle || "Book cover"}
                            />
                          </div>
                        </td>

                        <td>
                          <div className="bh-cart-book-details">
                            <h6>{product.bookTittle}</h6>
                            <span className="bh-book-badge">
                              <i className="bi bi-bookmark-heart me-1"></i>
                              {product.authorName}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="bh-cart-price">
                            ₹{Number(product.originalPrice || 0).toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td className="text-center">
                          <button
                            type="button"
                            className="bh-delete-btn"
                            aria-label={`Remove ${product.bookTittle} from cart`}
                            title="Remove book"
                            onClick={() =>
                              deleteBookFromCart(product._id || product.id)
                            }
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="bh-cart-total">
                <div className="bh-total-label">
                  <div className="bh-total-icon">
                    <i className="bi bi-cart-check-fill"></i>
                  </div>

                  <div>
                    <h5>Total Cost</h5>
                    <p>Price of all items in your cart</p>
                  </div>
                </div>

                <div className="bh-total-amount">
                  ₹{Number(totalCost || 0).toLocaleString("en-IN")}
                </div>
              </div>

              {/* Cart Actions */}
              <div className="bh-cart-actions">
                <Button
                  as={Link}
                  to="/books"
                  variant="outline-primary"
                  className="bh-continue-btn"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Button>

                <Button
                  className="bh-checkout-btn"
                  onClick={goToCheckoutPage}
                >
                  <i className="bi bi-shield-lock-fill me-2"></i>
                  Proceed to Checkout
                  <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </div>

              <div className="bh-cart-security">
                <i className="bi bi-shield-check"></i>
                Secure checkout experience
                <span>•</span>
                <i className="bi bi-heart"></i>
                Happy reading!
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Cart;
