import React, { FC, useCallback, useEffect, useState } from 'react'
import './rooms.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import add from '../../assets/fi-rr-add 1.svg'
import { useNavigate } from 'react-router'
import { Room } from './room/roomo'



interface User {
    id: string,
    nickname: string,
    status?: any,
    phoneNumber?: any
}

interface Prop {
    users: User[],
    onclick: Function,
    setImguser: Function
}

export const Rooms: FC<Prop> = (props: Prop) => {
    const [images,setImages] = useState([])
    const navigate = useNavigate()
    
    // const toMess = useCallback(() => {
    //     navigate('/main')
    // },[navigate])

    // const toProfile = useCallback(() => {
    //     navigate('/profile')
    useEffect(() => {
        
    })
    // },[])

    return(
        <div className='rooms'>
            
            <div className='list'>
                {props.users.map((el) => <Room id={el.id} userName={el.nickname} setter={props.onclick} imgUrlset={props.setImguser} /> )}
            </div>
            {/* <div className='pimp' /> */}
               {/* <div className="addButton">
                <div className="info">Нажмите, чтобы добавить нового собеседника</div>
                <div className="icon">
                    <img className='icon' src={add} alt='' />
                </div>
               </div> */}
        </div>
    )
}