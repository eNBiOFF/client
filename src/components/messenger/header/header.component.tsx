import React, { useCallback } from 'react'
import './header.style.css'
import userAvatar from '../../../assets/userAvatar.png'
import { useNavigate } from 'react-router'

export const Header = () => {

    return(
        <div>
        <div className='header'>
            <div className='UserName'>UserName</div>
            <div className='userAvatar'>
                <img src={userAvatar} alt='' />
                
            </div>
            
        </div>
        <div className='pimp' />
        </div>
    )
}