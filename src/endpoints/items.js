export async function deleteItem(categoryId, itemId) {
    return fetch(`http://127.0.0.1:5000/delete/item`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "categoryId": categoryId,
            "itemId": itemId,
        })
    });
}

export async function sendEditItem(newItem) {
    return fetch('http://127.0.0.1:5000/edit/item', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "id": newItem.id,
            "name": newItem.name,
            "originalPrice": newItem.originalPrice,
            "waitTime": newItem.waitTime,
            "ingredients": newItem.ingredients,
            "extras": newItem.extras,
            "image": newItem.image,
            "unavailableIngredients": newItem.unavailableIngredients,
        })
    });
}

export async function addItemToCategory(categoryId, item) {
    return fetch('http://127.0.0.1:5000/categories/item/add', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "categoryId": categoryId,
            "name": item.name,
            "originalPrice": item.originalPrice,
            "waitTime": item.waitTime,
            "ingredients": item.ingredients,
            "extras": item.extras,
            "image": item.image,
            "unavailableIngredients" : item.unavailableIngredients,
        })
    });
}

export async function modifyItemCount(tableNumber, itemId, modification) {
    return fetch(`http://127.0.0.1:5000/cart/item/${modification}`, {
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