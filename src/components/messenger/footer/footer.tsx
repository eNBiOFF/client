import React, { useCallback } from 'react'
import './footer.css'
import userAvatar from '../../../assets/userAvatar.png'
import { useNavigate } from 'react-router'
import send from '../../../assets/sent.png'
import smile from '../../../assets/fi-rr-smile 1.png'
import doc from '../../../assets/fi-rr-document 1.png'

export const Footer = () => {

    return(
        <div className='footer'>
        <div className='input'>
            <div className='smail'>
            <img className='doci' src={smile} alt='' />
            </div>
            <input className='message'></input>
            <div className='doc'>
            <img className='doci' src={doc} alt='' />
            </div>
        </div>
        <div className='send'>
            <img className='send' src={send} alt='' />
        </div>
        </div>
    )
}