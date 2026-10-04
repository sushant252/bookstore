import axios from 'axios'
import {useState, useEffect} from 'react'
import { Col, Container, Row, Table, Button, Form, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;
function UserList() {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        axios({
            url: apiUrl + '/users',
            method: 'get'
        }).then((res) => {
            setUsers(res.data.data)
        }).catch(() => {
            alert(err)
        })
    },[])
    return(
          <Container >
            
            <Row>
                 <h3 className='text-center text-primary mt-3 '>Book List</h3>
            </Row>
            <Row>
                   
                <Col className="shadow mt-3"  style={{background: "linear-gradient(180deg, #f8feff 0%, #ddf3f8 100%)"}}>
                    <Form>
                        <Form.Group>
                            <Form.Select style={{ float: 'left', width:"70px"  }} className="shadow-none mt-4 mb-4 me-2" >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group style={{ float: 'left' }} className='mt-4 mb-4' >
                            <Form.Control className='shadow-none' type='text' placeholder='enter bookTittle to search....' onChange={(e) => setSearchBook(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                   <Table bordered className="rounded overflow-hidden">
                        <thead>
                            <tr className="text-center" >
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                           {
                            users.map((user) =>
                             <tr className="text-center align-middle book-row">
                                        <td >{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td style={{ color: user.Status === "active" ? "green" : "red" || user.Status === "Active" ? "green" : "red"}}>{user.Status}</td>
                                    </tr>
                            )
                           }    
                        </tbody>
                    </Table>
                    <Pagination size='md' className='justify-content-center'></Pagination>
                </Col>
            </Row>
        </Container>
    )
}
export default UserList