import React, { useState } from 'react'
import { Button, Card, Modal } from "react-bootstrap"
import { formatCurrency } from '../utilities/formatCurrency'
import { useSnackbar } from 'notistack';
import { modifyItemCount } from '../endpoints/items';

export function CartItem({ index, tableNumber, itemId, quantity, name, price, changed, setChanged }) {
    const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);

    const removeItemClose = () => {
        setShowRemoveItemModal(false);
    }

    const { enqueueSnackbar } = useSnackbar();

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline">
                    <div className="me-auto">
                        <div className="fs-4">{name}</div>
                        <div className="text-muted" style={{ fontSize: "1rem"}}>{formatCurrency(price)}</div>
                    </div>
                    <div style={{ width: 180 }}>
                        <Button
                            name={`decrement-item-${index + 1}`}
                            onClick={() => {
                                if (quantity < 2) {
                                    setShowRemoveItemModal(true);
                                } else {
                                    enqueueSnackbar('Removed from cart', { variant: 'success' })
                                    modifyItemCount(tableNumber, itemId, 'decrement')
                                        .then(() => {
                                            setChanged(changed => changed + 1);
                                        })
                                }
                            }}
                        >
                            -
                        </Button>
                        <span className="fs-4 p-3">{quantity}</span>
                        <Button
                            name={`increment-item-${index + 1}`}
                            onClick={() => {
                                enqueueSnackbar('Added to cart', { variant: 'success' })
                                modifyItemCount(tableNumber, itemId, 'increment')
                                    .then(() => {
                                        setChanged(changed => changed + 1);
                                    })
                            }}
                        >
                            +
                        </Button>
                    </div>
                    <span style={{ width: 150 }} className="text-muted">{formatCurrency(price * quantity)}</span>
                    <Button
                        className="btn-danger"
                        onClick={() => {
                            setShowRemoveItemModal(true);
                        }}
                    >
                        X
                    </Button>
                    <Modal show={showRemoveItemModal} onHide={removeItemClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Remove Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to remove {name}?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={removeItemClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    enqueueSnackbar('Removed from cart', { variant: 'success' })
                                    modifyItemCount(tableNumber, itemId, 'delete')
                                    .then(() => {
                                        setChanged(changed => changed + 1);
                                    })
                                    .then(() => {
                                        removeItemClose()
                                    })
                                }}
                            >
                                Remove Item
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}