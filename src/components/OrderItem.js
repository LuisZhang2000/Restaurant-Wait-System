import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap"
import { formatCurrency } from '../utilities/formatCurrency'
import { useSnackbar } from 'notistack';
import { modifyOrderCount } from "../endpoints/order";

export function OrderItem({ tableNumber, quantities, names, price, timePlaced, deliveryTime, waitTime, orderId, changed, setChanged }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { enqueueSnackbar } = useSnackbar();

    return (
        <>
            <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline">
                        <div className="me-auto">
                            <div className="text-muted" style={{ fontSize: "1rem", marginBottom: "10px"}}>Order placed: {timePlaced}</div>
                            <div className="fs-4 flex-1" style={{ flex: 1, marginBottom: "10px" }}>
                                {quantities.map((quantity,index) => (
                                    <>
                                        <span>{names[index]}{" "}</span>
                                        <span className="text-muted" style={{fontSize: "1rem"}}>x{quantity}</span>
                                        <span>{" "}</span>
                                    </>
                                ))}
                            </div>
                            <div className="text-muted" style={{ fontSize: "1rem"}}>Estimated delivery time: {deliveryTime} { waitTime !== 0 ? `(${waitTime} minutes remaining)` : ''}</div>
                        </div>
                        <span style={{ width: 180 }} className="text-muted">{formatCurrency(price)}</span>
                        <Button className="btn-danger" onClick={handleShow}>
                            X
                        </Button>
                    </Card.Title>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel this item?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            enqueueSnackbar('Order successfully cancelled', { variant: 'success' })
                            modifyOrderCount(tableNumber, orderId, 'delete')
                            .then(() => {
                                setChanged(changed => changed + 1);
                            })
                            .then(() => {
                                handleClose()
                            })
                        }}
                    >
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}