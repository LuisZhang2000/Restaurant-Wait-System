import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Navbar as NavbarBs } from 'react-bootstrap'
import { Navbar } from "../components/Navbar"
import { StoreItem } from "../components/StoreItem"
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsNumber } from "../endpoints/cart";
import { getAllCategories, getCategoryItems } from "../endpoints/categories";

export default function Dashboard() {
    const [addedItem, setAddedItem] = useState(0);
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    const [active, setActive] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesItems, setCategoriesItems] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [changed, setChanged] = useState(0);
    // redux state management for table number
    const dispatch = useDispatch();
    const { savedTableNumber } = useSelector(state => state.tableInformation);
    const [tableNumber, setTableNumber] = useState(savedTableNumber);

    // handleCategory triggers upon clicking on a category
    // setChanged will be called to trigger useEffect to update displayed items from the newly selected category
    // setActive is called to highlight the selected category button
    const handleCategory = (event) => {
        setCategoryId(event.target.id)
        setChanged(event.target.id)
        setActive(event.target.id)     
    }

    useEffect(() => {
        getAllCategories()
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setCategories(data.data);
            }
        })

        getCategoryItems(categoryId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // something went wrong on server side
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setCategoriesItems(data.data);
            }
        })
    }, [changed]);

    useEffect(() => {
        dispatch.tableInformation.setSavedTableNumber(tableNumber);
    }, [tableNumber]);

    useEffect(() => {
        getCartItemsNumber(tableNumber)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                setCartItemsNumber(data.data)
            } else {
                setCartItemsNumber(0);
            }
        });
    }, [addedItem, tableNumber]);
    
    return (
        <>
            <Navbar tableNumber={tableNumber} setTableNumber={setTableNumber} cartItemsNumber={cartItemsNumber}/>
            <NavbarBs style={{ "marginTop": "2px" }}>
                {
                    categories && categories.map((category, index) => (
                        <Button
                            id={category.id}
                            key={parseInt(category.id)}
                            name={`category-button-${index + 1}`}
                            style={{ "marginLeft": "15px" }}
                            className={active === category.id ? "active" : undefined}
                            onClick={handleCategory}
                        >
                            { category.name }
                        </Button>
                    ))
                }
            </NavbarBs>
            <Row md={2} xs={1} lg={3} className="g-3">
                {categoriesItems && categoriesItems.map((item, index) => (
                    <Col>
                        <StoreItem key={index} index={index} {...item} tableNumber={tableNumber} addedItem={addedItem} setAddedItem={setAddedItem}/>
                    </Col>
                ))}   
            </Row>

        </>
    )
}
