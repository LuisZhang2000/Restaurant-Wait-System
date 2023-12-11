import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Container, Col, Row, Button } from "react-bootstrap";
import { OrderItem } from "../components/OrderItem";
import { BillButton } from "../components/BillButton";
import { PageTitle } from "../components/CommonComponents";
import { formatCurrency } from "../utilities/formatCurrency";
import { DisplayTotalAmount } from "../components/CommonComponents";
import { requestOrdersForTable } from "../endpoints/order";
import { getCartItemsNumber } from "../endpoints/cart";

export const Orders = () => {
  const params = useParams();
  const navigateTo = useNavigate();
  const tableNumber = params.tableNumber;
  const [changed, setChanged] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [ordersItems, setOrdersItems] = useState([]);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);

  // request all the food items in this table's order list
  useEffect(() => {
    requestOrdersForTable(tableNumber)
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
          const items = data.data;
          setOrdersItems(items);
          // get the total($) of all cart items
          const total = items.reduce(
            (previousValue, currentValue) =>
              parseFloat(currentValue.price) + previousValue,
            0,
          );
          setOrderTotal(formatCurrency(total));
        }
      });
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
  }, [changed]);

  return (
    <>
      <Header
        tableNumber={tableNumber}
        cartItemsNumber={cartItemsNumber}
        disableTableEdit={true}
      />
      <PageTitle title="My Orders" />
      <Container>
        {ordersItems.length === 0 ? (
          <div>No orders have been placed yet.</div>
        ) : (
          <Row>
            <Col>
              {ordersItems &&
                ordersItems.map((item) => (
                  <Row className="mt-4">
                    <OrderItem
                      tableNumber={tableNumber}
                      changed={changed}
                      setChanged={setChanged}
                      {...item}
                    />
                  </Row>
                ))}
            </Col>
          </Row>
        )}
      </Container>
      <DisplayTotalAmount type="Order" amount={orderTotal} />
      <div className="d-flex justify-content-center mt-3">
        <Button
          className="m-3"
          onClick={() => {
            navigateTo("/");
          }}
        >
          Back to Menu
        </Button>
        <BillButton tableNumber={tableNumber} />
      </div>
    </>
  );
};
