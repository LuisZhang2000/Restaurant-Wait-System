import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../endpoints/auth";

export const LoginForm = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigateTo = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError('')
        setLoading(true)
        login(emailRef.current.value, passwordRef.current.value)
        .then((response) => {
            // bad response means user does not exist
            if (!response.ok) {
                return null;
            } else {
                return response.json();
            }
        }).then((data) => {
            setLoading(false)
            if (data != null) {
                const details = data.data;
                navigateTo(`/${details.role}/${details.username}/${details.token}`)
            } else {
                setError('Invalid user!');
            }
        });
    }

    return (<>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="login-email-input" type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="email" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="login-password-input" type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button name="login-button" disabled={loading} className="w-100 mt-5" type="submit">Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/register">Sign Up</Link>
        </div>
    </>)
}

export default LoginForm;
