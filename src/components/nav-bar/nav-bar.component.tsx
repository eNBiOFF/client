import React, { useCallback } from 'react'
import './nav-bar.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import out from '../../assets/fi-rr-sign-out.png'
import { useNavigate } from 'react-router'

export const NavBar = () => {
    const navigate = useNavigate()
    
    const toMess = useCallback(() => {
        navigate('/main')
    },[navigate])

    const toProfile = useCallback(() => {
        navigate('/profile')
    },[])

    return(
        <div className='NavBar'>
                <div className='NavIcons'>
                    <div onClick={toProfile}>
                        <img src={serch} className='profileicon' alt='' />
                    </div>
                    <div onClick={toMess}>
                        <img src={mess} className='MessIcon' alt='' />
                    </div>
                </div>
                <div className='Exit' style={{marginRight: '20px'}}>
                    <div style={{height: '40px'}}>
                        <img style={{height: '40px'}} src={out} alt='' />
                    </div >
                    <span style={{marginLeft:'10px',height:'40px'}}>выйти</span>
                </div>
        </div>
    )
}