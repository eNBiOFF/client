import React, { FC, useCallback } from 'react'
import './room.css'
import userAva from '../../../assets/userAvatar.png'

interface Prop {
    userName: string,
    id: string,
    setter: Function,
    imgUrlset: Function
}

export const Room: FC<Prop> = (props: Prop) => {
    // const chat = useCallback(async () => {
    //     const response = await fetch('/user')
    // }, [])
    console.log(props.id)

    const onclick = useCallback(() => {
        localStorage.setItem('userTo',props.id);
        localStorage.setItem('usernameTo', props.userName); 
        props.setter(props.userName)
        const fetchimg = async () => {
            const response = await fetch('/images/' + props.id,{
                 headers: {
                     'Authorization' : 'Bearer '+ localStorage.getItem('token') 
                 }
             })
             const data = await response.blob()
             const reader = new FileReader()
             reader.readAsDataURL(data)
             reader.onloadend = () => {
                 const base64url =reader.result?.toString();
                 props.imgUrlset(base64url)
             }
             
         }
         fetchimg()
    }, [])

    return(
        <div>
        <div className="room" onClick={onclick} >
            {/* <div className="ava">
                <img className='avat' src={userAva} alt='' />
            </div> */}
            <div className="info_content">
                <div className="username_info">{props.userName}</div>
                {/* <div className="message_content">mess</div> */}
            </div>
            
        </div>
        <div className="pimp"></div>
        </div>
    )
}