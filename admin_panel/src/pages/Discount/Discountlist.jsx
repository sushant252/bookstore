import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import {useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios";
function Discountlist() {
    let [discounts, setDiscounts] = useState([])
    let navigate = useNavigate()
    function goToAddDiscount() {
        navigate('/add/discount')
    }
    const goForEdit = (id) =>{
    
        navigate('/edit/discount/' + id);
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/discounts',
            method: 'get'
        }).then((res) => {
            setDiscounts(res.data.data)
        })
        .catch((err) => {
            alert(err)
        })
    } ,[])
    return(
        <Container>
            <Row>
                 <h3 className="mt-1 text-center text-danger mb-4">Discounts List</h3>
               
            </Row>

            <Row className="shadow ">
                <Col>
                <Form className="mt-3 ">
                    <Form.Group style = {{float: 'left'}} className="mb-3" >
                        <Form.Control type= "text" placeholder = "Type book name to search"></Form.Control>
                    </Form.Group>
                    <Button className = "" variant="success" size='sm' style = {{float: 'right'}} onClick={goToAddDiscount} >Add Discount</Button>
                </Form>
                
           
                <Table bordered className="table-hover " size='sm'>
                    <thead>
                        <tr className="text-center">   
                            <th>sr.no</th>
                            <th>Discount Name</th>
                            <th>Discount type</th>
                            <th>Value</th>
                            <th>Book Title</th>
                            <th>Valid From</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discounts.map((discount,i) => 
                                <tr className="text-center">
                                    <td>{i+1}</td>
                                    <td>{discount.discountName}</td>
                                    <td>{discount.discountType}</td>
                                    <td>{discount.discountValue}</td>
                                    <td>{discount.book.bookTittle}</td>
                                    <td>{new Date(discount.validFrom).toLocaleDateString("en-GB")}</td>
                                    <td>{new Date(discount.validTo).toLocaleDateString()}</td>
                                   <td style={{ color: discount.status === "Active" ? "green" : "red" }}>
                                              {discount.status}
                                            </td>
                                            <td>
                                            <Button className="btn btn-danger" onClick={() => goForEdit(discount._id)}>Edit</Button></td>
                                </tr>
                        )} 
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Discountlist 