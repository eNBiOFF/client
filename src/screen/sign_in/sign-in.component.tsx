import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router";
import './sign-in.style.css'

export const SignInForm : FC = () => {
    const nav = useNavigate()
    const navigateToSignUp = useCallback(() => {
        nav('/sign_up')
    },[])
    return(
        <div className="SignInForm">
            <div className="mymess">MyMess</div>
            <div className="inputs">
                <input className="inp_login" type={"text"} placeholder={"login..."}></input>
                <input className="inp_pass" type={"password"} placeholder={"pass..."} />
            </div>
            <div className="formButtons">
                <button className="button_signIn">Sign in</button>
                <button className="button_signUp" onClick={navigateToSignUp}>Sign up</button>
            </div>
        </div>
    )
} 