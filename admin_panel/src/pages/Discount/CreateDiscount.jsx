import {Container, Row, Col, Form, Button } from "react-bootstrap";
import {useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import {useNavigate} from "react-router-dom";
function CreateDiscount() {
    let [books, setBooks] = useState([]);
    let [book, setBook] = useState('');
    let [discountName, setDiscountName] = useState('');
    let [status, setStatus]  = useState('Active') ;
    let [discountValue, setDiscountValue] = useState(0);
    let [discountType, setDiscountType] = useState('');
    let [validFrom, setValidFrom] = useState('');
    let [validTo, setValidTo] = useState('');
     let navigate = useNavigate()
    useEffect(() => {
        axios({
            url: apiUrl + '/books/for/discount',
            method:'get'
        }).then((res) => {
            setBooks(res.data.data)
        }).catch((err) => {
            alert(err)
        })
    },[])

    function addDiscount() {
        let data = {
            book          : book,
            discountName  : discountName,
            discountValue : discountValue,
            discountType  : discountType,
            validFrom     : validFrom,
            validTo       : validTo,
            status        :status
        }
        axios({
           url: apiUrl + '/add/discount',
           method: 'post',
           data: data
        }).then((res)=> {
            alert('Discount hasbeen added sucessfully...')
            navigate('/discounts')
        })
        .catch((err) => {
            alert(err)
        })
    }
    return(
        <Container >
            <Row >
                <Col>
                   <h3 className="text-center text-danger p-2">Add discount</h3>    
                </Col>
            </Row>
            <Row >

                <Form.Group>
                    <Form.Label>Select Book</Form.Label>
                    <Form.Select onChange ={(e) =>setBook(e.target.value)}>
                        <option value="">....Select Book....</option>
                        {
                            books.map((book)=> 
                                <option value={book._id}>{book.bookTittle}</option>
                            )
                        }
                    </Form.Select>
                </Form.Group>

            </Row>
            <Row className="mt-2 ">
                <Form.Group>
                       <Form.Label>Discount Name</Form.Label>
                       <Form.Control type ="text" onChange ={(e) => setDiscountName(e.target.value)} ></Form.Control> 
                </Form.Group>
            </Row> 
            <Row className="mt-2 ">
                <Form.Group>
                        <Form.Label>Discount Type</Form.Label>
                        <Form.Select onChange ={(e) => setDiscountType(e.target.value)}>
                            <option value="">-----Select------</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Fixed">Fixed</option>
                        </Form.Select>
                </Form.Group>
            </Row> 
             <Row className="mt-2 ">
                <Form.Group>
                       <Form.Label>Discount Value (in Number Only)</Form.Label>
                       <Form.Control type ="number" onChange ={(e) => setDiscountValue(e.target.value)} ></Form.Control> 
                </Form.Group>
            </Row>  
             <Row className="mt-2 ">
                <Form.Group>
                       <Form.Label>Valid From</Form.Label>
                       <Form.Control type ="date" onChange ={(e) => setValidFrom(e.target.value)}></Form.Control> 
                </Form.Group>
            </Row>  
             <Row className="mt-2 ">
                <Form.Group>
                       <Form.Label>Valid To</Form.Label>
                       <Form.Control type ="date" onChange ={(e) => setValidTo(e.target.value)} ></Form.Control> 
                </Form.Group>
            </Row> 
             <Row className="mt-2 ">
                <Form.Group>
                       <Form.Label>Status</Form.Label>
                       <Form.Select onChange ={(e) => setStatus(e.target.value)} >
                            <option value="Active">Active</option>
                            <option value="InActive">InActive</option>
                        </Form.Select> 
                </Form.Group>
            </Row> 
            <Button className="btn mt-3" variant = "success" onClick ={addDiscount}>Add Discount</Button> 
        </Container>
    )
}
export default CreateDiscount