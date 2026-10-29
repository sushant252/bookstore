import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { deletecart } from "../../features/cart/cartslice.js"
function CheckOut() {
const {products, totalCost} = useSelector((state) => state.cart);
const dispatch = useDispatch();
let navigate = useNavigate();
let [firstName, setFirstName] = useState('');
let [lastName, setLastName] = useState('');
let [email, setEmail] = useState(localStorage.getItem("email") || "");
let [mobileNO, setMobileNO] = useState('');
let [addressLine1, setAddressLine1] = useState('');
let [addressLine2, setAddressLine2] = useState('');
let [city, setCity] = useState('');
let [state, setState] = useState('');
let [country, setCountry] = useState('');
let [pinCode, setPinCode] = useState('');
let [amount, setAmount]= useState(0);
function deleteCartOnPaymentSussecc() {
    dispatch(deletecart())
}

const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
async function goForPayment() {
    // alert('ok')
    let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNO: mobileNO,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            country: country,
            pinCode: pinCode,
            amount: totalCost,
            products: products
        }
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res) {
            alert('Unable to load window')
            return 
        }
        const response = await fetch("http://localhost:3000/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const orderData = await response.json()
        const options = {
            key: "rzp_test_TqS9PSZTzCbRLo", // test_key is here
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Online Book Store",
            description: "Payment for Book",
            order_id: orderData.id,
            handler: async function (response) {
               
                const verifyResponse = await fetch("http://localhost:3000/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response)
                });
                const verifyData = await verifyResponse.json();
                if (verifyResponse.ok) {
                    alert("Payment has been done successfully");
                    navigate('/payment/success', {state: verifyData.data });
                } else {
                    alert("Verification Failed: " + verifyData.message);
                    navigate('/Payment/failed', {state: verifyData.data } );
                }
            },
            prefill: {
                name: "Ganeshaaaaa haaaa",
                email: "ganesh@yopmail.com",
                contact: "7428964220"
            },
            theme: { color: "#3399cc" }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
}
    return(
        
        <Container >
            <Row className="mb-5">
                <Col>
                <h3 className="text-center text-danger mt-5 ">Shipping details</h3>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setFirstName(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setLastName(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>   
                     
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"  value={email} onChange = {(e) => setEmail(e.target.value)} required></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setMobileNo(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>   
                    </Row>
                    
                    <h5 className="mt-2 text-primary" > Shipping Address : </h5>
                    <Row className="mt-3">
                        <Col>
                        <Form.Group>
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setAddressLine1(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>      
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setAddressLine2(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>      
                    </Row>
                    <Row className="mt-2">
                        <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setCity(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>State </Form.Label>
                            <Form.Control type="text" onChange = {(e) => setState(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                        <Form.Group>
                            <Form.Label>Country </Form.Label>
                            <Form.Control type="text" onChange = {(e) => setCountry(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type="text" onChange = {(e) => setPinCode(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                        </Row>
                    </Row>
                </Form>
                </Col>
                <Col>
                <h3 className="text-center text-danger mt-5">Product Summary</h3>
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
                       <tr>
                    <td></td>
                    
                    <td colSpan={2} className="text-end p-3">
                        <Button
                            variant="success"
                            size="lg"
                            onClick={goForPayment}
                             
                            className="rounded-pill px-5 py-2 fw-bold shadow-sm bh-checkout-btn"
                        >
                            <i className="bi bi-credit-card me-2"></i>
                            Pay Now
                        </Button>
                    </td>
                    <td></td>
                </tr>
                       
                    
                    </tbody>
                </table>
                </Col>
            </Row>
        </Container>     
    )
}
export default CheckOut;