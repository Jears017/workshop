import React, {useEffect, useState} from 'react'
import c from './Products.module.css'
import {Link} from "react-router-dom";
import axios from 'axios'


export const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://workshop-application77.herokuapp.com/api/products/').then(res => setProducts(res.data))
    }, [products.length])

    const deleteHandler = async (id) => {
        await axios.delete(`https://workshop-application77.herokuapp.com/api/products/${id}`)
        const del = products.filter(product => product._id !== id)
        setProducts(del)
    }

    return (
        <div>
            <div className={c.addButtonContainer}>
                <h2>Изделия:</h2>
                <Link to={'/create-product'}>
                    <div className={c.addButton}>+</div>
                </Link>
            </div>
            <div className={c.productsTable}>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Действие</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((receipt, idx) => {
                        return (
                            <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>{receipt.name}</td>
                                <td>{receipt.action}</td>
                                <td>{receipt.price} руб.</td>
                                <td>
                                    <div className={c.actionSection}>
                                        <Link to={`/edit-product/${receipt._id}`}>
                                            <div className={'btn btn-primary'}>edit</div>
                                        </Link>
                                        <button onClick={() => deleteHandler(receipt._id)}
                                                className={'btn btn-primary'}
                                                type="button"
                                                value={'delete'}
                                        >delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}