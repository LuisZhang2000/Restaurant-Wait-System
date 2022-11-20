# file contains all services for items
import json

def get_items():
    file = open('data.json')
    data = json.load(file)
    items = data['items']
    for i, item in enumerate(items):
        price = items[i]['price']
        items[i]['price'] = f"{price:.2f}"
    return items

def item_edit(id, name, originalPrice, waitTime, ingredients, extras, image, unavailableIngredients):
    """Update the item with the id with new fields

    Args:
        id (string): id of the item being edited
        name (string): new name of the item
        price (float): new price of the item
        ingredients (array): new list of ingredients
        extras (array): new list of extras

    Returns:
        HTTP status: 200 if edited successfully
    """
    file = open('data.json')
    data = json.load(file)
    for item in data['items']:
        if str(item['id']) == str(id):
            item['name'] = name
            item['originalPrice'] = originalPrice
            item['price'] = float(item['originalPrice']) - len(list(set(ingredients).intersection(unavailableIngredients)))
            item['waitTime'] = waitTime
            item['image'] = image
            item['ingredients'] = ingredients
            item['extras'] = extras
            item['unavailableIngredients'] = unavailableIngredients
    # save data
    file.close()
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Edited Successfully", 200

def item_delete(categoryId, itemId):
    file = open('data.json')
    data = json.load(file)
    itemId = str(itemId)
    # remove item from category
    for category in data['categories']:
        if str(category['id']) == str(categoryId):
            category['items'].remove(itemId)
    # save data
    file.close()
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Removed Successfully", 200

def set_menu_items(categoryId, menuItems):
    """For the category with the given categoryId, update the list of menuItems

    Args:
        categoryId (string): categoryId of the category, list being updated for
        menuItems (array): order of new menu items
    """
    file = open('data.json')
    data = json.load(file)
    new_order = []
    for item in menuItems:
        new_order.append(item['id'])
    for category in data['categories']:
        if str(category['id']) == str(categoryId):
            category['items'] = new_order
    # save data
    file.close()
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Set Successfully", 200