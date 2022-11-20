import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Button, Modal } from 'react-bootstrap'
import { useSnackbar } from 'notistack';
import { Navbar } from '../components/Navbar';
import { CartItem } from '../components/CartItem';
import { BillButton } from "../components/BillButton"
import { PageTitle } from '../components/CommonComponents';
import { formatCurrency } from "../utilities/formatCurrency";
import { DisplayTotalAmount } from "../components/CommonComponents";
import { placeOrderForTable, requestItemsForTable } from "../endpoints/table";
import { getCartItemsNumber } from "../endpoints/cart";

export const Cart = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const tableNumber = params.tableNumber;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cartItems, setCartItems] = useState([]);
    const [changed, setChanged] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    // request all the food items in this table's 'in cart'
    useEffect(() => {
        requestItemsForTable(tableNumber)
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
                const items = data.data; 
                setCartItems(items);
                // get the total($) of all cart items
                const total = items.reduce((previousValue, currentValue) =>
                    parseFloat(currentValue.price) * parseFloat(currentValue.quantity) + previousValue,
                    0
                );
                setCartTotal(formatCurrency(total));
            }
        })
        getCartItemsNumber(tableNumber)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setCartItemsNumber(data.data)
            } else {
                setCartItemsNumber(0);
            }
        })
    }, [changed]);

    return (
        <>
            <Navbar tableNumber={tableNumber} cartItemsNumber={cartItemsNumber} disableTableEdit={true}/>
            <PageTitle title="My Cart"/>
            <Container>
                {
                    cartItems.length === 0 ?
                    <div>
                        No items added yet.
                    </div> :
                    <Row>
                        <Col>
                            {cartItems && cartItems.map((item, index) => (
                                <Row className="mt-4">
                                    <CartItem key={index} index={index} tableNumber={tableNumber} changed={changed} setChanged={setChanged} {...item}/>
                                </Row>
                            ))}   
                        </Col>
                    </Row>
                }
            </Container>
            <DisplayTotalAmount type="Cart" amount={cartTotal} />
            <div className="d-flex justify-content-center mt-3">
                <Button
                    name="back-to-menu-button"
                    className= "m-3"
                    onClick={() => {
                        navigateTo('/');
                    }}
                >
                    Back to Menu
                </Button>
                <Button
                    name="place-order-button"
                    className= "m-3"
                    onClick={handleShow}
                    disabled ={cartItemsNumber === 0}
                >
                    Place Order
                </Button>
                <BillButton tableNumber={tableNumber} />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you ready to place your order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        name="confirm-place-order-button"
                        variant="success"
                        onClick={() => {
                            enqueueSnackbar('Order successfully placed', { variant: 'success' })
                            placeOrderForTable(tableNumber)
                            .then(() => {
                                setChanged(changed => changed + 1)
                            })
                            .then(() => {
                                handleClose()
                            })
                        }}
                    >
                        Place Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}