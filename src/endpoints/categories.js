export async function getAllCategories() {
    return fetch('http://127.0.0.1:5000/categories/get', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function getCategoryItems(id) {
    return fetch(`http://127.0.0.1:5000/categories/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function setNewMenuItems(categoryId, menuItems) {
    return fetch('http://127.0.0.1:5000/menuItems/set', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "categoryId": categoryId,
            "menuItems": menuItems,
        })
    });
}

export async function setNewCategories(categories) {
    return fetch('http://127.0.0.1:5000/categories/set', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            'categories': categories,
        }),
    });
}

export async function addNewCategory(name) {
    return fetch('http://127.0.0.1:5000/categories/add', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            'name': name,
        }),
    });
}

export async function deleteCategory(categoryId) {
    return fetch('http://127.0.0.1:5000/categories/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            'categoryId': categoryId,
        }),
    });
}