import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { payment } from '../../Redux/Actions/ProductsActions';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};

const Pay = () => {
    const dispatch=useDispatch()
    const invations = useSelector(state => state.invations);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [thanks, setThanks] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const columns = useMemo(
        () => [

            {
                accessorKey: "name",
                header: 'Name',
            },
            {
                accessorKey: 'price', //normal accessorKey
                header: 'Price for one ',
            },
            {
                accessorKey: 'count', //normal accessorKey
                header: 'Count',
            }, {
                accessorKey: 'sum', //normal accessorKey
                header: 'Sum',
            },

            {
                accessorKey: 'img',
                header: 'Image',
                Cell: ({ cell }) => (
                    <img src={cell.row.original.img} style={{ width: "40px", height: "40px" }}/>
                )
            },

        ],
        [],
    );
    let data = [];
    let sumAll = 0, countAll = 0;
    invations.forEach(element => {
        element.count = 1;
        const i = data.findIndex(d => d.id == element.id);
        if (i != -1) {
            data[i].count += element.count;
            data[i].sum = data[i].count * data[i].price
            sumAll += data[i].sum;
            countAll += data[i].count;
        }
        else {
            element.sum = element.price
            data.push(element);
            sumAll += element.sum;
            countAll += element.count;
        }
    });

    const onSubmit = () => {
        reset();
        closeModal();
        setThanks(true);
        dispatch(payment())
        setTimeout(() => {
            navigate("/")
        }, 2000);

    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    return <>
        <p> number of cards : {countAll} ,for pay : {sumAll}</p><button onClick={() => { setModalIsOpen(true) }}>pay now</button>
        {thanks && <h3>thanks for your donation</h3>}
        {!modalIsOpen && <MaterialReactTable columns={columns} data={data} />}

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}

        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">סה"כ לתשלום</span>
                    <input type="text" className="form-control" aria-label="description" value={sumAll}{...register("name", { required: true })} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">מספר אשרי</span>
                    <input type="number" className="form-control" aria-label="description" placeholder="" {...register("price", { required: true })} />
                </div>


                <input type="submit" />
            </form>
        </Modal>

    </>
}

export default Pay