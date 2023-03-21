import React from 'react'
import Donation from './components/Donations/Donation';
import Home from './components/Home';
import Login from './components/Login/Login';
import ProductDetails from './components/Products/productDetails';
import Products from './components/Products/Products';
import UserDetails from './components/Login/UserDetails';
import ProductsTable from './components/Products/ProductsTable';
import DonationsTable from './components/Donations/DonationsTable';
import Pay from './components/Products/Pay.js';

const AppRouts = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "products",
        element: <Products />
    },
    {
        path: "products/:id",
        element: <ProductDetails />
    },
    {
        path: "donation",
        element: <Donation />
    },
    {
        path: "userDetails",
        element: <UserDetails />
    },
    {
        path: "productsTable",
        element: <ProductsTable />
    },
    {
        path: "donationTable",
        element: <DonationsTable />
    },
    {
        path: "payment",
        element: <Pay />
    }

]
export default AppRouts;