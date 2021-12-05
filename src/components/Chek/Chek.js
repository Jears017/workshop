import React from 'react'
import c from './Chek.module.css'
import {Receipt} from "../Receipt/Receipt";

export const Chek = (props) => {
    return (
        <div className={c.wrapper}>
            <div className={c.partWrapper}>
                <Receipt id={props.id}/>
            </div>
        </div>
    )
}