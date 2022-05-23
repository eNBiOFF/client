import React, { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import './sign-in.style.css'

export const SignInForm : FC = () => {
    const [login,setLogin] = useState('')
    const [pass,setpass] = useState('')
    const [error,setErr] = useState(false)

    const nav = useNavigate()
    const navigateToSignUp = useCallback(() => {
        
        nav('/sign_up')
    },[])
    const auth = useCallback(async () => {
        const promise = fetch('/auth',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: login,
                password: pass
            })
        })
        const res = await promise
        const data = await res.json()
        const fetchUser = await fetch('/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ data.accesToken
            }
        })
        const userData = await fetchUser.json()
        console.log(data)
        if (data.errorText) {
            setErr(true)
        } else {
            localStorage.setItem('token',data.accesToken)
            localStorage.setItem('login',login)
            localStorage.setItem('id_user', userData?.id)
            localStorage.setItem('phone', userData?.phoneNumber)
            localStorage.setItem('nick', userData?.nickname)
            
            nav('/main')
        }
    }, [login,pass,nav])

    //             "username": 'username',
    //             "password": '123',
    //             "nickname": 'chulen'

    return(
        <div className="SignInForm">
            <div className="mymess">MyMess</div>
            <div className="inputs">
                <input className="inp_login" type={"text"} placeholder={"login..."} onChange={(e) => setLogin(e.target.value)}></input>
                <input className="inp_pass" type={"password"} placeholder={"pass..."} onChange={(e) => setpass(e.target.value)} />
            </div>
            {
                error &&
                <div style={{color: 'red', fontSize: '24px', width: '80%', height: '30px', backgroundColor: 'white'}}>
                    error
                </div>
            }
            <div className="formButtons">
                <button className="button_signIn" onClick={auth}>Sign in</button>
                <button className="button_signUp" onClick={navigateToSignUp}>Sign up</button>
            </div>
        </div>
    )
} 