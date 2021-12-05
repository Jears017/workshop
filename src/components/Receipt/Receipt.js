import React, {useEffect, useState} from 'react'
import c from './Receipt.module.css'
import axios from 'axios'


export const Receipt = (props) => {
    const initialState = {
        client: '',
        dateEnd: '',
        dateStart: '',
        number: '',
        products: [],
        currentSum: ''
    }
    const [receipt, setReceipt] = useState(initialState)
    useEffect(() => {
        axios.get(`https://workshop-application77.herokuapp.com/api/receipt/${props.id}`).then(res => setReceipt(prevState => {
            return {
                ...prevState,
                client: res.data.client,
                number: res.data.number,
                dateStart: res.data.dateStart,
                dateEnd: res.data.dateEnd,
                products: [...res.data.products],
                sum: res.data.sum,
                currentSum: res.data.currentSum
            }
        }))
    }, [])
    return (
        <div className={c.receipt}>
            <div className={c.receiptDates}>
                <div>
                    <div>Режим работы:</div>
                    <div>ПН-ЧТ 10-19</div>
                    <div>Перерыв с 14-15</div>
                    <div>ПТ 10-16</div>
                    <div>Без перерыва</div>
                    <div>+375298611911</div>
                </div>
                <div>
                    <div>Дата приёма заказа: {receipt.dateStart.slice(0, 10)}</div>
                    <div>Дата выдачи заказа: {receipt.dateEnd}</div>
                </div>
            </div>
            <div className={c.receiptTitle}>
                <h3>Квитанция</h3>
            </div>
            <div className={c.receiptClient}>
                <div>Заказачик: {receipt.client}</div>
                <div>Телефон: +375{receipt.number}</div>
            </div>
            <div className={c.receiptTableWrapper}>
                <div className={c.receiptTable}>
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
                </div>
                <div className={c.receiptSum}>
                    <div>Внесено: {receipt.currentSum > 0 ? <span className={c.currentSum}> {receipt.currentSum} руб.</span>: <span>______________</span>}</div>
                    <div> Итого: {receipt.sum} руб.</div>
                </div>
            </div>
        </div>
    )
}