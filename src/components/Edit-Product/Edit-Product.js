import React, {useEffect, useState} from 'react'
import c from "../Create-Order/Create-Order.module.css";
import axios from "axios";
import {Redirect} from "react-router-dom";

export const EditProduct = (props) => {


    const initialState = {
        name: '',
        action: '',
        price: ''
    }
    const [data, setData] = useState(initialState)
    const [product, setProduct] = useState({})
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        axios.get(`https://workshop-application77.herokuapp.com/api/products/${props.match.params.id}`).then(res => setData(prevState => {
            return {...prevState, name: res.data.name, action: res.data.action, price: res.data.price}
        }))
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`https://workshop-application77.herokuapp.com/api/products/${props.match.params.id}`, {...data})
        if (data.name && data.action && data.price) {
            setFetching(true)
        }

    }

    const onChangeHandler = (e) => {
        setData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    if (fetching) {
        return <Redirect to={'/products'}/>
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>
                        Изделие:
                        <input
                            className="form-control"
                            name={'name'}
                            placeholder={'Введите изделие'}
                            type="text"
                            onChange={onChangeHandler}
                            value={data.name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Действие:
                        <input
                            className="form-control"
                            name={'action'}
                            placeholder={'Введите действие'}
                            type="text"
                            onChange={onChangeHandler}
                            value={data.action}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Стоимость:
                        <input
                            className="form-control"
                            name={'price'}
                            type="number"
                            placeholder={'Введите стоимость'}
                            onChange={onChangeHandler}
                            value={data.price}
                        />
                    </label>
                </div>
                <div className={c.submitBtn}>
                    <input type="submit" value={'Добавить'} className={'btn btn-primary'}/>
                </div>
            </form>
        </div>
    )
}