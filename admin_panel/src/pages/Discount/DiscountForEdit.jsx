import {Container, Row, Col, Form, Button } from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState} from "react"
const apiUrl = import.meta.env.VITE_API_URL 
function DiscountForEdit() {
    let params = useParams()
    let id = params.id;
    let navigate = useNavigate();
    let [books, setBooks] = useState([]);
    let [discount, setDiscount] = useState({
        book            : '',
        discountName    : '',
        discountType    : '',
        discountValue   :  0,
        validFrom       : '',
        validTo         : '',
        status          : ''
    })
    useEffect(() => {
        axios({
            url: apiUrl + '/discount/for/edit/' + id,
            method: 'get'
        }).then((res) => {
            setDiscount(res.data.data);
            setBooks(res.data.books);
        })
        .catch((err)=> {
            alert(err)
        })
    },[])
    function editDiscount() {
        axios({
            url: apiUrl + '/edit/discount/' + id,
            method: 'put',
            data: discount
        }).then((res) => {
            alert("Discount has been updated successfuly")
            navigate('/discounts')
        }).catch((err) => {
            alert(err)
        })
    }

    function manageUpdate(e) {
        let name = e.target.name;
        let value = e.target.value
        setDiscount((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return(
        <Container>
            <Row >
                <Col>
                   <h3 className="text-center text-danger p-2">Edit Discount</h3>    
                </Col>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>Select Book</Form.Label>
                    <Form.Select name = "book" value= {discount.book}  onChange ={manageUpdate}>
                        {
                            books.map((book)=> 
                                <option value={book._id}>{book.bookTittle}</option>
                            )
                        }
                    </Form.Select>
                </Form.Group>
            
                <Form.Group>
                       <Form.Label>Discount Name</Form.Label>
                       <Form.Control type ="text" name="discountName" value ={discount.discountName}  onChange ={manageUpdate}></Form.Control> 
                </Form.Group>
           
                <Form.Group>
                        <Form.Label >Discount Type</Form.Label>
                        <Form.Select name = "discountType" value={discount.discountType}  onChange ={manageUpdate}>
                            <option value="">select</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Fixed">Fixed</option>
                        </Form.Select>
                </Form.Group>
          
                <Form.Group>
                       <Form.Label>Discount Value (in Number Only)</Form.Label>
                       <Form.Control type ="number" name = "discountValue" value ={discount.discountValue}  onChange ={manageUpdate} ></Form.Control> 
                </Form.Group>
          
                
                <Form.Group>
                       <Form.Label>Valid From</Form.Label>
                       <Form.Control type ="date" name="validFrom" value ={discount.validFrom.split('T')[0]}  onChange ={manageUpdate}></Form.Control> 
                </Form.Group>
          
                <Form.Group>
                       <Form.Label>Valid To</Form.Label>
                       <Form.Control type ="date" name="validTo" value ={discount.validTo.split('T')[0]}  onChange ={manageUpdate}></Form.Control> 
                </Form.Group>
         
                <Form.Group>
                       <Form.Label>Status</Form.Label>
                       <Form.Select name = "status" value ={discount.status} style={{ color: discount.status === "Active" ? "green" : "red" }} onChange ={manageUpdate}>
                            <option value="Active" style  ={{color:"green"}}>Active</option>
                            <option value="InActive" style={{color:"red"}}>Inactive</option>
                        </Form.Select> 
                </Form.Group>
            </Row> 
            

            <Button className="btn mt-3" variant = "success" onClick = {editDiscount}>submit</Button> 
        </Container>
        
    )
} 
export default DiscountForEdit;