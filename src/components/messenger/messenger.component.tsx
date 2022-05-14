import React, { useCallback } from 'react'
import './messenger.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import out from '../../assets/fi-rr-sign-out.png'
import { useNavigate } from 'react-router'
import { Header } from './header/header.component'
import { Footer } from './footer/footer'

export const Messenger = () => {
    const navigate = useNavigate()
    
    const toMess = useCallback(() => {
        navigate('/main')
    },[navigate])

    const toProfile = useCallback(() => {
        navigate('/profile')
    },[])

    return(
        <div className='mess'>
        <Header />
        <Footer />
        </div>
    )
}