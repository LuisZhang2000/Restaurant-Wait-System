import pytest
import services.auth as auth
import services.orders as orders
import services.items as items
import services.table as table

# need a clear all to clear everything

def test_auth():
    # username and password not registered
    assert auth.login_user('NoName1','NoPassword1')==('Record not found', 400)
    assert auth.login_user('NoName2','NoPassword2')==('Record not found', 400)
    assert auth.login_user('x','xx')==('Record not found', 400)

    # success login
    # register
    res = auth.register_user('abc@gmail.com', 'wordpass', 'whatever')
    assert res == ('Success', 200) or res == ('Account already exists', 400)
    # wrong password
    assert auth.login_user('abc@gmail.com','password') == ('Record not found', 400)
    # correct login info
    res = auth.login_user('abc@gmail.com','wordpass')
    del res['token']
    # login successfully, return info dic
    assert res == {'username': 'abc@gmail.com', 'role': 'whatever'}
    
    # success login
    # register
    res = auth.register_user('123@gmail.com', 'yoohoo', 'manager')
    assert res==('Success', 200) or res==('Account already exists', 400)
    # wrong password
    assert auth.login_user('123@gmail.com','xxx')==('Record not found', 400)
    # correct login info
    res=auth.login_user('123@gmail.com','yoohoo')
    del res['token']
    # login successfully, return info dic
    assert res=={'username': '123@gmail.com', 'role': 'manager'}
    
def test_items():
    res = items.get_items()
    assert res == [{'id': 1, 'name': 'Salad', 'price': '10.99', 'imgUrl': '/imgs/salad.jpg', 'ingredients': ['Apple', 'Strawberry', 'Kiwi Fruit', 'Blackberry', 'Grapes'], 'extras': ['Olive', 'Cucumber', 'Tomato'], 'available': True}, {'id': 2, 'name': 'Chicken Wings', 'price': '15.00', 'imgUrl': '/imgs/chicken_wings.jpg', 'ingredients': ['I1', 'I2'], 'extras': ['E1', 'E2'], 'available': False}, {'id': 3, 'name': 'Chicken Caesar Wrap', 'price': '14.00', 'imgUrl': '/imgs/wrap.jpg', 'ingredients': ['Chicken', 'Lettuce', 'Egg', 'Tomato', 'Cheese', 'Onion'], 'extras': ['Bacon', 'Avocado', 'Extra Cheese', 'Extra Egg', 'Extra Fillet'], 'available': False}, {'id': 4, 'name': 'Meatballs', 'price': '15.00', 'imgUrl': '/imgs/meatballs.jpg', 'ingredients': ['I1', 'I2'], 'extras': ['E1', 'E2'], 'available': False}, {'id': 5, 'name': 'Burger', 'price': '15.00', 'imgUrl': '/imgs/burger.jpg', 'ingredients': ['Beef', 'Cheese', 'Onions', 'Tomato', 'Ketchup'], 'extras': ['Lettuce', 'Bacon', 'Pickle'], 'available': False}, {'id': 6, 'name': 'Fish and Chips', 'price': '15.00', 'imgUrl': '/imgs/fish_and_chips.jpg', 'ingredients': ['I1', 'I2'], 'extras': ['E1', 'E2'], 'available': True}, {'id': 7, 'name': 'Pasta', 'price': '20.00', 'imgUrl': '/imgs/pasta.jpg', 'ingredients': ['I1', 'I2'], 'extras': ['E1', 'E2'], 'available': True}, {'id': 8, 'name': 'Pizza', 'price': '20.00', 'imgUrl': '/imgs/pizza.jpg', 'ingredients': ['I1', 'I2'], 'extras': ['E1', 'E2'], 'available': False}]

def test_orders_plain():
    res = orders.get_orders()
    assert res == [{'tableNumber': '16', 'orderItems': [{'itemId': '1', 'quantity': 3, 'name': 'Salad'}, {'itemId': '6', 'quantity': 3, 'name': 'Fish and Chips'}]}, {'tableNumber': '12', 'orderItems': [{'itemId': '1', 'quantity': 7, 'name': 'Salad'}]}, {'tableNumber': '32', 'orderItems': [{'itemId': '1', 'quantity': 5, 'name': 'Salad'}, {'itemId': '6', 'quantity': 2, 'name': 'Fish and Chips'}, {'itemId': '7', 'quantity': 2, 'name': 'Pasta'}]}, {'tableNumber': '2', 'orderItems': [{'itemId': '1', 'quantity': 5, 'name': 'Salad'}, {'itemId': '7', 'quantity': 1, 'name': 'Pasta'}]}, {'tableNumber': '9', 'orderItems': [{'itemId': '1', 'quantity': 2, 'name': 'Salad'}]}, {'tableNumber': '2', 'orderItems': [{'itemId': '1', 'quantity': 2, 'name': 'Salad'}]}, {'tableNumber': '5', 'orderItems': [{'itemId': '1', 'quantity': 1, 'name': 'Salad'}]}]
    
    res = orders.get_ready_orders()
    assert res == [{'tableNumber': '8', 'status': 'Pickup ready'}, {'tableNumber': '11', 'status': 'Pickup ready'}]