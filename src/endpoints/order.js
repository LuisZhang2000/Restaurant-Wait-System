export async function updateStatus(newOrder) {
    return fetch('http://127.0.0.1:5000/edit/order', {
        method: 'POST',
        mode: 'cors',
        headers: {  
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "orderId": newOrder.orderId,
            "status": newOrder.status,
        })
    });
}

export async function getOrders() {
    return fetch(`http://127.0.0.1:5000/orders/get`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function getOrdersReady() {
    return fetch('http://127.0.0.1:5000/orders/ready/get', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}


export async function placeReadyOrderForTable(tableNumber) {
    return fetch(`http://127.0.0.1:5000/table/readyOrder/${tableNumber}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function requestOrdersForTable(tableNumber) {
    return fetch(`http://127.0.0.1:5000/orders/${tableNumber}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function markOrderPickedUp(tableNumber, username) {
    return fetch('http://127.0.0.1:5000/order/pickup', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            'tableNumber': tableNumber,
            'username': username,
        })
    });
}

export async function markOrderDelivered(tableNumber) {
    return fetch('http://127.0.0.1:5000/order/delivered', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            'tableNumber': tableNumber,
        })
    });
}

export async function modifyOrderCount(tableNumber, orderId, modification) {
    return fetch(`http://127.0.0.1:5000/orders/order/${modification}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            tableNumber: tableNumber,
            orderId: orderId,
        })
    });
}