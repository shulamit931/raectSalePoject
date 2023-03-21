import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setIsManager, setUser } from '../../Redux/Actions/ProductsActions';
import authService from '../../services/Auth.service';

const Login = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const login = async () => {
        const user = await (authService.login(name, password));
        if (user) {
            dispatch(setUser(user));
            if (user.isManager) {
                dispatch(setIsManager(true));
                console.log(user.isManager);
            }
            navigate('')
        }
        else {
            navigate('/userDetails');
        }

    }


    return (
        <>
            <div>
                <input type="text" placeholder='name' onChange={(e) => { setName(e.target.value) }} />
                <br />
                <input type="password" placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
                <br />
                <input type="button" value="login" onClick={login} />

            </div>

        </>
    );
}
export default Login