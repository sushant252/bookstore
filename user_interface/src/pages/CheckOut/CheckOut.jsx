import {Container, Row, Col, Form } from "react-bootstrap";
import {useSelector } from "react-redux";
function CheckOut() {
const {products, totalCost} = useSelector((state) => state.cart);
    return(
        
        <Container>
            <Row className="g-4">
                {/* Left: Shipping details */}
                <Col lg={7}>
                <div className="bh-checkout-panel">
                <div className="bh-checkout-title">
                    <div className="bh-checkout-icon">
                    <i className="bi bi-truck"></i>
                    </div>
                <div>
                 <h3>Shipping Details</h3>
                     <p>Enter your details for safe delivery.</p>
                </div>
                 </div>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>   
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>   
                    </Row>
                    
                    <h5 className="mt-2 text-primary" > Shipping Address : </h5>
                    <Row className="mt-3">
                        <Col>
                        <Form.Group>
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>      
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>      
                    </Row>
                    <Row className="mt-2">
                        <Col>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Country </Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                </Form>
                </div>
                </Col>
            {/* Right: Product summary */}
                <Col lg={5}>
                 <div className="bh-checkout-panel bh-order-panel">
        <div className="bh-checkout-title">
          <div className="bh-checkout-icon gold">
            <i className="bi bi-bag-check"></i>
          </div>
          <div>
            <h3>Order Summary</h3>
            <p>Review your favourite books.</p>
          </div>
        </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Book Image</th>
                            <th>
                                Book Name
                            </th>
                           
                            <th>
                                Price
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                       {
                        products.map((product) => 
                            <tr>
                                <td></td>
                                <td ><img src={product.bookImage} height="40px" alt={product.bookImage} /></td>
                                <td>{product.bookTittle}</td>
                                <td>₹ {product.originalPrice}</td>
                
                            </tr>
                        )
                       }
                       <br />
                       <tr>
                                <td></td>
                                <td></td>
                                <th>Total Cost</th>
                                <th>₹ {totalCost}</th>
                            <td></td>
                       </tr>
                    
                    </tbody>
                </table>
                 </div>
                </Col>
            </Row>
        </Container>     
    )
}
export default CheckOut;