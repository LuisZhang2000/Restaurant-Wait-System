import React, { useEffect, useState } from 'react'
import { Button, Modal, Dropdown, DropdownButton, Card, Container, Col, Row } from 'react-bootstrap'
import { StaffNavbar } from '../components/StaffNavbar';
import { useParams } from 'react-router-dom';
import { updateStatus, getOrders, placeReadyOrderForTable } from '../endpoints/order';

export function KitchenStaff() {
    const params = useParams()
    const [orders, setOrders] = useState([]);
    const username = params.username
    const [editOrder, setEditOrder] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getOrders()
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // something went wrong on server side
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setOrders(data.data)
            }
        })
    }, []);

    return (<>
        <StaffNavbar username={username} role="Kitchenstaff" />
        <Container>
            {
                orders.length === 0 ?
                <div>
                    No orders added yet.
                </div> :
                <Row>
                    <Col>
                        {orders && orders.map((order, index) => {
                            return (<>
                                <h1 className="fs-2" style={{ marginTop: "30px", marginBottom: "30px" }}>Table {order.tableNumber}</h1>
                                {order.orderItems.map(item => {
                                    return (
                                        <Row className="mt-4 mb-3">
                                            <Card className="h-100">
                                            <Card.Body className="d-flex flex-column">
                                            <Card.Title className="d-flex justify-content-between align-items-baseline">
                                                <div className="me-auto">
                                                    <div className="text-muted" style={{ fontSize: "1rem", marginBottom: "10px"}}>Order placed: {order.timePlaced}</div>
                                                    <div>
                                                        <span className="fs-4 flex-1" style={{ flex: 1 }}>{item.name}{" "}</span>
                                                        <span className="text-muted" style={{fontSize: "1rem"}}>x{item.quantity}</span>
                                                    </div>
                                                </div>
                                                <div style={{ width: 200 }}>
                                                    <DropdownButton id="dropdown-basic-button" title={order.status} onClick={() => setEditOrder(order)}>
                                                        <Dropdown.Item 
                                                            onClick={() => {
                                                                editOrder.status = "Preparing"
                                                                updateStatus(editOrder)
                                                                window.location.reload(false)
                                                            }}
                                                        >
                                                            Preparing
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                editOrder.status = "Cooking"
                                                                updateStatus(editOrder)
                                                                window.location.reload(false)
                                                            }}
                                                        >
                                                            Cooking</Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                handleShow()
                                                            }}
                                                        >
                                                            Ready
                                                        </Dropdown.Item>
                                                </DropdownButton>
                                                </div>
                                            </Card.Title>
                                            </Card.Body>
                                            </Card>
                                        </Row>  
                                    )
                                })}
                            </>)
                        })}   
                    </Col>
                </Row>
            }
        </Container>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to set status to "Ready"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        name="confirm-place-order-button"
                        variant="success"
                        onClick={() => {
                            editOrder.status = "Ready"
                            updateStatus(editOrder)
                            placeReadyOrderForTable(editOrder.tableNumber)
                            handleClose()
                            window.location.reload(false)
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
    </>)
}
