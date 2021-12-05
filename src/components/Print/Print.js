import React from "react";
import ReactToPrint from "react-to-print";
import c from "../ReceiptComponent/ReceiptComponent.module.css";
import {Chek} from "../Chek/Chek";

 class ReceiptComponenT extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className={c.receiptContainer}>
                <Chek id={this.props.id}/>
            </div>
        )
    }

}

export class Example extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <button className={'btn btn-primary'}>Print this out!</button>}
                    content={() => this.componentRef}
                />
                <ReceiptComponenT id={this.props.id} ref={(el) => (this.componentRef = el)} />
            </div>
        );
    }
}

