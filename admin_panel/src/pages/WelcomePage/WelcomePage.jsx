import React, { useEffect, useState } from "react";
import {Card, Container,Row,Col,Image,Table,Badge,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WelcomePage.css";
import logo from "../../assets/logo.png";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
function WelcomePage() {
  
  // users 
  const [username, setUserName] = useState("Admin");
  const [totalBooks, setTotalBooks] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const name = localStorage.getItem("name");

    if (name) {
      setUserName(name);
    }

    axios({
            url: apiUrl + '/books',
            method: 'get'
            
        }).then((res) => {
           setTotalBooks(res.data.totalBooks);
        })
            .catch((err) => {
                alert(err);
            })
            
     axios({
            url: apiUrl + '/users',
            method: 'get'
            
        }).then((res) => {
          setTotalUsers(res.data.totalUsers);
          setActiveUsers(res.data.activeUsers);
          setInactiveUsers(res.data.inactiveUsers);
        })
            .catch((err) => {
                alert(err);
            })
  }, []);

  const recentOrders = [
    {
      id: "#ORD-1025",
      customer: "Rahul Sharma",
      book: "The Alchemist",
      amount: "₹499",
      status: "Completed",
    },
    {
      id: "#ORD-1024",
      customer: "Priya Singh",
      book: "Atomic Habits",
      amount: "₹699",
      status: "Pending",
    },
    {
      id: "#ORD-1023",
      customer: "Aman Kumar",
      book: "Rich Dad Poor Dad",
      amount: "₹399",
      status: "Processing",
    },
    {
      id: "#ORD-1022",
      customer: "Neha Verma",
      book: "Ikigai",
      amount: "₹349",
      status: "Completed",
    },
  ];

  return (
    <Container fluid className="dashboard-container">

      {/* ================= WELCOME ================= */}

      <Row className="mb-4">
        <Col>
          <div className="dashboard-welcome">

            <div>
              <h2>
                Welcome back, <span>{username}</span> 👋
              </h2>

              <p>
                Here's what's happening with your book store today.
              </p>
            </div>

            <div className="welcome-logo">
              <Image
                src={logo}
                width="70"
                height="70"
                roundedCircle
              />
            </div>

          </div>
        </Col>
      </Row>


      {/* ================= DASHBOARD CARDS ================= */}

      <Row className="g-2" >

        {/* TOTAL BOOKS */}
      <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card active-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-book"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Tootal Book</h6>

                <h3>{totalBooks}</h3>

               <p>
                  <i className="bi bi-book"></i>{" "}
                  Books available
                </p>
              </div>

            </Card.Body>

          </Card>

        </Col>
        {/* TOTAL USERS */}
         <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card active-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-person-check"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Tootal User</h6>

                <h3>{totalUsers}</h3>

               <p>
                  <i className="bi bi-book"></i>{" "}
                 Registered users
                </p>
              </div>

            </Card.Body>

          </Card>

        </Col>
        {/* ACTIVE USERS */}

        <Col xs={12} sm={6} md={6} lg={4}>

    <Card className="dashboard-card active-card">

        <Card.Body>

            <div className="card-top">

                <div className="card-icon">
                    <i className="bi bi-person-check"></i>
                </div>

                <span className="card-menu">
                    <i className="bi bi-three-dots"></i>
                </span>

            </div>

            <div className="card-content">

                <h6>Active Users</h6>

                <h3>{activeUsers}</h3>

                <p>
                    <i className="bi bi-person-check"></i>{" "}
                    Active accounts
                </p>

            </div>

        </Card.Body>

    </Card>

</Col>


        {/* INACTIVE USERS */}

        <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card inactive-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-person-x"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Inactive Users</h6>

                <h3>{inactiveUsers}</h3>
                  
                <p>
                    <i className="bi bi-person-x"></i>{" "}
                    Inactive accounts
                </p>

              </div>

            </Card.Body>

          </Card>

        </Col>


        {/* TOTAL ORDERS */}

        {/* <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card orders-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-cart3"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Total Orders</h6>

                <h3>2,486</h3>

                <p>
                  <i className="bi bi-cart3"></i>{" "}
                  All orders
                </p>

              </div>

            </Card.Body>

          </Card>

        </Col> */}


        {/* PENDING ORDERS */}

        <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card pending-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-hourglass-split"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Pending Orders</h6>

                <h3></h3>

                <p>
                  <i className="bi bi-hourglass-split"></i>{" "}
                  Need processing
                </p>

              </div>

            </Card.Body>

          </Card>

        </Col>


        {/* COMPLETED ORDERS */}

        <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card completed-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-check-circle"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Completed Orders</h6>

                <h3></h3>

                <p>
                  <i className="bi bi-check-circle"></i>{" "}
                  Successfully delivered
                </p>

              </div>

            </Card.Body>

          </Card>

        </Col>


        {/* TOTAL SALES */}

        <Col xs={12} sm={6} md={6} lg={4}>

          <Card className="dashboard-card sales-card">

            <Card.Body>

              <div className="card-top">

                <div className="card-icon">
                  <i className="bi bi-currency-rupee"></i>
                </div>

                <span className="card-menu">
                  <i className="bi bi-three-dots"></i>
                </span>

              </div>

              <div className="card-content">

                <h6>Total Sales</h6>

                <h3>₹0</h3>

                <p>
                  <i className="bi bi-currency-rupee"></i>{" "}
                  Overall revenue
                </p>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* ================= LOWER SECTION ================= */}

      <Row className="g-4 mt-2">

        {/* ================= RECENT ORDERS ================= */}

        <Col lg={8}>

          <Card className="dashboard-section">

            <Card.Body>

              <div className="section-header">

                <div>
                  <h5>Recent Orders</h5>

                  <small>
                    Latest orders from your store
                  </small>
                </div>

                <button className="view-btn">
                  View All
                </button>

              </div>

              <div className="table-responsive">

                <Table
                  hover
                  borderless
                  className="orders-table"
                >

                  <thead>

                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Book</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {/* {recentOrders.map((order, index) => ( */}

                      <tr >

                        <td className="order-id">
                          {/* {order.id} */}
                        </td>

                        <td>
                          {/* {order.customer} */}
                        </td>

                        <td>
                          {/* {order.book} */}
                        </td>

                        <td>
                          {/* {order.amount} */}
                        </td>

                        <td>

                          {/* <Badge
                            className={`status-badge ${order.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {order.status}
                          </Badge> */}

                        </td>

                      </tr>

                    {/* ))} */}

                  </tbody>

                </Table>

              </div>

            </Card.Body>

          </Card>

        </Col>


        {/* ================= STORE OVERVIEW ================= */}

        <Col lg={4}>

          <Card className="dashboard-section store-overview">

            <Card.Body>

              <h5>Store Overview</h5>

              <small>
                Current store statistics
              </small>


              <div className="overview-item">

                <div className="overview-icon books">
                  <i className="bi bi-book"></i>
                </div>

                <div>
                  <strong>{totalBooks}</strong>
                  <span>Total Books</span>
                </div>

              </div>


              <div className="overview-item">

                <div className="overview-icon users">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <strong>{totalUsers}</strong>
                  <span>Total Users</span>
                </div>

              </div>


              <div className="overview-item">

                <div className="overview-icon orders">
                  <i className="bi bi-cart3"></i>
                </div>

                <div>
                  <strong>0</strong>
                  <span>Total Orders</span>
                </div>

              </div>


              <div className="overview-item">

                <div className="overview-icon sales">
                  <i className="bi bi-currency-rupee"></i>
                </div>

                <div>
                  <strong>₹0</strong>
                  <span>Total Sales</span>
                </div>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
}

export default WelcomePage;