# this file contains all services for table
import json
from datetime import datetime

def place_order(tableNumber):
    """Given the tableNumber, order all times in cart to data file
        and remove all items from cart    

    Args:
        tableNumber (int): tableNumber of table placed order for
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    order = {}
    cart_number = None
    for index, cart in enumerate(data['cart']):
        if cart['tableNumber'] == tableNumber:
            cart_number = index
            order = cart
    # remove cart from data['cart']
    del data['cart'][cart_number]
    orderId = 0
    for orders in data['orders']:
        if int(orders['orderId']) > orderId:
            orderId = int(orders['orderId'])
    orderId += 1
    order['orderId'] = str(orderId)
    now = datetime.now()
    order['timePlaced'] = now.strftime("%I:%M %p")
    order['status'] = "Pending"
    # add cart to orders in data
    data['orders'].append(order)
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def place_ready_order(tableNumber):
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    ready_order = {}
    order_number = None
    for index, order in enumerate(data['orders']):
        if order['tableNumber'] == tableNumber:
            order_number = index
            ready_order = order
    # remove order from data['orders']
    del data['orders'][order_number]
    ready_order['status'] = "Pickup ready"
    # add cart to orders in data
    data['orders-ready'].append(ready_order)
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def get_table_receipt(tableNumber):
    """Given the tableNumber, calculate the total price of the table's orders

    Args:
        tableNumber (int): tableNumber of the table receipt requested for
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    total_items = []
    for order in data['orders']:
        if order['tableNumber'] == tableNumber:
            total_items += order['items']
    # calculate total price for items
    total_price = 0
    for ordered_item in total_items:
        for item in data['items']:
            if item['id'] == int(ordered_item):
                total_price += float(item['price'])
    # return total amount
    return round(total_price, 2)

def raise_assistance(tableNumber):
    """Given the tableNumber, add an assistance needed request for table
        in database file

    Args:
        tableNumber (int): tableNumber of table requested assistance for
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    data['assistance-requests'].append({
        'tableNumber': tableNumber,
        'status': 'Unresolved',
    })
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def get_assistance():
    """Return the list of all assistance requests
    """
    file = open('data.json')
    data = json.load(file)
    return data['assistance-requests']

def get_raise_assistance(tableNumber):
    """Given the tableNumber, return true if table needs assistance,
        otherwise return false 

    Args:
        tableNumber (int): tableNumber of table requested assistance for
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    requested = False
    for request in data['assistance-requests']:
        if request['tableNumber'] == tableNumber:
            requested = True
    return requested

def address_request(tableNumber, username, type):
    """Given the tableNumber, mark the type of request (assistance or order ready) as 'being addressed by username'

    Args:
        tableNumber (int): table number assistance being addressed for
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    for request in data[type]:
        if request['tableNumber'] == tableNumber:
            if type == 'assistance-requests':
                request['status'] = f"being addressed by {username}"
            else:
                request['status'] = f"picked up by {username}"
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def complete_request(tableNumber, type):
    """Given the tableNumber, remove the type of request raised (assistance or order ready) for this table

    Args:
        tableNumber (int): table number assistance being removed for
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    new_requests = list(filter(lambda request: request['tableNumber'] != tableNumber, data[type]))
    data[type] = new_requests
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200