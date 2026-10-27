
import { useState, useEffect } from "react";
import { Col, Container, Row, Table, Form, Pagination} from "react-bootstrap";
import axios from "axios";
import "./TransactionList.css";
const apiUrl = import.meta.env.VITE_API_URL;

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [nop, setNop] = useState(1);
    const [transactionPerPage, setTransactionPerPage] = useState(5);
    const [pageNo, setPageNo] = useState(1);

    let items = [];

    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={pageNo === i}
                onClick={() => setPageNo(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        axios({
            url: apiUrl + "/transactions",
            method: "get",
            params: {
                pageNo: pageNo,
                transactionsPerPage: transactionPerPage
            }
        })
            .then((res) => {
                setTransactions(res.data.data);
                setNop(
                    Math.ceil(
                        res.data.totalTransactions / transactionPerPage
                    )
                );
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [pageNo, transactionPerPage]);

    return (
        <Container>
            <Row>
                <h3 className="text-center text-primary mt-3">
                    Transaction List
                </h3>
            </Row>

            <Row>
                <Col
                    className="shadow mt-3"
                    style={{
                        background:
                            "linear-gradient(180deg, #f8feff 0%, #ddf3f8 100%)"
                    }}
                >
                    <Form.Group>
                        <Form.Select
                            style={{ width: "70px" }}
                            value={transactionPerPage}
                            onChange={(e) => {
                                setTransactionPerPage(
                                    Number(e.target.value)
                                );
                                setPageNo(1);
                            }}
                            className="shadow-none mt-4 mb-4 me-2"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </Form.Select>
                    </Form.Group>

                 
                        <Table responsive hover className="transaction-table align-middle mb-0">
                            <thead>
                                <tr className="text-center">
                                    <th>Sr No</th>
                                    <th>TRANSACTION ID</th>
                                    <th>CUSTOMER EMAIL</th>
                                    <th>PRODUCTS</th>
                                    <th>AMOUNT</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((transaction, i) => (
                                    <tr key={transaction._id} className="text-center">
                                        <td>{i +1}</td>
                                        <td>
                                            <span className="transaction-id">
                                                #{transaction.transactionId}
                                            </span>
                                        </td>
                                
                                        <td>
                                            <span className="customer-email">
                                                {transaction.email}
                                            </span>
                                        </td>
                                
                                        <td>
                                            <div className="product-list">
                                                {transaction.products?.map((product, index) => (
                                                    <span
                                                        key={index}
                                                        className="product-badge"
                                                    >
                                                        {product.bookTittle}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                            
                                        <td>
                                            <span className="transaction-amount">
                                                ₹{Number(transaction.amount).toLocaleString("en-IN")}
                                            </span>
                                        </td>
                                            
                                        <td>
                                            <span
                                                className={`status-badge ${
                                                    transaction.status?.toLowerCase() === "completed"
                                                        ? "status-completed"
                                                        : transaction.status?.toLowerCase() === "pending"
                                                        ? "status-pending"
                                                        : transaction.status?.toLowerCase() === "failed"
                                                        ? "status-failed"
                                                        : "status-default"
                                                }`}
                                            >
                                                <span className="status-dot"></span>
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    <Pagination
                        size="md"
                        className="justify-content-center mt-2"
                    >
                        <Pagination.Prev
                            disabled={pageNo === 1}
                            onClick={() => setPageNo(pageNo - 1)}
                        />

                        {items}

                        <Pagination.Next
                            disabled={pageNo === nop || nop === 0}
                            onClick={() => setPageNo(pageNo + 1)}
                        />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}

export default TransactionList;
