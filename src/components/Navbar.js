import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/Auth.service";
import { removeUser, setIsManager, setUser } from "../Redux/Actions/ProductsActions";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.user);
    const isManager = useSelector(state => state.isManager);
    const location = useLocation();
    useEffect(() => {
        if (!user)
            navigate('/login');
        else {
            navigate("")
        }
    }, [user, ])

    const handleLogout = () => {
        authService.logout();
        dispatch(removeUser());
        navigate('/login');
    }

    return (
        <>
            <ul className="navbar" style={{ margin: "0px" }}>
                <img src="./images/logo.png" />
                {user && <li className={`${location.pathname === "/" ? "selected" : ""}`}><Link to="/" className="Link">home</Link></li>}
                {!user && <li className={`${location.pathname === "/login" ? "selected" : ""}`}><Link to="login" className="Link">login</Link></li>}
                {user && <li className={`${location.pathname === "/products" ? "selected" : ""}`}> <Link to="products" className="Link">products</Link></li>}
                {user && <li className={`${location.pathname === "/donation" ? "selected" : ""}`}><Link to="donation" className="Link">donate now</Link></li>}
                <li className={`${location.pathname === "/userDetails" ? "selected" : ""}`}><Link to="userDetails" className="Link" >your details</Link></li>
                { isManager&&<li className={`${location.pathname === "/productsTable" ? "selected" : ""}`}><Link to="/productsTable" className="Link">products table</Link></li>}
                { isManager&&<li className={`${location.pathname === "/donationTable" ? "selected" : ""}`}><Link to="/donationTable" className="Link">donations table</Link></li>}
                {user && <li ><Link onClick={handleLogout} className="Link">logout</Link></li>}
            </ul>
        </>
    );
}
export default Navbar