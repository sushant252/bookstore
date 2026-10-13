
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function Login({ show, onHide }) {
  const [showLoginWindow, setShowLoginWindow] = useState(true);
  const [showSignupWindow, setShowSignupWindow] = useState(false);

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

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
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
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
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
