import React, { useCallback, useEffect, useState } from 'react'
import './header.style.css'
import userAvatar from '../../../assets/userAvatar.png'
import { useNavigate } from 'react-router'

interface Prop {
    username: string,
    imgUrl: string
}

export const Header = (props: Prop) => {
    const local = localStorage.getItem('userTo') || ''
    const localname = localStorage.getItem('usernameTo') || ''
    const [usename, setUsername] = useState(localname)
    const [userTo, setUserTo] = useState(local)



    
    useEffect(() => {
        setUsername(localname)
        setUserTo(local)
    }, [local,localname,userTo,usename])
    return(
        <div>
        <div className='header'>
            <div className='UserName'>{usename}</div>
            <div className='userAvatar'>
                <img className='userAvatar' src={'data:image/jpeg; ' + props.imgUrl} alt='' />
                
            </div>
            
        </div>
        <div className='pimp' />
        </div>
    )
}