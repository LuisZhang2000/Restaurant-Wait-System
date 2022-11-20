import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';
import { markOrderPickedUp, markOrderDelivered } from '../endpoints/order';
import { markAssistanceAddress, markAssistanceCompleted } from '../endpoints/table';

export const PageTitle = ({ title }) => {
    return (
        <Navbar className="bg-light mb-2">
            <div className="d-flex flex-column w-100">
                <div className="d-flex flex-row w-100 justify-content-center">
                    <h3 className='mt-2'>
                        { title }
                    </h3>
                </div>
            </div>
        </Navbar>
    );
}

export const DisplayTotalAmount = ({ type, amount }) => {
    return (
        <div className="d-flex justify-content-center">
            <span style={{ "fontSize": "20px", "marginTop": "30px" }} className="text-muted">
                <b>
                    { type } Total: { amount }
                </b>
            </span>
        </div>
    )
}

export const NotificationCard = ({ position, type, username, tableNumber, status }) => {
    const beingResolvedBy = status.split(' ').pop();
    
    return (
        <Card key={position} style={{ 'width': '90%', 'margin': 'auto', 'marginTop': '20px' }}>
            <Card.Header>
                Table: { tableNumber }
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    Status: { status }
                </Card.Title>
                <Card.Body className="d-flex justify-content-around">
                    <Button
                        size='lg'
                        variant='warning'
                        disabled={(type === 'assistance' && status !== 'Unresolved') || (type === 'orders' && status !== 'Pickup ready')}
                        style={{ 'width': '50%', 'marginRight': '5%' }}
                        onClick={() => {
                            if (type === 'assistance') {
                                markAssistanceAddress(tableNumber, username);
                            } else {
                                markOrderPickedUp(tableNumber, username);
                            }
                        }}
                    >
                        {
                            type === 'assistance' ? 'Address' : 'Pick Up'
                        }
                    </Button>
                    <Button
                        size='lg'
                        variant='success'
                        disabled={(type === 'assistance' && status === 'Unresolved') || (type === 'orders' && (status === 'Pickup ready' || (beingResolvedBy !== 'ready' && username !== beingResolvedBy)))}
                        style={{ 'width': '50%' }}
                        onClick={() => {
                            if (type === 'assistance') {
                                markAssistanceCompleted(tableNumber);
                            } else {
                                markOrderDelivered(tableNumber);
                            }
                        }}
                    >
                        {
                            type === 'assistance' ? 'Mark Addressed' : 'Delivered'
                        }
                    </Button>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}