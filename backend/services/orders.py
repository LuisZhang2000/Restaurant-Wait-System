# file contains services related to my orders page
import json
from datetime import datetime, timedelta
from collections import Counter

def get_orders():
    file = open('data.json')
    data = json.load(file)
    ready_orders = []
    for order in data['orders']:
        items = order['items']
        aggregate = Counter(items)
        # add item id and count in dictionary
        orders = []
        for count in aggregate.most_common():
            orders.append({
                'itemId': count[0],
                'quantity': count[1],
            })
        # add item name and price to the orders list of dicts
        for orders_item in orders:
            for item in data['items']:
                if orders_item['itemId'] == str(item['id']):
                    orders_item['name'] = item['name']
        table_order = {'tableNumber': order['tableNumber'], 'orderItems': orders, 'orderId': order['orderId'], 'status': order['status'], 'timePlaced': order['timePlaced']}
        ready_orders.append(table_order)
    # The orders list displays a list of orders in chronological order, starting with the earliest order and ending with the most recent order.
    return sorted(ready_orders, key = lambda x:int(x['orderId']), reverse = False)
    # return ready_orders

def order_edit(orderId, status):
    file = open('data.json')
    data = json.load(file)
    for order in data['orders']:
        if str(order['orderId']) == orderId:
            order['status'] = status
    # save data
    file.close()
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Edited Successfully", 200

def get_ready_orders():
    """Return the array of ready orders
    """
    file = open('data.json')
    data = json.load(file)
    return data['orders-ready']

def delete_orders_item(tableNumber, itemId):
    """Given an itemId for a tableNumber, remove that item from the orders list for that table

    Args:
        tableNumber (int): # of table number orders list to modify
        itemId (int): id of item to delete
    """
    tableNumber = str(tableNumber)
    itemId = str(itemId)
    file = open('data.json')
    data = json.load(file)
    for orders in data['orders']:
        if orders['tableNumber'] == tableNumber:
            filtered_items = list(filter(lambda i: i != itemId, orders['items']))
            orders['items'] = filtered_items
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def delete_orders_order(tableNumber, orderId):
    """Given an orderId, remove that order from the list

    Args:
        tableNumber (int): # of table number orders list to modify
        orderId (int): id of order to delete
    """
    tableNumber = str(tableNumber)
    file = open('data.json')
    data = json.load(file)
    order_number = None
    for index, order in enumerate(data['orders']):
        if order['orderId'] == orderId and order['tableNumber'] == tableNumber:
            order_number = index
    del data['orders'][order_number]
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def get_orders_for_table(tableNumber):
    """Return the list of items currently in orders list for the table with tableNumber

    Args:
        tableNumber (int): table number of table requested orders list for
    """
    file = open('data.json')
    data = json.load(file)
    items = None
    table_orders = []
    # get the total tally of ordered items (aggregate items)
    for orders in data['orders']:
        if orders['tableNumber'] == str(tableNumber):
            table_order = {key: [] for key in ["itemIds", "quantities", "names"]}
            table_order["price"] = 0
            table_order["orderId"] = orders["orderId"]
            table_order["timePlaced"] = orders["timePlaced"]
            table_order["waitTime"] = 0
            items = orders['items']
            aggregate = Counter(items)
            # add item id and count in dictionary
            
            for count in aggregate.most_common():
                table_order["itemIds"].append(count[0])
                table_order["quantities"].append(count[1])
            
            # add item name and price to the orders list of dicts
            for i, id in enumerate(table_order["itemIds"]):
                quantity = table_order["quantities"][i] 
                for item in data['items']:
                    if id == str(item['id']):
                        table_order['names'].append(item['name'])
                        table_order['price'] += (float(item['price']) * quantity)
                        if float(item['waitTime']) > table_order['waitTime']:
                            # finds the highest waitTime out of items in order
                            table_order['waitTime'] = float(item['waitTime'])
            # calculate deliveryTime and waitTime                 
            FMT = "%I:%M %p"
            deliveryTime = datetime.strptime(table_order['timePlaced'], FMT) + timedelta(minutes=table_order['waitTime'])
            table_order['deliveryTime'] = deliveryTime.strftime(FMT)
            current_time = datetime.now().strftime(FMT)
            remaining_wait_time = deliveryTime - datetime.strptime(current_time, FMT)
            remaining_wait_time = remaining_wait_time.total_seconds() / 60 # convert to minutes
            # we change waitTime to remaining wait time, not item's defined wait time anymore
            table_order['waitTime'] = max(remaining_wait_time,0)
            if table_order['waitTime'] == 0:
                # if current time is greater than delivery time, than we assume it's been delivered
                table_order['deliveryTime'] = 'already delivered'
            table_orders.append(table_order)
    return table_orders

def add_item_to_orders(tableNumber, itemId):
    """Add item with itemId to table with tableNumber total order

    Args:
        tableNumber (int): table number of the table the order being added to
        itemId (int): the id of the item being added to order
    """
    file = open('data.json')
    data = json.load(file)
    orders_present = False
    # convert args to string
    tableNumber = str(tableNumber)
    itemId = str(itemId)
    # if orders list already there, append to orders list
    for orders in data['orders']:
        if orders['tableNumber'] == tableNumber:
            orders_present = True
            orders['items'].append(itemId)
    # if orders list not present, make orders for table and append order
    if not orders_present:
        data['orders'].append({
            'tableNumber': tableNumber,
            'items': [itemId],
        })
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Item added to order successfully", 200

def get_number_items_orders(tableNumber):
    """Given tableNumber, find the total number of items in the orders list for that table number

    Args:
        tableNumber (int): the tableNumber of the table the total number of orders items looked for
    """
    file = open('data.json')
    data = json.load(file)
    tableNumber = str(tableNumber)
    number_items = 0
    # search through and find the orders list for that tableNumber
    for orders in data['orders']:
        if orders['tableNumber'] == tableNumber:
            number_items = len(orders['items'])
    # return the number of items
    return number_items
