import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addInvation, removeInvation } from "../../Redux/Actions/ProductsActions";
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';



const ProductDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const product = useSelector(state => state.products[id - 1]);
    const invations = useSelector(state => state.invations)
    const [counter, setCounter] = useState(() => {
        let i = 0;
        invations.forEach(elem => {
            if (elem.id == +id)
                i++;
        });
        console.log(i, "i")
        return i;
    });
    const removeItem = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            dispatch(removeInvation(id))
        }
    };
    const addItem = () => {
        setCounter(counter + 1)
        dispatch(addInvation(product))
    }

    return (
        <>
            <h1>product {id} details :</h1>
            <button onClick={() => (navigate(-1))}>back</button>
            <button onClick={() => { navigate("/payment") }}>to pay</button>
            <img src={`http://localhost:3000/${product.img}`} />
            <CardActions style={{
                display: "flex",
                alignItems: "flex-start",
                alignItems: "center",
                width: "45%",
                border: "1.5px rgb(238 94 99)",
            }}>
                <IconButton color="secondary" onClick={removeItem}>
                    -
                </IconButton>
                <p style={{
                    margin: "0 auto",
                    border: "1.5px rgb(238 94 99)",
                    borderStyle: "outset",
                    borderRadius: " 35%",
                    paddingLeft: "6px",
                    paddingRight: "6px"
                }}> {counter}</p>
                <IconButton color="secondary" onClick={addItem}>
                    +
                </IconButton>
            </CardActions>

        </>

    );
}
export default ProductDetails