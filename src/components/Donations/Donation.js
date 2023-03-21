import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { setDonation } from '../../Redux/Actions/ProductsActions';



const Donation = () => {
    const [thanks,setThanks]=useState(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log(data);
        dispatch(setDonation(data))
        reset();
        setThanks(true);
        setTimeout(() => {
            setThanks(false);
        }, 2000);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='name' {...register("name", { required: true })} />
            <input placeholder='credit card number'{...register("ccnumber", { required: true })} />
            {errors.ccnumber && <p>error</p>}
            <input placeholder='sum'{...register("sum", { required: true })} />
            <input type="submit" />
            {thanks&&<p>thanks for your donation</p>}
        </form>
    );
}
export default Donation