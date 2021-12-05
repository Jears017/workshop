import React from 'react'
import c from "../Orders/Orders.module.css";
import {Link} from "react-router-dom";


export const OrderTable = (props) => {

    const {order, deleteHandler, query} = props
    return (
        <div className={c.tableWrapper}>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Клиент</th>
                    <th scope="col">Номер</th>
                    <th scope="col">Дата приёма</th>
                    <th scope="col">Дата выдачи</th>
                    <th scope="col">Изделие</th>
                    <th scope="col">Перечень работ</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Внес. сумма</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {order.filter(order => {
                    if (!query) {
                        return order
                    } else if (order.client.toLowerCase().includes(query.toLowerCase())) {
                        return order
                    }
                }).map((receipt, idx) => {
                    return (
                        <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{receipt.client}</td>
                            <td>{receipt.number}</td>
                            <td>{receipt.dateStart.slice(0, 10)}</td>
                            <td>{receipt.dateEnd}</td>
                            <td>{receipt.products.map((res, idx) => <div key={idx}>{res.productName}</div>)}</td>
                            <td>{receipt.products.map((res, idx) => <div key={idx}>{res.action}</div>)}</td>
                            <td>{receipt.sum} руб.</td>
                            <td>{receipt.currentSum} руб.</td>
                            <td>
                                <div className={c.actionSection}>
                                    <Link to={`/edit-order/${receipt._id}`}>
                                        <div className={'btn btn-primary'}>edit</div>
                                    </Link>
                                    <Link to={`/receipt/${receipt._id}`}>
                                        <div className={'btn btn-primary'}>print</div>
                                    </Link>
                                    <input className={'btn btn-primary'}
                                           type="button"
                                           value={'delete'}
                                           onClick={() => deleteHandler(receipt._id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}