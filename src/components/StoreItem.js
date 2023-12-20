import React, { useState } from "react"
import { Button, Card, Modal, Form } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useSnackbar } from "notistack"
import { addItemToCart } from "../endpoints/cart"

export function StoreItem({
  item,
  index,
  tableNumber,
  addedItem,
  setAddedItem,
}) {
  const {
    id,
    name,
    price,
    image,
    ingredients,
    extras,
    available,
    unavailableIngredients,
  } = item
  const [showItem, setShowItem] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const handleClick = () => {
    enqueueSnackbar("Added to cart", { variant: "success" })
  }

  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={image}
          height="200px"
          style={{ objectFit: "cover", cursor: "pointer" }}
          onClick={() => setShowItem(true)}
        />
        {available === false && (
          <span className="badge badge-pill bg-danger">Unavailable</span>
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            <Button
              name={`add-to-cart-item-${index + 1}`}
              disabled={available === false}
              onClick={() => {
                addItemToCart(tableNumber, id)
                setAddedItem(addedItem + 1)
                handleClick()
              }}
            >
              Add To Cart
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showItem} onHide={() => setShowItem(false)} size="xl">
        <Modal.Header closeButton>
          <Button onClick={() => setShowItem(false)}>Back</Button>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row">
          <div
            className="d-flex flex-column"
            style={{ flex: 1, margin: "20px" }}
          >
            <img
              src={image}
              alt={name}
              height="500"
              style={{ objectFit: "cover" }}
              className="mb-3"
            />
            <div className="d-flex justify-content-between align-items-baseline">
              <span className="fs-2">{name}</span>
              <span className="fs-2">{formatCurrency(price)}</span>
            </div>
          </div>
          <div
            className="d-flex flex-column justify-content-between"
            style={{ flex: 1, margin: "20px" }}
          >
            <div>
              <h1>Ingredients</h1>
              {ingredients.map((ingredient, index) => (
                <Form key={index}>
                  <div key={`checkbox-${ingredient}`}>
                    <Form.Check
                      inline
                      type="checkbox"
                      id={`checkbox-${ingredient}`}
                      label={ingredient}
                      defaultChecked={true}
                    />
                  </div>
                </Form>
              ))}
              {unavailableIngredients.map((unavailableIngredient, index) => (
                <Form key={index}>
                  <div key={`checkbox-${unavailableIngredient}`}>
                    <Form.Check
                      inline
                      type="checkbox"
                      id={`checkbox-${unavailableIngredient}`}
                      label={`${unavailableIngredient} (unavailable)`}
                      defaultChecked={false}
                      disabled
                    />
                  </div>
                </Form>
              ))}
            </div>
            <div>
              <h1>Extras</h1>
              {extras.map((extra, index) => (
                <Form key={index}>
                  <div key={`checkbox-${extra}`}>
                    <Form.Check
                      inline
                      type="checkbox"
                      id={`checkbox-${extra}`}
                      label={extra}
                      defaultChecked={false}
                    />
                  </div>
                </Form>
              ))}
            </div>

            <Button
              disabled={available === false}
              onClick={() => {
                addItemToCart(tableNumber, id)
                setAddedItem(addedItem + 1)
                handleClick()
                setShowItem(false)
              }}
            >
              + Add to Cart
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        onHide={() => {
          setShowItem(false)
        }}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Added {name} to cart</Modal.Body>
      </Modal>
    </>
  )
}
