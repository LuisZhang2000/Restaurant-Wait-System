import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StaffNavbar } from '../components/StaffNavbar';
import { NotificationCard } from '../components/CommonComponents';
import { getOrdersReady } from '../endpoints/order';
import { getAssistanceRequests } from '../endpoints/table';

export const Section = ({ text }) => {
    return (
        <div style={{ 'marginTop': '18px', 'width': '170px', 'fontWeight': 'normal', 'fontSize': '18px', 'margin': 'auto' }}>
            { text }
        </div>
    )
}

export const Waitstaff = () => {
    const params = useParams();
    const username = params.username;
    const [readyOrders, setReadyOrders] = useState([]);
    const [assistanceRequests, setAssistanceRequests] = useState([]);
    
    // poll the server every 1.5 second to get any new raised requests/orders ready notifications
    useEffect(() => {
        const polling = setInterval(() => {
            getAssistanceRequests()
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                setAssistanceRequests(data.data)
            })
            getOrdersReady()
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                setReadyOrders(data.data)
            })
        }, 1500);

        return () => clearInterval(polling);
    }, []);

    return (
        <>
            <StaffNavbar username={username} role="Waitstaff"/>
            <div className="d-flex justify-content-around bg-light" style={{ 'height': '60px' }}>
                <Section text="Assistance Needed"/>
                <Section text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Orders Ready"/>
            </div>
            <div className="d-flex justify-content-around">
                <div className="d-flex flex-column" style={{ 'width': '50%' }}>
                    {
                        assistanceRequests.map((item, index) => {
                            return (
                                <NotificationCard position={index} type="assistance" username={username} tableNumber={item.tableNumber} status={item.status}/>
                            )
                        })
                    }
                </div>
                <div className="d-flex flex-column" style={{ 'width': '50%' }}>
                    {
                        readyOrders.map((item, index) => {
                            return (
                                <NotificationCard position={index} type="orders" username={username} tableNumber={item.tableNumber} status={item.status}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}