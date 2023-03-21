import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout';
import AppRouts from './AppRoutes';
import Navbar from './components/Navbar';
import Login from './components/Login/Login';
import UserDetails from './components/Login/UserDetails';
import { setIsManager, setUser } from './Redux/Actions/ProductsActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    const isUserLogin = JSON.parse(localStorage.getItem('user'));
    if (isUserLogin) {
      dispatch(setUser(isUserLogin));
      if (isUserLogin.isManager)
        dispatch(setIsManager(true))
    }
  }, [])

  return (
    <>
      <Navbar />
      {user ?
        <Layout>
          <Routes>
            {
              AppRouts.map((route, index) => {
                return <Route key={index} {...route} ></Route>
              })
            }
          </Routes>
        </Layout> :
        <Routes>
          <Route path='/userDetails' element={<UserDetails />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      }
    </>
  );
}

export default App;
