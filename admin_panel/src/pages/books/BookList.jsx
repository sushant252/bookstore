import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Table, Button, Form, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
function BookList() {
    let [books, setBooks] = useState([]);
    let [isDelete, setIsDelete] = useState(false);
    let [searchBook, setSearchBook] = useState('');
    let [nop, setNop] = useState(1);
    let [booksPerPage] = useState(3);
    let [pageNo, setPageNo] = useState(1);
    let navigate = useNavigate();
    let items = [];
    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => setPageNo(i)}>{i}</Pagination.Item>
        )
    }
    function goToAddBook() {

        navigate('/add/book')
    }

    function handleDelete(id) {
        alert(id);
        axios({
            url: apiUrl + '/delete/book/' + id,
            method: 'delete'
        }).then(() => {
            alert('data has been deleted successfully')
            setIsDelete(true);
        })
            .catch((err) => {
                alert(err)
            })
    }
    function handleUpdate(id) {
        alert(id);
        navigate('/edit/book/' + id);
    }
    const handleView = (id)=>{
        navigate('/book/'+id);
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/books',
            method: 'get',
            params: {
                searchBook: searchBook,
                pageNo: pageNo,
                booksPerPage: booksPerPage
            }
        }).then((res) => {
            setBooks(res.data.data);
            setNop(Math.ceil(res.data.totalBooks / booksPerPage))
        })
            .catch((err) => {
                alert(err);
            })
    }, [isDelete, searchBook, pageNo, booksPerPage])
    return (
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
                    <Button className='mt-4 ' variant="success" size='sm' style={{ float: 'right' }} onClick={goToAddBook} >AddBook +</Button>
              
                    </Form>
                   <Table bordered className="rounded overflow-hidden">
                        <thead>
                            <tr className="text-center" >
                                <th>BookImage</th>
                                <th>Book Tittle</th>
                                <th>Author Name</th>
                                <th>Price</th>
                                <th>ISBN NO</th>
                                {/* <th>NOP</th> */}
                                <th>Publication</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book) =>
                                    <tr className="text-center align-middle book-row">
                                        <td ><img  src={book.bookImage} width='30px' hegiht='30px'></img></td>
                                        <td>{book.bookTittle}</td>
                                        <td>{book.authorName}</td>
                                        <td>{book.originalPrice}</td>
                                        <td>{book.isbnNo}</td>
                                        {/* <td>{book.nop}</td> */}
                                        <td>{book.publicationYear}</td>
                                        <td>                                        
                                            <div className="d-flex gap-2">

                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(book._id)}
                                                    title="Delete Book"
                                                >
                                                    <FaTrash />
                                                </Button>


                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleUpdate(book._id)}
                                                    title="Edit Book"
                                                >
                                                    <FaEdit />
                                                </Button>


                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleView(book._id)}
                                                    title="View Book"
                                                >
                                                    <FaEye />
                                                </Button>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <Pagination size='md' className='justify-content-center'>{items}</Pagination>
                </Col>
            </Row>
        </Container>
    )
}

export default BookList;