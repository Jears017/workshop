import React, {useEffect, useState} from 'react'
import axios from "axios";
import c from './Orders.module.css'
import {Link} from "react-router-dom";
import {OrderTable} from "../Order-Table/Order-Table";

export const Orders = () => {
    const [order, setOrder] = useState([])
    const [date, setDate] = useState('')
    const [query, setQuery] = useState('')
    useEffect(() => {
        axios.get('https://workshop-application77.herokuapp.com/api/receipt/').then(res => setOrder(res.data))

    })

    const dateHandler = (e) => {
        setDate(e.target.value)
    }

    const queryHandler = (e) => {
        setQuery(e.target.value)
    }


    const deleteHandler = async (id) => {
        await axios.delete(`https://workshop-application77.herokuapp.com/api/receipt/${id}`)
        const newOrder = order.filter(order => order._id === id)
        setOrder(newOrder)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const newOrder = order.filter(order => order.client.includes(query))
        setOrder(newOrder)
    }

    /*if(date){
       const newOrder = order.filter(order => order.dateEnd === date)
        setOrder(newOrder)
    }*/


    return (
        <div>
            <div className={c.addButtonContainer}>
                <h2>Заказы:</h2>
                <div className={c.search}>
                    <input className="form-control" onChange={queryHandler} value={query} placeholder='Начать поиск...'
                           type="text"/>
                </div>
                <div>
                    <input className="form-control" onChange={dateHandler} value={date} type="date"/>
                </div>
                <div>
                    <Link to={'/add-order'}>
                        <div className={c.addButton}>+</div>
                    </Link>
                </div>
            </div>
            <OrderTable
                order={date ? order.filter(order => order.dateEnd === date) : order}
                deleteHandler={deleteHandler}
                query={query}
            />
        </div>
    )
}