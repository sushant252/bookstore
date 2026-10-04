import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState("");
  const [discount, setDiscount ] = useState("");
  const [finalPrice, setFinalPrice] = useState();
  useEffect(() => {
    axios({
      url : apiUrl +'/book/' + id,
      method: "get"
    }).then((res) => {
        setBook(res.data.data);
        setDiscount(res.data.discount);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Container className="py-4" >
      
      <Button
        variant="secondary"
        className="mb-4"
        onClick={() => navigate("/books")}
      >
        ← Back
      </Button>

      <Card className="shadow-sm border-0 " style={{background: "linear-gradient(180deg, #f8feff 0%, #ddf3f8 100%)"}}>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <img
                src={book.bookImage}
                alt={book.bookTittle}
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "450px",
                  objectFit: "contain",
                }}
              />
            </Col>

            <Col md={8}>
              <h2 className="fw-bold">{book.bookTittle}</h2>

              <p className="text-muted fs-5">By {book.authorName}</p>

              <div className="mb-3">
                <Badge bg="success">★ {book.rating || "0"}</Badge>

                <span className="ms-2 text-muted">
                  {book.reviews || "0"} Reviews
                </span>
              </div>

              <hr />

              <div className="mb-4">
                
               {discount ? (
        <div>
            <span className="fs-1 fw-bold">
                ₹
                {discount.discountType === "Percentage"
                    ? book.originalPrice -
                      (book.originalPrice * discount.discountValue) / 100
                    : book.originalPrice - discount.discountValue}
            </span>

            <span className="ms-3 text-muted text-decoration-line-through fs-5">
                ₹{book.originalPrice}
            </span>

            <span className="ms-3 text-success fw-bold">
                {discount.discountType === "Percentage"
                    ? `${discount.discountValue}% off`
                    : `₹${discount.discountValue} off`}
            </span>
        </div>
    ) : (
        <span className="fs-1 fw-bold">
            ₹{book.originalPrice}
        </span>
    )}
              </div>

              {book.shortDescription && (
                <div className="mb-4">
                  <h5 className="fw-bold">About this book</h5>

                  <p>{book.shortDescription}</p>
                </div>
              )}

              <h5 className="fw-bold mb-3">Book Details</h5>

              <BookDetailLocal label="Author" value={book.authorName} />

              <BookDetailLocal label="Publisher" value={book.publisher} />

              <BookDetailLocal
                label="Publication Year"
                value={book.publicationYear}
              />

              <BookDetailLocal label="ISBN" value={book.isbnNo} />

              <BookDetailLocal label="Edition" value={book.edition} />

              <BookDetailLocal label="Language" value={book.language} />

              <BookDetailLocal label="Genre" value={book.genre} />

              <BookDetailLocal label="Category" value={book.bookCategory} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {book.description && (
        <Card className="shadow-sm border-0 mt-4"  style={{background: "linear-gradient(180deg, #f8feff 0%, #ddf3f8 100%)"}}>
          <Card.Body>
            <h4 className="fw-bold">Description</h4>

            <p className="mt-3">{book.description}</p>
          </Card.Body>
        </Card>
      )}

      <Card className="shadow-sm border-0 mt-4"  style={{background: "linear-gradient(180deg, #f8feff 0%, #ddf3f8 100%)"}}>
        <Card.Body>
          <h4 className="fw-bold mb-3">Product Information</h4>

          <BookDetailLocal label="Country of Origin" value={book.countryOfOrigin} />

          <BookDetailLocal label="Manufacturer" value={book.nameOfManufacturer} />

          <BookDetailLocal
            label="Manufacturer Address"
            value={book.addressOfManufacturer}
          />

          <BookDetailLocal label="Packager" value={book.nameOfPackager} />

          <BookDetailLocal label="Packager Address" value={book.addressOfPackager} />
        </Card.Body>
      </Card>
    </Container>
  );
}

function BookDetailLocal({ label, value }) {
  return (
<Container>
  <Row className="border-bottom py-2">
      <Col xs={5} className="text-muted">
        {label}
      </Col>

      <Col xs={7} className="fw-semibold">
        {value || "-"}
      </Col>
    </Row>
    </Container>
  );
}

export default BookDetail;