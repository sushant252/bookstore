
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
function Login({ show, onHide, onLoginSuccess }) {

  // window Login Or signUp variable
  const [showLoginWindow, setShowLoginWindow] = useState(true);
  const [showSignupWindow, setShowSignupWindow] = useState(false);

  // user signUp info variable
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  
  // user Login variable
    let [lemail, setLEmail] = useState('');
    let [lpassword, setLPassword] = useState('');
  
  // 
  function openLogin() {
    setShowLoginWindow(true);
    setShowSignupWindow(false);
  }

  function openSignup() {
    setShowLoginWindow(false);
    setShowSignupWindow(true);
  }

  function handleClose() {
    setShowLoginWindow(true);
    setShowSignupWindow(false);
    onHide();
  }
  function signUp() {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    axios({
       url: apiUrl + '/create/user',
        method: 'Post',
        data: data
    }).then((res) => {
          alert(res.data.message)
    }).catch((err) => {
        alert(err)
    })
  }
   
function doLogin(e) {
  e.preventDefault();

  const loginData = {
    email: lemail,
    password: lpassword
  };

  axios({
    url: apiUrl + "/user/login",
    method: "post",
    data: loginData
  })
    .then((res) => {
      const userData = res.data.data;

      // Login successful hone ke baad details save karo
      localStorage.setItem("token", userData.token);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successfully");
      onLoginSuccess();
    })
    .catch((err) => {
      alert(
        err.response?.data?.message || "Login failed. Please try again."
      );
    });
}

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="bookhaven-login-dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {showLoginWindow ? "Welcome Back!" : "Create Account"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {showLoginWindow && (
          <>
            <p className="text-muted mb-4">
              Login to continue your BookHaven journey.
            </p>

            <Form onSubmit={doLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange ={(e) => setLEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange ={(e) => setLPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                 
              >
                Login
              </Button>
            </Form>

            <p className="text-center mt-3 mb-0">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={openSignup}
              >
                Sign Up
              </Button>
            </p>
          </>
        )}

        {showSignupWindow && (
          <>
            <p className="text-muted mb-4">
              Create your account and explore BookHaven.
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  required
                  onChange = {(e) => setFirstName(e.target.value)}
                />

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  required
                  onChange = {(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                   onChange = {(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  required
                   onChange = {(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                onClick={signUp}
              >
                Create Account
              </Button>
            </Form>

            <p className="text-center mt-3 mb-0">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={openLogin}
              >
                Login
              </Button>
            </p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Login;
