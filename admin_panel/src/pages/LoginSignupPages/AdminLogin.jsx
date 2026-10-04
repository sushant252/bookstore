import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// import { useNavigate } from "react-router-dom";

function AdminLogin() {
  // let navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    // Basic validation
    if (!email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      setShowSpinner(true);
      let backendurl = apiUrl + "/admin/login"
      const res = await axios.post(backendurl, {
        email,
        password,
      });

      // if (res.data.success) {
      //   alert("Admin login successful!");
      //   localStorage.setItem("token", res.data.data.token);
      //   localStorage.setItem("name", res.data.data.name);
      //   window.location.href = "/admin/dashboard"; // redirect
      // }

      if (res.data.success) {
          alert("Admin login successful!");
          const user = res.data.data;
          localStorage.setItem("token", res.data.token);
          // localStorage.setItem("name", res.data.firstName);
          localStorage.setItem("name",`${user.firstName} ${user.lastName || ""}`.trim());
          window.location.href = "/admin/dashboard";
      }
       else {
        setErrorMsg(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again.",err);
    } finally {
      setShowSpinner(false);
    }
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #93a1b7, #9ebbbd)",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={5} lg={4}>
          <Card className="shadow-lg border-0 ">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-start  text-info mb-0 ">Admin Login</h3>
            
          <Image src={logo} width={40} height={40} className="" style={{ float: 'right' }}/>
        </div> 
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="adminEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="adminPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid mt-3">
                  <Button type="submit" variant="primary" disabled={showSpinner}>
                    {showSpinner ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </Form>
              {errorMsg && (
                <div className="alert alert-danger py-2 text-center mt-2">{errorMsg}</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLogin;
