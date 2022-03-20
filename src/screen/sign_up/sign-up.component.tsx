import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router";
import './sign-up.style.css'

export const SignUp: FC = () => {
    const nav = useNavigate()
    const navigateToSignin = useCallback(() => {
        nav('/')
    },[])
    return(
        <div className='signupForm'>
            <div className="mymess">MyMess</div>
            <div className="inputs">
                <div className='inp_div'>
                    <div className='label_inp'>Введите ваш login</div>
                    <input className="inp" type={"text"} placeholder={"example@mail.com"} />
                </div>
                <div className='inp_div'>
                    <div className='label_inp'>Придумайте ваш никнейм</div>
                    <input className="inp" type={"text"} />
                </div>
                <div className='inp_div'>
                    <div className='label_inp'>Придумайте пароль</div>
                    <input className="inp" type={"password"} />
                </div>
                <div className='inp_div'>
                    <div className='label_inp'>Повторите пароль</div>
                    <input className="inp" type={"password"} />
                </div>
            </div>
            <div className="formButtons_reg">
                <button className="button_reg">Registration</button>
                <button className="button_back" onClick={navigateToSignin}>Отмена</button>
            </div>
        </div>
    )
}