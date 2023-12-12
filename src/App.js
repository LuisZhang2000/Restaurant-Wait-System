import React from "react"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Cart } from "./pages/Cart"
import { Orders } from "./pages/Orders"
import { Manager } from "./pages/Manager"
import { EditMenu } from "./pages/EditMenu"
import { Waitstaff } from "./pages/Waitstaff"
import { KitchenStaff } from "./pages/KitchenStaff"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  LOGIN_PAGE,
  REGISTER_PAGE,
  DASHBOARD_PAGE,
  CART_PAGE,
  ORDERS_PAGE,
  MANAGER_PAGE,
  WAITSTAFF_PAGE,
  KITCHEN_STAFF_PAGE,
  MENU_ITEM_PAGE,
} from "./constants/routeConstants"
import Dashboard from "./pages/Dashboard"
import { SnackbarProvider } from "notistack"

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={LOGIN_PAGE} element={<Login />} />
          <Route path={REGISTER_PAGE} element={<Register />} />
          <Route path={DASHBOARD_PAGE} element={<Dashboard />} />
          <Route path={CART_PAGE} element={<Cart />} />
          <Route path={ORDERS_PAGE} element={<Orders />} />
          <Route path={MANAGER_PAGE} element={<Manager />} />
          <Route path={MENU_ITEM_PAGE} element={<EditMenu />} />
          <Route path={WAITSTAFF_PAGE} element={<Waitstaff />} />
          <Route path={KITCHEN_STAFF_PAGE} element={<KitchenStaff />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
