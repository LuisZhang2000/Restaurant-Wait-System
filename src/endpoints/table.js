export async function placeOrderForTable(tableNumber) {
    return fetch(`http://127.0.0.1:5000/table/order/${tableNumber}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function requestItemsForTable(tableNumber) {
    return fetch(`http://127.0.0.1:5000/cart/${tableNumber}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function getAssistanceRequests() {
    return fetch('http://127.0.0.1:5000/assistance/get', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function markAssistanceAddress(tableNumber, username) {
    return fetch('http://127.0.0.1:5000/assistance/address', {
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

export async function markAssistanceCompleted(tableNumber) {
    return fetch('http://127.0.0.1:5000/assistance/addressed', {
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

export async function getTableReceipt(tableNumber) {
    return fetch(`http://127.0.0.1:5000/table/receipt/${tableNumber}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function raiseAssistance(tableNumber) {
    return fetch(`http://127.0.0.1:5000/assistance/raise/${tableNumber}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function getAssistanceRaised(tableNumber) {
    return fetch(`http://127.0.0.1:5000/assistance/raise/get/${tableNumber}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}