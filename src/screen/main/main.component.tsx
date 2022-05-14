import React, { useCallback } from 'react'
import './main.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import out from '../../assets/fi-rr-sign-out.png'
import { useNavigate } from 'react-router'
import { NavBar } from '../../components/nav-bar/nav-bar.component'
import { Messenger } from '../../components/messenger/messenger.component'
import { Rooms } from '../../components/rooms/rooms.component'

export const MainPage = () => {
    const navigate = useNavigate()
    
    const toMess = useCallback(() => {
        navigate('/main')
    },[navigate])

    const toProfile = useCallback(() => {
        navigate('/profile')
    },[])

    return(
        <div className='Mainpage'>
            <NavBar />
            <div style={{width: '100%',marginTop: '30px',display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'space-evenly'}}>
            <Rooms />
            <Messenger />
            
            </div>
        </div>
    )
}