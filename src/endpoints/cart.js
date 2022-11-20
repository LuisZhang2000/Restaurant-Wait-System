export async function getCartItemsNumber(tableNumber) {
    return fetch(`http://127.0.0.1:5000/cart/item/number/${tableNumber}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function addItemToCart(tableNumber, itemId) {
    return fetch('http://127.0.0.1:5000/cart/item/add', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            tableNumber: tableNumber,
            itemId: itemId,
        })
    });
}
