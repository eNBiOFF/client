import React, { useCallback, useEffect, useState } from 'react'
import './messages.css'
import userAvatar from '../../../assets/userAvatar.png'
import { useNavigate } from 'react-router'

interface props {
    content: string,
    author: string,
    type: string,
    file: {
        filename: string,
        fileID: string
    }
}
export const Message = (props: props) => {
    const [filename, setFileName] = useState('')
    const [blob,setBlob] = useState<Blob>()

    const role = useCallback(async () => {
        console.log(props.type)
        if(props.type === 'File') {
        var a = document.createElement('a');
        if (blob) a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        }
        console.log('ha') 
    },[blob,filename,props.type])
    useEffect(() => {
        if(props.type === 'File') {
            fetch('/file?fileHandle=' + props.content, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                const header =res.headers.get('content-disposition')
                const parts = header!.split(';');
                const filename_header = parts[1].split('=')[1]
                setFileName(filename_header)
                
                res.blob().then(blob => {
                    setBlob(blob)
                })
                
                
                
            })
            // console.log(response.headers)
            
        }
    },[])
    

    return(
        <div className='message_content' onClick={role}>
            <div className='author'>{props.author}</div>
            {/* {props.content} */}
            {props.type === 'File' ? filename : props.content}
            <div>{props.type === 'File' && 'Нажми на меня, чтобы скачать файл'}</div>
        </div>
    )
}