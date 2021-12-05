import React from 'react'
import './App.css';
import {Orders} from "./components/Orders/Orders";
import {Header} from "./components/Header/Header";
import {Route} from "react-router-dom";
import {CreateOrder} from "./components/Create-Order/Create-Order";
import {Products} from "./components/Products/Products";
import {CreateProduct} from "./components/Create-Product/Create-Product";
import {EditProduct} from "./components/Edit-Product/Edit-Product";
import {EditOrder} from "./components/Edit-Order/Edit-Order";
import {Example, ReceiptComponent} from "./components/ReceiptComponent/ReceiptComponent";
import {Login} from "./components/Login/Login";
import {useSelector} from "react-redux";

function App() {
    const {isAuthenticated} = useSelector(state => state.login)
    return (
        <div className="main">
            <Header/>
            {!isAuthenticated && <Login/>}
            {isAuthenticated && <>
                <Route exact path='/' component={Orders}/>
                <Route exact path='/add-order' component={CreateOrder}/>
                <Route exact path='/products' component={Products}/>
                <Route exact path='/create-product' component={CreateProduct}/>
                <Route exact path='/edit-product/:id' component={EditProduct}/>
                <Route exact path='/edit-order/:id' component={EditOrder}/>
                <Route exact path='/receipt/:id' component={ReceiptComponent}/>
            </>
            }
        </div>
    );
}

export default App;
