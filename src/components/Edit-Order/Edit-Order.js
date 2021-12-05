import React, {useEffect, useState} from 'react'
import axios from "axios";
import {setContainerIsEmpty, setProductContainer, setProductValue} from "../../store/reducers/order";
import {useDispatch, useSelector} from "react-redux";
import c from './Edit-Order.module.css'
import {Redirect} from "react-router-dom";

const initialState = {
    client: '',
    number: '',
    dateEnd: '',
    productName: '',
    action: '',
    price: '',
    products: [],
    sum: '',
    currentSum: ''
}

export const EditOrder = (props) => {
    const [product, setProduct] = useState([])
    const [productFilter, setProductFilter] = useState([])
    const [receipt, setReceipt] = useState(initialState)
    const [sum, setSum] = useState(0)
    const [fetching, setFetching] = useState(false)

    const dispatch = useDispatch()
    const state = useSelector(state => state.order)


    useEffect(() => {
        axios.get(`https://workshop-application77.herokuapp.com/api/receipt/${props.match.params.id}`).then(res => setReceipt(prevState => {
            return {
                ...prevState,
                client: res.data.client,
                number: res.data.number,
                dateEnd: res.data.dateEnd,
                products: [...res.data.products],
                sum: res.data.sum,
                currentSum: res.data.currentSum
            }

        }))
    }, [])

    useEffect(() => {
        axios.get('https://workshop-application77.herokuapp.com/api/products/').then(res => {
            setProduct(res.data)
            setSum(receipt.sum)
        })
    }, [receipt.sum])

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
            products: [...receipt.products],
            sum: sum,
            currentSum: receipt.currentSum
        }
        axios.put(`https://workshop-application77.herokuapp.com/api/receipt/${props.match.params.id}`, {...obj})
        setReceipt(prevState => {
            return {
                ...prevState,
                client: '',
                number: '',
                dateEnd: '',
                productName: '',
                action: '',
                price: '',
                sum: '',
                products: [],
                currentSum: ''
            }
        })
        setSum(0)
        if (receipt.client && receipt.number && receipt.products) {
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
        const product = {
            productName: receipt.productName,
            action: receipt.action,
            price: receipt.price,
        }
        setReceipt(prevState => {
            return {...prevState, products: [...prevState.products, product]}
        })
        setSum(sum + receipt.price)
        setReceipt(prevState => {
            return {...prevState, productName: '', action: '', price: ''}
        })
    }

    const clearCard = () => {
        setReceipt(prevState => {
            return {...prevState, products: []}
        })
        setSum(0)
    }

    if (fetching) {
        return <Redirect to={'/'}/>
    }

    return (
        <div>
            <h2 className={c.title}>Редактирование заказа:</h2>
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
                            <select className="form-select" value={receipt.productName} name='productName'
                                    onChange={formOnChange}>
                                <option>Выберите одежду</option>
                                {productFilter.filter((el, idx) => productFilter.indexOf(el) === idx).map(prod => {
                                    return (
                                        <option value={prod} key={prod}>{prod}</option>
                                    )
                                })}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Действие:
                            <select className="form-select" value={receipt.action} name='action'
                                    onChange={formOnChange}>
                                <option>Выберите действие</option>
                                {product.filter(prod => prod.name === receipt.productName).map(prod => {
                                    return (
                                        <option value={prod.action} key={prod._id}>{prod.action}</option>
                                    )
                                })}
                            </select>
                        </label>
                    </div>
                    <div className={c.productButton}>
                        <input onClick={addSomeProduct} className="btn btn-primary" value={'add'} type="button"/>
                    </div>
                    <div className={c.productButton}>
                        <input onClick={clearCard} className="btn btn-primary" value={'clear'} type="button"/>
                    </div>
                </div>
                {receipt.products.length != 0 && <div className={c.table}>
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
                        {receipt.products.map((el, index) => {
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
                {receipt.products.length != 0 && <div>Итого: {sum} руб.</div>}
                {receipt.products.length != 0 &&
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