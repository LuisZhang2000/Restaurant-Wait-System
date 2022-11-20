import React from "react";
import RegisterForm from '../components/RegisterForm';
import { Container } from "react-bootstrap"

export const Register = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <RegisterForm />
            </div>
        </Container>
    )
}