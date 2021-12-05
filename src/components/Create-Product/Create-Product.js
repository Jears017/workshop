import React, {useState} from 'react'
import c from "../Create-Order/Create-Order.module.css";
import axios from "axios";
import {Redirect} from "react-router-dom";

export const CreateProduct = () => {
    const initialState = {
        name: '',
        action: '',
        price: ''
    }
    const [data, seData] = useState(initialState)
    const [fetching, setFetching] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('https://workshop-application77.herokuapp.com/api/products', {...data})
        if (data.name && data.action && data.price) {
            setFetching(true)
        }

    }

    const onChangeHandler = (e) => {
        seData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    if (fetching) {
        return <Redirect to={'/products'}/>
    }
    return (
        <div>
            <h2 className={c.title}>Добавление изделия:</h2>
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
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Стоимость:
                        <input
                            className="form-control"
                            name={'price'}
                            type="text"
                            placeholder={'Введите стоимость'}
                            onChange={onChangeHandler}
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