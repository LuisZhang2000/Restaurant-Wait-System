import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, InputGroup, Button, Card, Container, Row } from 'react-bootstrap';
import { StaffNavbar } from '../components/StaffNavbar';
import { PageTitle } from '../components/CommonComponents';
import { List, arrayMove } from 'react-movable';
import { getAllCategories, setNewCategories, addNewCategory, deleteCategory } from '../endpoints/categories';

export const Manager = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const username = params.username;
    const [render, setRender] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [value, setValue]  = useState(null);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false); 

    useEffect(() => {
        getAllCategories()
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setCategories(data.data);
            }
        })
    }, [render]);

    useEffect(() => {
        if (categories.length !== 0) {
            setNewCategories(categories);
        }
    }, [categories]);

    return (
        <>
            <StaffNavbar username={username} role="Manager"/>
            <PageTitle title="Menu"/>
            <Modal show={showDeleteCategoryModal} onHide={() => setShowDeleteCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Category</Modal.Title>
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
                            deleteCategory(value && value.id)
                            .then(() => {
                                setRender(render => render + 1);
                            })
                            .then(() => { 
                                setShowDeleteCategoryModal(false);
                            })
                        }}
                    >
                        Remove Category
                    </Button>
                    </Modal.Footer>
                </Modal>
            {
                categories.length !== 0 && 
                <List
                    values={categories}
                    onChange={({ oldIndex, newIndex }) => {
                        setCategories(arrayMove(categories, oldIndex, newIndex));
                    }}
                    renderList={({ children, props }) => 
                        <Container style={{ 'width': '70%' }} {...props}>
                            {children}
                        </Container>
                    }
                    renderItem={({ value, props }) => 
                        <Row className="mt-4 mb-3" {...props}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-row justify-content-between">
                                    <div className="flex-column">
                                        <Card.Title>
                                            { value.name }
                                        </Card.Title>
                                        Category { Number.isInteger(props.key + 1) ? props.key + 1 : "calculating..." }
                                    </div>
                                    <div className="d-flex flex-row justify-content-between" style={{ "width": "25%" }}>
                                        <Button
                                            style={{ "width": "65%" }}
                                            onClick={() => {
                                                navigateTo(`${value.name}/${value.id}`);
                                            }}
                                        >
                                            View { value.name }
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setShowDeleteCategoryModal(true); 
                                                setValue(value); 
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Row>
                    }
                />
            }
            <Row className="mt-4">
                <Button
                    name="add-category-button"
                    variant='success'
                    style={{ "width": "20%", "margin": "auto" }}
                    onClick={() => {
                        setShowCategoryModal(true);
                    }}
                >
                    + Add Category
                </Button>
            </Row>
            <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please enter the name of your Category.
                    <InputGroup className="mt-4 mb-3">
                        <div class="input-group-prepend">
                            <InputGroup.Text id="table-prepend-text">
                                Name:
                            </InputGroup.Text>
                        </div>
                        <input
                            name="category-name-input"
                            className="form-control"
                            aria-label="Default"
                            aria-describedby="table-prepend-text"
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => setShowCategoryModal(false)}
                    >
                        Close
                    </Button>
                    <Button
                        name="create-category-button"
                        variant="success"
                        disabled={categoryName === null || categoryName === ""}
                        onClick={() => {
                            addNewCategory(categoryName)
                            .then(() => {
                                setRender(render => render + 1);
                            })
                            .then(() => {
                                setShowCategoryModal(false);
                            })
                        }}
                    >
                        Create +
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}