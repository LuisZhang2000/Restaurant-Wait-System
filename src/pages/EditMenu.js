import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StaffNavbar } from '../components/StaffNavbar';
import { PageTitle } from '../components/CommonComponents';
import { InputGroup, Modal, Button, Card, Container, Row } from 'react-bootstrap';
import { List, arrayMove } from 'react-movable';
import { getCategoryItems, setNewMenuItems } from '../endpoints/categories';
import { deleteItem, sendEditItem, addItemToCategory } from '../endpoints/items';

export const EditMenu = () => {
    const params = useParams();
    const token = params.token;
    const username = params.username;
    const category = params.category;
    const categoryId = params.categoryId;
    const navigateTo = useNavigate();
    const [, setRender] = useState(0);
    const [fetch, setFetch] = useState(0);
    const [editItem, setEditItem] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [addIngredient, setAddIngredient] = useState(null);
    const [extraIngredient, setExtraIngredient] = useState(null);
    const [unavailableIngredient, setUnavailableIngredient] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [value, setValue]  = useState(null);

    useEffect(() => {
        getCategoryItems(categoryId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setMenuItems(data.data);
            }
        });
    }, [fetch]);

    // used for re-ordering the menu items and saving it in the backend
    useEffect(() => {
        if (menuItems.length !== 0) {
            setNewMenuItems(categoryId, menuItems);
        }
    }, [menuItems]);

    return (
        <>
            <StaffNavbar username={username} role="Manager"/>
            <PageTitle title={`${category} Items`}/>
            <div className="d-flex justify-content-centre">
                <Button
                    name="back-to-categories-button"
                    className="mt-2"
                    style={{ "margin": "auto" }}
                    onClick={() => {
                        navigateTo(`/manager/${username}/${token}`)
                    }}
                >
                    { "Back to Categories" }
                </Button>
            </div>
            <Modal show={showDeleteCategoryModal} onHide={() => setShowDeleteCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove {value && value.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={() => 
                        setShowDeleteCategoryModal(false)}
                        >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteItem(categoryId, value && value.id)
                            .then(() => {
                                setFetch(fetch => fetch + 1);
                            })
                            .then(() => { 
                                setShowDeleteCategoryModal(false);
                            })
                        }}
                    >
                        Remove Item
                    </Button>
                </Modal.Footer>
            </Modal> 
            {
                menuItems.length !== 0 && 
                
                <List
                    values={menuItems}
                    onChange={({ oldIndex, newIndex }) => {
                        setMenuItems(arrayMove(menuItems, oldIndex, newIndex));
                    }}
                    renderList={({ children, props }) => 
                        <Container style={{ 'width': '60%' }} {...props}>
                            { children }
                        </Container>
                    }
                    renderItem={({ value, props }) => 
                        <Row className="mt-3 mb-3" {...props}>
                            <Card className="h-100" {...props} style={{ "width": "49%", "height": "50%", "margin": "auto" }}>
                                <Card.Body className="d-flex flex-row justify-content-between">
                                    <div className="flex-column">
                                        <Card.Title>
                                            Item { Number.isInteger(props.key + 1) ? props.key + 1 : "calculating..." }: { value.name }
                                        </Card.Title>
                                        Original Price: ${ value.originalPrice }
                                        <br/>
                                        Price: ${ value.price }
                                        <br/>
                                        Ingredients: { value.ingredients?.join(', ') }
                                        <br/>
                                        Expected Wait Time (mins): { value.waitTime }
                                    </div>
                                </Card.Body>
                                <Card.Body className="d-flex flex-row justify-content-between">
                                    <Button
                                        style={{ "width": "48%" }}
                                        onClick={() => {
                                            setEditMode(true);
                                            setEditItem(value);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        Edit Item
                                    </Button>
                                    <Button
                                        variant="danger"
                                        style={{ "width": "48%" }}
                                        onClick={() => {
                                            setValue(value); 
                                            setShowDeleteCategoryModal(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    }
                />
            }
            <Row className="mt-4">
                <Button
                    name="add-menu-item"
                    variant='success'
                    style={{ "width": "25%", "margin": "auto" }}
                    onClick={() => {
                        const newItem = {
                            "name": null,
                            "originalPrice": null,
                            "ingredients": [],
                            "extras": [],
                            "image": null,
                            "unavailableIngredients" : [],
                        }
                        setEditMode(false);
                        setEditItem(newItem);
                        setShowEditModal(true);
                    }}
                >
                    + Add Menu Item
                </Button>
            </Row>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        { editMode ? 'Edit' : 'Add' }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <InputGroup.Text id="edit-name">
                                Name:
                            </InputGroup.Text>
                        </div>
                        <input
                            name="item-name-input"
                            className="form-control"
                            aria-label="Default"
                            aria-describedby="edit-name"
                            defaultValue={editItem && editItem.name}
                            onChange={(e) => {
                                editItem.name = e.target.value;
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <InputGroup.Text id="edit-name">
                                Price ($):
                            </InputGroup.Text>
                        </div>
                        <input
                            name="item-price-input"
                            className="form-control"
                            aria-label="Default"
                            aria-describedby="edit-name"
                            defaultValue={editItem && editItem.originalPrice}
                            onChange={(e) => {
                                editItem.originalPrice = e.target.value;
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <InputGroup.Text id="edit-name">
                                Expected Wait Time (mins):
                            </InputGroup.Text>
                        </div>
                        <input
                            name="item-time-input"
                            className="form-control"
                            aria-label="Default"
                            aria-describedby="edit-name"
                            defaultValue={editItem && editItem.waitTime}
                            onChange={(e) => {
                                editItem.waitTime = e.target.value;
                            }}
                        />
                    </InputGroup>
                    <input 
                        type="file" 
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="edit-name"
                        onChange={(e) => {
                            const [file] = e.target.files;
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function() {   
                                editItem.image = reader.result
                            };
                            reader.onerror = function (error) {
                                alert(`Invalid image type. Please try again. Error: ${error}`)
                            };
                        }}
                    />
                    <div className="mb-2 mt-4">
                        Ingredients:
                        {
                            editItem && editItem.ingredients.map((ingredient, index) => {
                                return (
                                    <div key={index} className="d-flex justify-content-between mt-2">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                editItem.ingredients.splice(index, 1);
                                                setRender(render => render + 1);
                                            }}
                                        >
                                            Delete { ingredient } 
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="d-flex flex-row">
                        <form id="add-ingredient-input">
                            <input
                                name="add-ingredient-input"
                                className="form-control"
                                style={{ "width": "300px" }}
                                onChange={(e) => {
                                    setAddIngredient(e.target.value);
                                }}
                            />
                        </form>
                        <Button
                            name="add-ingredient-button"
                            variant="success"
                            style={{ "marginLeft": "10px" }}
                            disabled={addIngredient === null}
                            onClick={() => {
                                editItem.ingredients.push(addIngredient);
                                setRender(render => render + 1);
                                setAddIngredient(null);
                                document.getElementById("add-ingredient-input").reset();
                            }}
                        >
                            Add Ingredient +
                        </Button>
                    </div>
                    <div className="mb-2 mt-4">
                        Extra Ingredients:
                        {
                            editItem && editItem.extras.map((ingredient, index) => {
                                return (
                                    <div key={index} className="d-flex justify-content-between mt-2">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                editItem.extras.splice(index, 1);
                                                setRender(render => render + 1);
                                            }}
                                        >
                                            Delete { ingredient } 
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="d-flex flex-row">
                        <form id="extra-ingredient-input">
                            <input
                                name="add-extra-ingredient-input"
                                className="form-control"
                                style={{ "width": "260px" }}
                                onChange={(e) => {
                                    setExtraIngredient(e.target.value);
                                }}
                            />
                        </form>
                        <Button
                            name="add-extra-ingredient-button"
                            variant="success"
                            style={{ "marginLeft": "10px" }}
                            disabled={extraIngredient === null}
                            onClick={() => {
                                editItem.extras.push(extraIngredient);
                                setRender(render => render + 1);
                                setExtraIngredient(null);
                                document.getElementById("extra-ingredient-input").reset();
                            }}
                        >
                            Add Extra Ingredient +
                        </Button>
                    </div>
                    <div className="mb-2 mt-4">
                        Unavailable Ingredients:
                        {
                            editItem && editItem.unavailableIngredients.map((ingredient, index) => {
                                return (
                                    <div key={index} className="d-flex justify-content-between mt-2">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                editItem.unavailableIngredients.splice(index, 1);
                                                setRender(render => render + 1);
                                            }}
                                        >
                                            Delete { ingredient } 
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="d-flex flex-row">
                        <form id="unavailable-ingredient-input">
                            <input
                                className="form-control"
                                style={{ "width": "260px" }}
                                onChange={(e) => {
                                    setUnavailableIngredient(e.target.value);
                                }}
                            />
                        </form>
                        <Button
                            variant="success"
                            style={{ "marginLeft": "10px" }}
                            disabled={unavailableIngredient === null}
                            onClick={() => {
                                editItem.unavailableIngredients.push(unavailableIngredient);
                                setRender(render => render + 1);
                                setUnavailableIngredient(null);
                                document.getElementById("unavailable-ingredient-input").reset();
                            }}
                        >
                            Add Unavailable Ingredient +
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => setShowEditModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        name="create-item-button"
                        variant="success"
                        onClick={() => {
                            (editMode ? sendEditItem(editItem) : addItemToCategory(categoryId, editItem))
                            .then(() => {
                                setFetch(fetch => fetch + 1);
                            })
                            .then(() => {
                                setShowEditModal(false);
                            })
                        }}
                    >
                        { editMode ? 'Save' : 'Create +' }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}