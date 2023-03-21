import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/Actions/ProductsActions";
import authService from "../../services/Auth.service";


const UserDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user);
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const newuser = await authService.register(data.username, data.password, data.email, data.address)
    dispatch(setUser(newuser))
    console.log(user)
    reset();
    navigate("/")

  }
  const setInputValue = (inputName) => {
    if (user)
      setValue(inputName, user[inputName])
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log(user)}
      <input placeholder="userName" {...register("username", { required: true })} onFocus={() => { setInputValue("username") }} /><br />
      <input type="password" placeholder="password"{...register("password", { required: true })} onFocus={() => { setInputValue("password") }} /><br />
      <input type="email" placeholder="email"{...register('email', { required: true })} onFocus={() => { setInputValue("email") }} /><br />
      <input placeholder="adress"{...register('address', { required: true })} onFocus={() => { setInputValue("address") }} />
      {errors.password || errors.username || errors.email || errors.adress && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
export default UserDetails