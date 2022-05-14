import React from 'react'
import './room.css'
import userAva from '../../../assets/userAvatar.png'

export const Room = () => {


    return(
        <div>
        <div className="room">
            <div className="ava">
                <img className='avat' src={userAva} alt='' />
            </div>
            <div className="info_content">
                <div className="username_info">UserName</div>
                <div className="message_content">mess</div>
            </div>
            
        </div>
        <div className="pimp"></div>
        </div>
    )
}