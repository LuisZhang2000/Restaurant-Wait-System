import json
from collections import Counter

def get_max_id(type):
    file = open('data.json')
    data = json.load(file)
    new_id = 0
    for section in data[type]:
        value = int(section['id'])
        if value >= new_id:
            new_id = value + 1
    file.close()
    return str(new_id)

def add_category(name):
    """Create a new Category with the given name

    Args:
        name (string): Name of the new category being added
    """
    file = open('data.json')
    data = json.load(file)
    new_id = get_max_id('categories')
    # append new category with name
    data['categories'].append({
        "id": new_id,
        "name": str(name),
        "items": [],
    })
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def add_item_category(categoryId, name, originalPrice, waitTime, ingredients, extras, image, unavailableIngredients):
    """Given the item attributes, create a new item with new id and 
        add it to 1. Items array and 2. Category items list

    Args:
        categoryId (string): id of category being added to
        name (string): proposed name of item
        originalPrice (string): proposed price of item
        ingredients (array): list of ingredients
        extras (array): list of extra ingredients
    """
    file = open('data.json')
    data = json.load(file)
    new_id = get_max_id('items')
    categoryId = str(categoryId)
    # add item profile to items array
    data['items'].append({
        "id": int(new_id),
        "name": name,
        "originalPrice": float(originalPrice),
        "waitTime": float(waitTime),
        "image": image,
        "ingredients": ingredients,
        "extras": extras,
        "available": True,
        "unavailableIngredients": unavailableIngredients,
        "price": float(originalPrice) - len(list(set(ingredients).intersection(unavailableIngredients))) #current price after unavailable ingredients have been considered
    })
    # add item id to items array in appropriate category
    for category in data['categories']:
        if str(category['id']) == categoryId:
            category['items'].append(new_id)
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def delete_category(id):
    """Delete the category with the given id

    Args:
        id (string): id of the category being deleted
    """
    file = open('data.json')
    data = json.load(file)
    for category in data['categories']:
        if str(category['id']) == str(id):
            data['categories'].remove(category)
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def get_categories():
    """Return all categories
    """
    file = open('data.json')
    data = json.load(file)
    return data['categories']

def set_categories(categories):
    """Set the new categories list
    """
    file = open('data.json')
    data = json.load(file)
    data['categories'] = categories
    file.close()
    # save data
    file = open('data.json', 'w')
    json.dump(data, file, indent=4)
    return "Success", 200

def get_categories_for_id(id):
    file = open('data.json')
    data = json.load(file)
    items = None
    # get the total tally of ordered items (aggregate items)
    for categories in data['categories']:
        if categories['id'] == str(id):
            items = categories['items']
    aggregate = Counter(items)
    # add item id and count in dictionary
    categories = []
    for count in aggregate.most_common():
        categories.append({
            'id': count[0],
        })
    # add item name and price to the categories list of dicts
    for categories_item in categories:
        for item in data['items']:
            if categories_item['id'] == str(item['id']):
                categories_item['name'] = item['name']
                categories_item['price'] = item['price']
                categories_item['waitTime'] = item['waitTime']
                categories_item['image'] = item['image']
                categories_item['ingredients'] = item['ingredients']
                categories_item['extras'] = item['extras']
                categories_item['available'] = item['available']
                categories_item['unavailableIngredients'] = item['unavailableIngredients']
                categories_item['originalPrice'] = item['originalPrice']
    return categories