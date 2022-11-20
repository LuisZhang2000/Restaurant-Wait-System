import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../endpoints/auth";

export const RegisterForm = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        setError('')
        setSuccess('')
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Confirm password does not match!');
        } else {
            setLoading(true);
            register(emailRef.current.value, passwordRef.current.value, role)
            .then((response) => {
                // bad response means user already has an account
                if (!response.ok) {
                    setError('Account already exists!');
                } else {
                    setSuccess('Account made successfully! Please login.')
                }
                setLoading(false)
            });
        }
    }

    return (<>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error ? <Alert variant="danger">{error}</Alert> : success ? <Alert variant="success">{success}</Alert> : ''}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="register-email-input" type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="email" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="register-password-input" type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm" className="mt-3">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control name="register-confirm-password-input" type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Form.Group
                        id="role-confirm"
                        className="mt-3"
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                    >
                        <Form.Label>Please select a role:</Form.Label>
                        <Form.Check id="manager-radio" name="role-radio" type="radio" label="Manager" value="manager" required />
                        <Form.Check id="waitstaff-radio" name="role-radio" type="radio" label="Waitstaff" value="waitstaff" required />
                        <Form.Check id="kitchenstaff-radio" name="role-radio" type="radio" label="Kitchenstaff" value="kitchenstaff" required />
                    </Form.Group>
                    <Button disabled={loading} name="register-signup-button" className="w-100 mt-5" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
        </div>
    </>)
}

export default RegisterForm;
