import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeInvation, addInvation } from '../../Redux/Actions/ProductsActions';



const Product = (props) => {
    const { name, img, id } = props;
    const invations = useSelector(state => state.invations)
    const [counter, setCounter] = useState(() => {
        let i = 0;
        invations.forEach(elem => {
            if (elem.id === +id)
                i++;
        });
        console.log(i, "i")
        return i;
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const removeItem = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            dispatch(removeInvation(id))
        }
    };
    const addItem = () => {
        setCounter(counter + 1)
        dispatch(addInvation({ ...props }))
    }
    return (

        < >
            <Card sx={{ width: 350 }} dir="rtl" className='singleProduct'>
                <CardActionArea onClick={() => {
                    setTimeout(() => {
                        navigate(`${id}`)
                    }, 200);
                }} >
                    <CardMedia
                        component="img"
                        alt={name}
                        height="220"
                        image={img}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>

                    </CardContent>
                </CardActionArea >
                <CardActions style={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    width: "45%",
                }}>
                    <IconButton color="secondary" onClick={removeItem}>
                        <img src='./images/minus.png' />
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
                        <img src='./images/plus.png' />
                    </IconButton>
                </CardActions>
            </Card>
        </>

    );
}
export default Product