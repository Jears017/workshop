import React from 'react'
import {clearLoginData, setIsAuth, setLoginData, setPasswordData} from "../../store/reducers/login";
import {useDispatch, useSelector} from "react-redux";
import {checkFunction} from "../../utils/Checked";
import c from './Login.module.css'

export const Login = () => {
    const {login, password, isAuthenticated} = useSelector(state => state.login)
    const dispatch = useDispatch()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(setIsAuth(checkFunction(login, password)))
        dispatch(clearLoginData())
    }


    console.log(isAuthenticated)


    const onChangeHandlerLogin = (e) => {
        dispatch(setLoginData(e.target.value))
    }
    const onChangeHandlerPassword = (e) => {
        dispatch(setPasswordData(e.target.value))
    }
    return (
        <div className={c.loginContainer}>
            <div className={c.loginWrapper}>
                <h1 className={c.loginHeader}>Log in:</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className={c.loginInput}>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label"><span className={c.inputText}>Login</span></label>
                            <div className="col-sm-10">
                                <input onChange={onChangeHandlerLogin} value={login} type="text"
                                       className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label"><span className={c.inputText}>Password</span></label>
                        <div className="col-sm-10">
                            <input onChange={onChangeHandlerPassword} value={password} type="password"
                                   className="form-control" autoComplete={"off"}/>
                        </div>
                    </div>
                    <input className='btn btn-primary' type="submit" value={'Log in'}/>
                </form>
            </div>
        </div>
    )
}