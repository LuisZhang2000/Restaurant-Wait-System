import React from "react";
import { Button, Col, Row, Navbar as NavbarBs } from "react-bootstrap";
import { Navbar } from "../components/Navbar";
import { StoreItem } from "../components/StoreItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsNumber } from "../endpoints/cart";
import { getAllCategories, getCategoryItems } from "../endpoints/categories";

export default function Dashboard() {
  const dispatch = useDispatch(); // redux state management for table number
  const { savedTableNumber } = useSelector((state) => state.tableInformation);

  const [addedItem, setAddedItem] = React.useState(0);
  const [cartItemsNumber, setCartItemsNumber] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [categoriesItems, setCategoriesItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [tableNumber, setTableNumber] = React.useState(savedTableNumber);

  /**
   * displays menu items that are included in the selected category
   * this function is called every time the selected category is changed
   *
   * @param id categoryId
   */
  const displayCategory = React.useCallback(() => {
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
      });

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
      });
    setActive(categoryId);
  }, [categoryId]);

  React.useEffect(() => {
    displayCategory();
  }, [categoryId, displayCategory]);

  React.useEffect(() => {
    dispatch.tableInformation.setSavedTableNumber(tableNumber);
  }, [tableNumber]);

  React.useEffect(() => {
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
          setCartItemsNumber(data.data);
        } else {
          setCartItemsNumber(0);
        }
      });
  }, [addedItem, tableNumber]);

  return (
    <>
      <Navbar
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        cartItemsNumber={cartItemsNumber}
      />
      <NavbarBs style={{ marginTop: "2px" }}>
        {categories.map((category, index) => (
          <Button
            id={category.id}
            key={parseInt(category.id)}
            name={`category-button-${index + 1}`}
            style={{ marginLeft: "15px" }}
            className={active === category.id ? "active" : undefined}
            onClick={(e) => setCategoryId(e.target.id)}
          >
            {category.name}
          </Button>
        ))}
      </NavbarBs>
      <Row xs={1} md={2} lg={3} className="g-3">
        {categoriesItems.map((item, index) => (
          <Col key={index}>
            <StoreItem
              index={index}
              {...item}
              tableNumber={tableNumber}
              addedItem={addedItem}
              setAddedItem={setAddedItem}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
