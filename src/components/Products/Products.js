import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProducts as reduxSetProducts } from '../../Redux/Actions/ProductsActions';
import  { getAllProducts } from '../../services/Products.service';
import Product from './Product';



const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => state.products);
    useEffect(() => {
        if (!products.length)
            getAllProducts()
                .then(data => {
                    dispatch(reduxSetProducts(data));
                    console.log(data);
                })
    }, [])

    return (
        <div className='allProducts'>
            <button onClick={() => { navigate("/payment") }}>to pay</button>
            {products && products.map((p) => <><Product key={p.id} {...p} /></>)}
            <img src="./images/header.jpg" style={{ width: "100vw", margin: "0px" }} />
        </div>
    );
}
export default Products;