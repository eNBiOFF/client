import React, { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import './sign-up.style.css'

export const SignUp: FC = () => {
    const nav = useNavigate()
    const navigateToSignin = useCallback(() => {
        nav('/')
    },[nav])

    const [login,setlogin] = useState('')
    const [nick,setNick] = useState('')
    const [pass, setpass] = useState('')
    const [repass, setrepass] = useState('')

    const [valid,setValid] = useState(true)

    const handleChangeLogin = useCallback((e) => {
        setlogin(e.target.value)
    },[login])
    const handleChangenick= useCallback((e) => {
        setNick(e.target.value)
    },[nick])
    const handleChangepass = useCallback((e) => {
        setpass(e.target.value)
    },[pass])
    const handleChangerepass = useCallback((e) => {
        setrepass(e.target.value)
    },[repass])

    const isValidEmail = useCallback((e)=> {
       const isErrorEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(e.target.value)
       if (!isErrorEmail) {
           setValid(false)
           e.target.style.border = '2px solid red'
       } else {
           setValid(true)
           e.target.style.border = 'none'
       }
    },[valid])

    const registration = useCallback(async ()=>{
        const promise = await fetch('/api/user/register',{
            method: 'POST',
            body: JSON.stringify({
                username: login,
                password: pass,
                nickname: nick
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const response = await promise.json()
        console.log(response)
        response.reason ? setValid(false) : nav('/')
    },[login, pass, nick])
    return(
        <div className='signupForm'>
            <div className="mymess">MyMess</div>
            <div className="inputs">
                <div className='inp_div'>
                    <div className='label_inp'>Введите ваш login</div>
                    <input id="login" className="inp" type={"text"} placeholder={"example@mail.com"} onChange={handleChangeLogin} onBlur={isValidEmail} value={login}/>
                </div>
                <div className='inp_div'>
                    <div className='label_inp'>Придумайте ваш никнейм</div>
                    <input className="inp" type={"text"} onChange={handleChangenick} />
                </div>
                <div className='inp_div'>
                    <div className='label_inp'>Придумайте пароль</div>
                    <input className="inp" type={"password"} onChange={handleChangepass} />
                </div>
                <div className='inp_div'>
                    <div className='label_inp'>Повторите пароль</div>
                    <input className="inp" type={"password"} onChange={handleChangerepass} />
                </div>
            </div>
            <div className="formButtons_reg">
                <button className="button_reg" onClick={registration}>Registration</button>
                <button className="button_back" onClick={navigateToSignin}>Отмена</button>
            </div>
        </div>
    )
}