import React, { useCallback } from 'react'
import './rooms.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import add from '../../assets/fi-rr-add 1.svg'
import { useNavigate } from 'react-router'
import { Room } from './room/roomo'

export const Rooms = () => {
    const navigate = useNavigate()
    
    // const toMess = useCallback(() => {
    //     navigate('/main')
    // },[navigate])

    // const toProfile = useCallback(() => {
    //     navigate('/profile')
    // },[])

    return(
        <div className='rooms'>
            
            <div className='list'>
                <Room />
                <Room />
            </div>
            <div className='pimp' />
               <div className="addButton">
                <div className="info">Нажмите, чтобы добавить нового собеседника</div>
                <div className="icon">
                    <img className='icon' src={add} alt='' />
                </div>
               </div>
        </div>
    )
}