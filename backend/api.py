# Creating a basic API endpoint for testing

from json import dumps
from flask import Flask, request
from flask_cors import CORS, cross_origin

from services.auth import login_user, register_user
from services.cart import add_item_to_cart, get_cart_for_table, increment_cart_item, decrement_cart_item, delete_cart_item, get_number_items_cart
from services.items import get_items, item_edit, item_delete, set_menu_items
from services.table import get_table_receipt, place_order, place_ready_order, raise_assistance, get_raise_assistance, get_assistance, address_request, complete_request
from services.orders import order_edit, get_orders, add_item_to_orders, get_orders_for_table, delete_orders_item, get_number_items_orders, get_ready_orders, delete_orders_order
from services.categories import add_category, add_item_category, delete_category, get_categories, set_categories, get_categories_for_id

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

api_cors_config = {
    'origins': ['http://localhost:5000']
}

APP = Flask(__name__)
CORS(APP, resources={
    r'/*': api_cors_config,
})

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

# /login
@APP.route('/login', methods=['POST'])
@cross_origin()
def login():
    payload = request.get_json()
    return dumps({
        'data': login_user(payload['username'], payload['password'])
    })

# /register
@APP.route('/register', methods=['POST'])
@cross_origin()
def register():
    payload = request.get_json()
    return register_user(payload['username'], payload['password'], payload['role'])

# /items/get
@APP.route('/items/get')
@cross_origin()
def items_get():
    return dumps({
        'data': get_items()
    })

# /cart/<tableNumber>
@APP.route('/cart/<tableNumber>', methods=['GET'])
@cross_origin()
def cart_get(tableNumber):
    cart = get_cart_for_table(tableNumber)
    return dumps({
        'data': cart,
    })

# /cart/item/add
@APP.route('/cart/item/add', methods=['POST'])
@cross_origin()
def cart_item_add():
    payload = request.get_json()
    return add_item_to_cart(payload['tableNumber'], payload['itemId'])

# cart/item/increment
@APP.route('/cart/item/increment', methods=['POST'])
@cross_origin()
def cart_item_increment():
    payload = request.get_json()
    return increment_cart_item(payload['tableNumber'], payload['itemId'])

# cart/item/decrement
@APP.route('/cart/item/decrement', methods=['POST'])
@cross_origin()
def cart_item_decrement():
    payload = request.get_json()
    return decrement_cart_item(payload['tableNumber'], payload['itemId'])

# cart/item/remove
@APP.route('/cart/item/delete', methods=['POST'])
@cross_origin()
def cart_item_delete():
    payload = request.get_json()
    return delete_cart_item(payload['tableNumber'], payload['itemId'])

# cart/item/number
@APP.route('/cart/item/number/<tableNumber>', methods=['GET'])
@cross_origin()
def cart_item_number(tableNumber):
    number = get_number_items_cart(tableNumber)
    return dumps({
        'data': number,
    })

# table/order
@APP.route('/table/order/<tableNumber>', methods=['POST'])
@cross_origin()
def table_order(tableNumber):
    return place_order(tableNumber)

# table/readyOrder
@APP.route('/table/readyOrder/<tableNumber>', methods=['POST'])
@cross_origin()
def table_ready_order(tableNumber):
    return place_ready_order(tableNumber)

# table/receipt/<tableNumber>
@APP.route('/table/receipt/<tableNumber>', methods=['GET'])
@cross_origin()
def receipt_get(tableNumber):
    receipt = get_table_receipt(tableNumber);
    return dumps({
        'data': receipt,
    })

# /categories/add
@APP.route('/categories/add', methods=['POST'])
@cross_origin()
def categories_add():
    payload = request.get_json()
    return add_category(payload['name'])

# /categories/item/add
@APP.route('/categories/item/add', methods=['POST'])
@cross_origin()
def categories_item_add():
    payload = request.get_json()
    return add_item_category(payload['categoryId'], payload['name'], payload['originalPrice'], payload['waitTime'], payload['ingredients'], payload['extras'], payload['image'], payload['unavailableIngredients'])

# /categories/delete
@APP.route('/categories/delete', methods=['POST'])
@cross_origin()
def categories_delete():
    payload = request.get_json()
    return delete_category(payload['categoryId'])

# /menuItems/set
@APP.route('/menuItems/set', methods=['POST'])
@cross_origin()
def menu_items_set():
    payload = request.get_json()
    return set_menu_items(payload['categoryId'], payload['menuItems'])

# /categories/set
@APP.route('/categories/set', methods=['POST'])
@cross_origin()
def categories_set():
    payload = request.get_json()
    return set_categories(payload['categories'])

# /categories/get
@APP.route('/categories/get', methods=['GET'])
@cross_origin()
def categories_get_all():
    all_categories = get_categories()
    return dumps({
        'data': all_categories,
    })

# /categories/<id>
@APP.route('/categories/<id>', methods=['GET'])
@cross_origin()
def categories_get(id):
    categories = get_categories_for_id(id)
    return dumps({
        'data': categories,
    })  

# /edit/order
@APP.route('/edit/order', methods=['POST'])
@cross_origin()
def edit_order():
    payload = request.get_json()
    print(payload)
    return order_edit(payload['orderId'], payload['status'])

# /edit/item
@APP.route('/edit/item', methods=['POST'])
@cross_origin()
def edit_item():
    payload = request.get_json()
    print(payload)
    return item_edit(payload['id'], payload['name'], payload['originalPrice'], payload['waitTime'], payload['ingredients'], payload['extras'], payload['image'], payload['unavailableIngredients'])
    
# /delete/item
@APP.route('/delete/item', methods=['POST'])
@cross_origin()
def delete_item():
    payload = request.get_json()
    return item_delete(payload['categoryId'], payload['itemId'])

# /orders/<tableNumber>
@APP.route('/orders/<tableNumber>', methods=['GET'])
@cross_origin()
def orders_get(tableNumber):
    orders = get_orders_for_table(tableNumber)
    return dumps({
        'data': orders,
    })    

# /orders/get
@APP.route('/orders/get', methods=['GET'])
@cross_origin()
def orders_get_all():
    return dumps({
        'data': get_orders()
    })    

# /orders/ready/get
@APP.route('/orders/ready/get', methods=['GET'])
@cross_origin()
def orders_ready_get():
    ready_orders = get_ready_orders()
    return dumps({
        'data': ready_orders,
    })

# /orders/item/add
@APP.route('/orders/item/add', methods=['POST'])
@cross_origin()
def orders_item_add():
    payload = request.get_json()
    return add_item_to_orders(payload['tableNumber'], payload['itemId'])

# orders/item/delete
@APP.route('/orders/item/delete', methods=['POST'])
@cross_origin()
def orders_item_delete():
    payload = request.get_json()
    return delete_orders_item(payload['tableNumber'], payload['itemId'])

# orders/order/delete
@APP.route('/orders/order/delete', methods=['POST'])
@cross_origin()
def orders_order_delete():
    payload = request.get_json()
    return delete_orders_order(payload['tableNumber'], payload['orderId'])

# orders/item/number
@APP.route('/orders/item/number/<tableNumber>', methods=['GET'])
@cross_origin()
def orders_item_number(tableNumber):
    number = get_number_items_orders(tableNumber)
    return dumps({
        'data': number,
    })

# assistance/get
@APP.route('/assistance/get', methods=['GET'])
@cross_origin()
def assistance_get():
    requests = get_assistance()
    return dumps({
        'data': requests,
    })

# assistance/raise/tableNumber
@APP.route('/assistance/raise/<tableNumber>', methods=['POST'])
@cross_origin()
def assistance_raise(tableNumber):
    return raise_assistance(tableNumber)

# assistance/get/tableNumber
@APP.route('/assistance/raise/get/<tableNumber>', methods=['GET'])
@cross_origin()
def assistance_raise_get(tableNumber):
    requested = get_raise_assistance(tableNumber)
    return dumps({
        'data': requested,
    })

@APP.route('/order/pickup', methods=['POST'])
@cross_origin()
def order_pickup():
    payload = request.get_json()
    return address_request(payload['tableNumber'], payload['username'], 'orders-ready')

@APP.route('/order/delivered', methods=['POST'])
@cross_origin()
def order_delivered():
    payload = request.get_json()
    return complete_request(payload['tableNumber'], 'orders-ready')

# /assistance/address
@APP.route('/assistance/address', methods=['POST'])
@cross_origin()
def assistance_address():
    payload = request.get_json()
    return address_request(payload['tableNumber'], payload['username'], 'assistance-requests')

# /assistance/addressed
@APP.route('/assistance/addressed', methods=['POST'])
@cross_origin()
def assistance_addressed():
    payload = request.get_json()
    return complete_request(payload['tableNumber'], 'assistance-requests')