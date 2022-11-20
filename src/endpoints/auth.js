export async function login(username, password) {
    return fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
}

export async function register(username, password, role) {
    return fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            role: role,
        })
    });
}