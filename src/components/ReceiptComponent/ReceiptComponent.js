import React, {useEffect, useRef, useState} from 'react'
import c from './ReceiptComponent.module.css'
import axios from "axios";

import {Receipt} from "../Receipt/Receipt";
import {Example} from "../Print/Print";
import ReactToPrint from "react-to-print";




export const ReceiptComponent = (props) => {
    return (
        <div className={c.receiptContainer}>
            <Example id={props.match.params.id}/>
        </div>
    )
}







