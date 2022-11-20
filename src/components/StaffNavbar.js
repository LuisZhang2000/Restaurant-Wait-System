import React from 'react';
import { Button, Container, Navbar as NavbarBs } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const StaffNavbar = ({ username, role }) => {
    const navigateTo = useNavigate();
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm">
            <Container>
                <div className="mx-4 d-flex justify-content-between" style={{ 'width': '100%' }}>
                    <Button variant="info" size="lg" style={{ "pointerEvents": "none", 'width': '200px' }}>
                        { username }
                    </Button>
                    <Button variant="info" size="lg" style={{ "pointerEvents": "none", 'width': '200px' }}>
                        Role: { role[0].toUpperCase() + role.substring(1) }
                    </Button>
                    <Button 
                        size="lg" 
                        style={{ 'width': '200px' }}
                        onClick={() => navigateTo(`/login`)}
                    >
                        Logout
                    </Button>
                </div>
            </Container>
        </NavbarBs>
    );
}