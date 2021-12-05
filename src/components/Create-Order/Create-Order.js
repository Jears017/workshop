import React, {useEffect, useState} from 'react'
import axios from "axios";
import {setContainerIsEmpty, setProductContainer, setProductValue} from "../../store/reducers/order";
import {useDispatch, useSelector} from "react-redux";
import c from './Create-Order.module.css'
import {Redirect} from "react-router-dom";

const initialState = {
    client: '',
    number: '',
    dateEnd: '',
    productName: '',
    action: '',
    price: '',
    currentSum: '',
    products: []
}

export const CreateOrder = () => {
    const [product, setProduct] = useState([])
    const [productFilter, setProductFilter] = useState([])
    const [receipt, setReceipt] = useState(initialState)
    const [sum, setSum] = useState(0)
    const [fetching, setFetching] = useState(false)

    const dispatch = useDispatch()
    const state = useSelector(state => state.order)


    useEffect(() => {
        axios.get('https://workshop-application77.herokuapp.com/api/products/').then(res => setProduct(res.data))
    }, [])

    useEffect(() => {
        setProductFilter(product.map(el => el.name))
    }, [product])

    const onSubmit = (e) => {
        e.preventDefault()
        const obj = {
            client: receipt.client,
            number: receipt.number,
            dateEnd: receipt.dateEnd,
            productName: receipt.productName,
            action: receipt.action,
            products: [...state.container],
            sum: sum,
            currentSum: receipt.currentSum
        }
        axios.post('https://workshop-application77.herokuapp.com/api/receipt/', {...obj})
        setReceipt(prevState => {
            return {...prevState, client: '', number: '', dateEnd: '', productName: '', action: '', price: '', currentSum: ''}
        })
        dispatch(setContainerIsEmpty())
        setSum(0)
        if (receipt.client && receipt.number && receipt.dateEnd && receipt.products) {
            setFetching(true)
        }
    }

    if (receipt.action) {
        axios.get(`https://workshop-application77.herokuapp.com/api/products/${receipt.productName}/${receipt.action}`).then(res => setReceipt(prevState => {
            return {...prevState, price: res.data[0].price}
        }))
    }

    const formOnChange = (e) => {
        setReceipt(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const addSomeProduct = (e) => {
        e.preventDefault()
        dispatch(setProductContainer({
            productName: receipt.productName,
            action: receipt.action,
            price: receipt.price,
        }))
        setSum(sum + receipt.price)
        setReceipt(prevState => {
            return {...prevState, productName: '', action: '', price: ''}
        })
    }

    const clearCard = () => {
        dispatch(setContainerIsEmpty())
        setSum(0)
    }

    if (fetching) {
        return <Redirect to={'/'}/>
    }

    console.log(new Date().toJSON().slice(0, 10))


    return (
        <div>
            <h2 className={c.title}>Оформление заказа:</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        ФИО:
                        <input
                            className="form-control"
                            value={receipt.client}
                            name={'client'}
                            onChange={formOnChange}
                            placeholder={'Введите ФИО'}
                            type="text"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Номер:
                        <input
                            className="form-control"
                            value={receipt.number}
                            name={'number'}
                            onChange={formOnChange}
                            placeholder={'Введите номер'}
                            type="number"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Дата готового изделия:
                        <input
                            className="form-control"
                            value={receipt.dateEnd}
                            min={new Date().toJSON().slice(0, 10)}
                            name={'dateEnd'}
                            onChange={formOnChange}
                            type="date"
                        />
                    </label>
                </div>
                <div className={c.productSelectContainer}>
                    <div>
                        <label>
                            Изделие:
                            <div className={c.selectSettings}>
                                <select className="form-select" value={receipt.productName} name='productName'
                                        onChange={formOnChange}>
                                    <option>Выберите одежду</option>
                                    {productFilter.filter((el, idx) => productFilter.indexOf(el) === idx).map(prod => {
                                        return (
                                            <option value={prod} key={prod}>{prod}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label>
                            Действие:
                            <div className={c.selectSettings}>
                                <select className="form-select" value={receipt.action} name='action'
                                        onChange={formOnChange}>
                                    <option>Выберите действие</option>
                                    {product.filter(prod => prod.name === receipt.productName).map(prod => {
                                        return (
                                            <option value={prod.action} key={prod._id}>{prod.action}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </label>
                    </div>
                    <div className={c.productButton}>
                        <input onClick={addSomeProduct} className="btn btn-primary" value={'add'} type="button"/>
                    </div>
                    {state.container.length != 0 && <div className={c.productButton}>
                        <input onClick={clearCard} className="btn btn-primary" value={'clear'} type="button"/>
                    </div>
                    }
                </div>
                {state.container.length != 0 && <div className={c.table}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Изделие</th>
                            <th scope="col">Перечень работ</th>
                            <th scope="col">Стоимость</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.container.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{el.productName}</td>
                                    <td>{el.action}</td>
                                    <td>{el.price} руб.</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>}
                {state.container.length != 0 && <div>Итого: {sum} руб.</div>}
                {state.container.length != 0 &&
                <div className={c.currentSum}>
                    <label>
                        Внесенная сумма:
                        <input
                            className="form-control"
                            value={receipt.currentSum}
                            name={'currentSum'}
                            onChange={formOnChange}
                            placeholder={'Введите внесенную сумму'}
                            type="number"
                        />
                    </label>
                </div>}
                <div className={c.submitBtn}>
                    <input className="btn btn-primary" type="submit" value={'Добавить заказ'}/>
                </div>
            </form>
        </div>
    )
}