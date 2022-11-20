# file contains all helper code for logging in user
import uuid
import json

def login_user(username, password):
    """authenticate user through username and password

    Args:
        username (string): username of logging in user
        password (string): password of logging in user

    Returns:
        string: token if user valid, 'null' if user invalid
    """
    file = open('data.json')
    data = json.load(file)
    # check if user in data file
    for user in data['users']:
        if user['username'] == username and user['password'] == password:
            return {
                'username': user['username'],
                'token': user['token'],
                'role': user['role'],
            }
    # return null for invalid user
    return "Record not found", 400

def register_user(username, password, role):
    """authorize user through username and password

    Args:
        username (string): username of registering user
        password (string): password of registering user
        role (string): role selected by registering user

    Returns:
        HTTP response: success (200) if account made successfully, failure (400) if account already made
    """
    file = open('data.json')
    data = json.load(file)
    # check if user in data file
    for user in data['users']:
        if user['username'] == username and user['password'] == password:
            return "Account already exists", 400
    file.close()
    file = open('data.json', 'w')
    data['users'].append({
        'username': username,
        'password': password,
        'role': role,
        'token': str(uuid.uuid4()),
    })
    # save data
    json.dump(data, file, indent=4)
    # return null for invalid user
    return "Success", 200