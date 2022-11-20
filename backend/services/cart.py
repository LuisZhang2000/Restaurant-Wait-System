# file contains services related to cart
import json
from collections import Counter

def increment_cart_item(tableNumber, itemId):
    """Given tableNumber and itemId, increment the amount of items by 1 in cart

    Args:
        tableNumber (int): # of table number cart to modify
        itemId (int): id of item to increment
    """
    tableNumber = str(tableNumber)
    itemId = str(itemId)
    file = open('data.json')
    data = json.load(file)
    for cart in data['cart']:
        if cart['tableNumber'] == tableNumber:
            cart['items'].append(itemId)
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200
    

def decrement_cart_item(tableNumber, itemId):
    """Given tableNumber and itemId, decrement the amount of items by 1 in cart
        If decrement results in <= 0, remove item from cart

    Args:
        tableNumber (int): # of table number cart to modify
        itemId (int): id of item to decrement
    """
    tableNumber = str(tableNumber)
    itemId = str(itemId)
    file = open('data.json')
    data = json.load(file)
    for cart in data['cart']:
        if cart['tableNumber'] == tableNumber:
            cart['items'].remove(itemId)
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def delete_cart_item(tableNumber, itemId):
    """Given an itemId for a tableNumber, remove that item from the cart for that table

    Args:
        tableNumber (int): # of table number cart to modify
        itemId (int): id of item to decrement
    """
    tableNumber = str(tableNumber)
    itemId = str(itemId)
    file = open('data.json')
    data = json.load(file)
    for cart in data['cart']:
        if cart['tableNumber'] == tableNumber:
            filtered_items = list(filter(lambda i: i != itemId, cart['items']))
            cart['items'] = filtered_items
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def get_cart_for_table(tableNumber):
    """Return the list of items currently in cart for the table with tableNumber

    Args:
        tableNumber (int): table number of table requested cart for
    """
    file = open('data.json')
    data = json.load(file)
    items = None
    # get the total tally of ordered items (aggregate items)
    for cart in data['cart']:
        if cart['tableNumber'] == str(tableNumber):
            items = cart['items']
    aggregate = Counter(items)
    cnt_sorted = sorted(aggregate.items(), key=lambda x:x[0])
    # add item id and count in dictionary
    cart = []
    for count in cnt_sorted:
        cart.append({
            'itemId': count[0],
            'quantity': count[1],
        })
    # add item name and price to the cart list of dicts
    for cart_item in cart:
        for item in data['items']:
            if cart_item['itemId'] == str(item['id']):
                cart_item['name'] = item['name']
                cart_item['price'] = item['price']
    return cart

def add_item_to_cart(tableNumber, itemId):
    """Add item with itemId to table with tableNumber total order

    Args:
        tableNumber (int): table number of the table the order being added to
        itemId (int): the id of the item being added to order
    """
    file = open('data.json')
    data = json.load(file)
    cart_present = False
    # convert args to string
    tableNumber = str(tableNumber)
    itemId = str(itemId)
    # if cart already there, append to cart
    for cart in data['cart']:
        if cart['tableNumber'] == tableNumber:
            cart_present = True
            cart['items'].append(itemId)
    # if cart not present, make cart for table and append order
    if not cart_present:
        data['cart'].append({
            'tableNumber': tableNumber,
            'items': [itemId],
        })
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Item added to order successfully", 200

def get_number_items_cart(tableNumber):
    """Given tableNumber, find the total number of items in the cart for that table number

    Args:
        tableNumber (int): the tableNumber of the table the total number of cart items looked for
    """
    file = open('data.json')
    data = json.load(file)
    tableNumber = str(tableNumber)
    number_items = 0
    # search through and find the cart for that tableNumber
    for cart in data['cart']:
        if cart['tableNumber'] == tableNumber:
            number_items = len(cart['items'])
    # return the number of items
    return number_items
