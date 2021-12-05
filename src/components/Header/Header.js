import React from 'react'
import {NavLink} from "react-router-dom";
import c from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/reducers/login";


export const Header = () => {
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state => state.login)
    const logOutHandler = () => {
        dispatch(logout())
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to={'/'}>ARM</NavLink>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Заказы</NavLink>
                            </li>
                            <div className={c.test}>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/products">Изделия</NavLink>
                                </li>
                                {isAuthenticated && <li className="nav-item">
                                    <div onClick={logOutHandler} className="nav-link">Выйти</div>
                                </li>}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}