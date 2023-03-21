
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../services/Products.service';
import { setProducts as reduxSetProducts, updateProduct as reduxUpdateProduct, setNewProduct as reduxAddProduct } from '../../Redux/Actions/ProductsActions';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



const ProductsTable = () => {

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const products = useSelector(state => state.products);
  useEffect(() => {
    if (!products.length)
      getAllProducts()
        .then(data => {
          dispatch(reduxSetProducts(data));
          console.log(data);
        })
  }, [])
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsEdit(false);
    setCurrentRow({});
    setIsOpen(false);
    reset()
  }


  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ defaultValues: { name: currentRow.name } });

  const onSubmit = data => {
    console.log(data);
    closeModal();
    isEdit ?
      updateProduct(data) :
      addProduct(data);
  }

  const OpenModaleditProduct = (toEditRow) => {
    console.log(toEditRow)
    setCurrentRow(toEditRow);
    setIsEdit(true);
    openModal();
  }

  const updateProduct = (data) => {
    data.id = currentRow.id;
    dispatch(reduxUpdateProduct(data))
  };

  const addProduct = (data) => {
    let max = 0;
    products.map(p => { if (p.id > max) max = p.id })
    data.id = max + 1;
    dispatch(reduxAddProduct(data));
  }

  return (
    <>
      <button onClick={openModal}>add new poduct</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">name</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="right">color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right"><img src={row.img} height="40px"></img></TableCell>
                <TableCell align="right">{row.color}</TableCell><TableCell><button onClick={() => { OpenModaleditProduct(row) }}>edit</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">description</span>
            <input type="text" className="form-control" aria-label="description" placeholder={isEdit ? currentRow.name : ""}{...register("name", { required: true })} onFocus={() => { if (isEdit) setValue("name", currentRow.name) }} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">price</span>
            <input type="number" className="form-control" aria-label="description" placeholder={isEdit ? currentRow.price : ""} {...register("price", { required: true })} onFocus={() => { if (isEdit) setValue("price", currentRow.price) }} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">color</span>
            <input type="text" className="form-control" aria-label="description" placeholder={isEdit ? currentRow.color : ""} {...register("color", { required: true })} onFocus={() => { if (isEdit) setValue("color", currentRow.color) }} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">https://image.com/users/</span>
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder={isEdit ? currentRow.img : ""}{...register("img", { required: true })} onFocus={() => { if (isEdit) setValue("img", currentRow.img) }} />
          </div>

          <input type="submit" />

        </form>
        
      </Modal>

    </>
  );
};


export default ProductsTable;


