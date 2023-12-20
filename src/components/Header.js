import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Container,
  Nav,
  Navbar,
  InputGroup,
  Modal,
} from "react-bootstrap"
import { raiseAssistance, getAssistanceRaised } from "../endpoints/table"

export function Header({
  tableNumber,
  setTableNumber,
  cartItemsNumber,
  disableTableEdit,
}) {
  const navigateTo = useNavigate()
  const [showTableModal, setShowTableModal] = React.useState(false)
  const [showAssistModal, setShowAssistModal] = React.useState(false)
  const [tempTableNumber, setTempTableNumber] = React.useState(tableNumber)
  const [isAssistanceDisabled, setIsAssistanceDisabled] = React.useState(false)

  const assistClose = () => {
    setShowAssistModal(false)
    setIsAssistanceDisabled(true)
  }

  // set the inital value of raise 'Assistance Needed' button
  React.useEffect(() => {
    const polling = setInterval(() => {
      getAssistanceRaised(tableNumber)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            return null
          }
        })
        .then((data) => {
          setIsAssistanceDisabled(data.data)
        })
    }, 1500)

    return () => clearInterval(polling)
  }, [])

  if (tableNumber === null && showTableModal === false) {
    setShowTableModal(true)
  }

  return (
    <Navbar sticky="top" className="bg-white shadow-sm">
      <Container>
        <Nav className="me-auto">
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigateTo("/")
            }}
          >
            Majic Cafe
          </h1>
        </Nav>
        <div
          className="mx-4 d-flex justify-content-between"
          style={{ width: "380px" }}
        >
          <Button
            name="table-number-button"
            disabled={disableTableEdit}
            onClick={() => setShowTableModal(true)}
          >
            {tableNumber === null
              ? "Enter Table Number"
              : `Table ${tableNumber}`}
          </Button>
          <Button
            disabled={isAssistanceDisabled}
            onClick={() => {
              raiseAssistance(tableNumber).then(() => {
                setShowAssistModal(true)
              })
            }}
          >
            {isAssistanceDisabled ? "Waiter on the way" : "Request Assistance"}
          </Button>
          <Button
            name="my-orders-button"
            onClick={() => {
              navigateTo(`/${tableNumber}/orders`)
            }}
          >
            My Orders
          </Button>
        </div>

        {/* Table Number Modal */}
        <Modal show={showTableModal} onHide={() => setShowTableModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Table Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>What is your table number?</h5>
            <InputGroup className="mt-4 mb-3">
              <div className="input-group-prepend">
                <InputGroup.Text id="table-prepend-text">
                  Table Number:
                </InputGroup.Text>
              </div>
              <input
                name="table-number-input"
                type="number"
                className="form-control"
                aria-label="Default"
                aria-describedby="table-prepend-text"
                defaultValue={tableNumber}
                onChange={(e) => {
                  setTempTableNumber(e.target.value)
                }}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              name="table-number-save-button"
              variant="success"
              disabled={tempTableNumber === "" || tempTableNumber === null}
              onClick={() => {
                setTableNumber(tempTableNumber)
                setShowTableModal(false)
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Wait Staff Assistance Modal */}
        <Modal show={showAssistModal} onHide={assistClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assistance has been requested</Modal.Title>
          </Modal.Header>
          <Modal.Body>A waitstaff will be with you shortly.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={assistClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Cart Button */}
        <Button
          name="my-cart-button"
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
          onClick={() => {
            navigateTo(`/${tableNumber}/cart`)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {cartItemsNumber}
          </div>
        </Button>
      </Container>
    </Navbar>
  )
}
