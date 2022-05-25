import React, { useCallback, useEffect, useState } from 'react'
import './main.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import out from '../../assets/fi-rr-sign-out.png'
import { useNavigate } from 'react-router'
import { NavBar } from '../../components/nav-bar/nav-bar.component'
import { Messenger } from '../../components/messenger/messenger.component'
import { Rooms } from '../../components/rooms/rooms.component'
import { io } from 'socket.io-client'

export const MainPage = () => {
    const [users,setUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [imguser,setImguser] = useState('')
    
    const navigate = useNavigate()
    
    const toMess = useCallback(() => {
        navigate('/main')
    },[navigate])

    const toProfile = useCallback(() => {
        navigate('/profile')
    },[])
    // const manager = io("ws://localhost/messenger/connect", {
    // reconnectionDelayMax: 10000,
    // auth: {
    //     token: localStorage.getItem('token')
    // }
    // });
    // console.log(manager) 

    useEffect(  () => {
        const  responseUsers = async () => {
            const promise = await fetch('/api/user/all', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer '+ localStorage.getItem('token') 
                    }
                })
            const data = await promise.json()
            setUsers(data)
            localStorage.setItem('userTo', data[0].id)
            localStorage.setItem('usernameTo', data[0].nickname)
        }
        
        responseUsers().catch(er => console.error)
        
       
     
     
     
       
    },[])

    return(
        <div className='Mainpage'>
            <NavBar />
            <div style={{width: '100%',marginTop: '30px',display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'space-evenly'}}>
            <Rooms users={users} onclick={setUserName} setImguser={setImguser} />
            <Messenger username={userName} imgurl={imguser} />
            
            </div>
        </div>
    )
}