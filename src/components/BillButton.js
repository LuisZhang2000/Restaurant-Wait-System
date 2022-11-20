import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap"
import { getTableReceipt } from '../endpoints/table';

export function BillButton({tableNumber}){ 
    const [totalBill, setTotalBill] = useState(0);
    const [loadingBill, setLoadingBill] = useState(false);
    const [showBillModal, setShowBillModal] = useState(false);

    const billClose = () => {
        setShowBillModal(false);
    }

    return (
        <>
            <Button
                className = "m-3"
                disabled={loadingBill}
                onClick={() => {
                    setLoadingBill(true);
                    getTableReceipt(tableNumber)
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            return null
                        }
                    })
                    .then((data) => {
                        setTotalBill(data.data);
                        })
                        .then(() => {
                            setLoadingBill(false);
                            setShowBillModal(true);
                    })
                }}
            >
                Bill
            </Button>
            <Modal show={showBillModal} onHide={billClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Digital Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Total amount payable: { `$${totalBill}` }
                    <br/> <br/>
                    To settle the bill for Table {tableNumber}, <strong>please 
                    pay at the counter. </strong> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={billClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}