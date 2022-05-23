import React, { useCallback, useEffect, useRef, useState } from 'react'
import './messenger.style.css'
import serch from '../../assets/fi-rr-search.svg'
import mess from '../../assets/fi-rr-envelope_pink.png'
import out from '../../assets/fi-rr-sign-out.png'
import { useNavigate } from 'react-router'
import { Header } from './header/header.component'
import { Footer } from './footer/footer'
import { Message } from './messages/messages.component'
interface Filefield {
    fileID: string,
    file_name: string
}
interface Message_Arr {
    userTo: string,
    messageType: 'Text' | 'File',
    content?: string
    fileID?: string 
    File?: Filefield
}
interface Prop {
    username: string,
    imgurl: string
}

export const Messenger = (props: Prop) => {
    const local =  localStorage.getItem('userTo') || ''
    const [mess,setMess] = useState<Message_Arr[]>([])
    const [filename,setFilename] = useState('')
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const refer = useRef<HTMLDivElement>(null)
    
    const toMess = useCallback(() => {
        navigate('/main')
    },[navigate])

    const toProfile = useCallback(() => {
        navigate('/profile')
    },[])
    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch('/messenger/history/' + local,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const data = await response.json()
            setMess(data)
            setLoading(false)
        }
        refer && refer.current?.scrollTo({top: refer.current?.scrollHeight}) 
        fetchHistory().catch(e => console.error);
        
        // eslint-disable-next-line no-use-before-define
        
    },[loading,local, refer.current])

    const addMess = (message_new: Message_Arr) => {
        setLoading(true)
        // setMess(mess => [...mess,message_new])
       // setLoading(false)
    }

    return(
        <div className='mess'>
        <Header  username={props.username} imgUrl={props.imgurl}/>
        <div ref={refer} style={{boxSizing: 'border-box', height:'400px', overflow:'scroll', scrollBehavior: 'smooth'}}>
        {!loading ? mess.map((el) => el.userTo == localStorage.getItem('id_user') ?  <Message type={el.messageType} content={el.content || el.fileID || '-'} author={props.username} file={el.messageType === 'File' ? {filename: filename, fileID: el.fileID || ''} : {filename:'',fileID:''}}  /> : <Message type={el.messageType} content={el.content || el.fileID || ''} author={localStorage.getItem('nick') || ''} file={el.messageType === 'File' ? {filename: filename, fileID: el.fileID || ''} : {filename:'',fileID:''}} />
        ) : 'loading'}
        
        </div>
        <Footer add={addMess} filenameF={(val: string) => setFilename(val)} setLoading={(val: boolean) => setLoading(val)} />
        </div>
    )
}
//'ws://localhost/api/messenger/connect?accessToken=' + localStorage.getItem('token')