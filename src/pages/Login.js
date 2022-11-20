import React from "react";
import LoginForm from '../components/LoginForm';
import { Container } from "react-bootstrap"

export const Login = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <LoginForm />
            </div>
        </Container>
    )
}