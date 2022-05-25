import React, { useCallback, useState, useRef, useEffect } from 'react'
import './footer.css'
import userAvatar from '../../../assets/userAvatar.png'
import { useNavigate } from 'react-router'
import send from '../../../assets/sent.png'
import smile from '../../../assets/fi-rr-smile 1.png'
import doc from '../../../assets/fi-rr-document 1.png'
import { io } from 'socket.io-client'
import { join } from 'node:path/win32'
import { responseInterceptor } from 'http-proxy-middleware'
interface prop {
    add: Function,
    filenameF: Function,
    setLoading: Function
}
export const Footer = (props: prop) => {
    const [isPaused, setIsPaused] = useState(false);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("");
    const [showsmile,setsmile] = useState(false)
    //const init = new WebSocket('ws://localhost/api/messenger/connect?accessToken=' + localStorage.getItem('token'))
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment

    const ws = useRef<WebSocket |  null>(null);
    const [messagei, setMessagei] = useState("")
    console.log(messagei)
    useEffect( () => {
        fetch('/api/messenger/history', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        if (!isPaused) {
            ws.current = new WebSocket('ws://localhost/api/messenger/connect?accessToken=' + localStorage.getItem('token'))

            ws.current.onopen = () => {
                console.log('fsdfds')
                
            }
            ws.current.onclose = () => {
                console.log('hahahha')
            }
            
            ws.current.onmessage = (ev) => {
                props.setLoading(true)
            }
            gettingData();
        }

       
    }, [ws,isPaused]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        
    }, [isPaused]);

    const send_mess = useCallback(async () => {
        
        const data = JSON.stringify({
            userTo: localStorage.getItem('userTo'),
            messageType: 'Text',
            content: messagei
        })
        ws?.current?.send(data)
        props.add(data)
        setMessagei('')
    },[ws, messagei])

    const onInputFileChange = useCallback( async (
        event: any
      ) => {
        event.preventDefault()
        const nativeEvent = event.nativeEvent.target as HTMLInputElement;
        const targetEvent = event.target as HTMLInputElement;
        if (targetEvent.files && targetEvent.files[0]) {
          const file = targetEvent.files[0];
          props.filenameF(file.name)
          const data = new FormData()
          data.append('file', file)
          await fetch('/api/file',{
              method: 'POST',
              headers: {
                // "Content-type": "multipart/form-data",
                'Authorization' : 'Bearer '+ localStorage.getItem('token') 
              },
              body: data
          }).then((res) => res.json()).then(
              (data) => {
                const message = JSON.stringify({
                    userTo: localStorage.getItem('userTo'),
                    messageType: 'File',
                    fileId: data.fileHandle
                })
                ws?.current?.send(message)
                props.add(message)
              }
          )
          // eslint-disable-next-line no-param-reassign
          nativeEvent.value = "";

          
        }
      },[])

    useEffect(()=>{
        return () => {
            ws?.current && ws.current.close()
            console.log('ahhahah')
        }
    },[ws])
    return(
        <div className='footer'>
            {showsmile &&
            <div style={{position: 'absolute', height: '24px', width: '76px', left:'310px', bottom: '90px', backgroundColor: 'gray',cursor:'pointer', fontSize:'16px', borderRadius:'10px', paddingLeft: '2px'}}>
               <span onClick={() => setMessagei(messagei + "🤗")}>🤗  </span>
               <span onClick={() => setMessagei(messagei + "😁")}>😁  </span> 
               <span onClick={() => setMessagei(messagei + "😂")}>😂</span>
            </div>}
        <div className='input'>
            <div className='smail' onClick={() => setsmile(!showsmile)}>
                
            <img className='doci' src={smile} alt='' />
            </div>
            <input value={messagei} className='message' onChange={(e) => setMessagei(e.target.value)} ></input>
            <div className='doc'>
            <form >
                    <input type={'file'} onChange={(e) => onInputFileChange(e)} />
            </form>
            </div>
        </div>
        <div className='send' onClick={send_mess}>
            <img className='send' src={send} alt='' />
        </div>
        </div>
    )
}