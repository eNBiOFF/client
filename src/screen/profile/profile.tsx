import React, { FC, useCallback, useEffect, useState } from 'react'
import { NavBar } from '../../components/nav-bar/nav-bar.component'
import './profile.style.css'

export const Profile: FC = () => {
    const [img, setImg] = useState('')
    const nick = localStorage.getItem('nick') || ''
    const phone = localStorage.getItem('phone') || ''
    const status = localStorage.getItem('status') || ''
    const [login_inp, setLogin_inp] = useState(status)
    const [nick_inp, setNick_inp] = useState(nick)
    const [phone_inp, setPhone_inp] = useState(phone)
    const [state, setState] = useState<File>()


    const ChangeLog = useCallback((ev) => {
        setLogin_inp(ev.target.value)
    }, [login_inp])

    const ChangeNick = useCallback((ev) => {
        setNick_inp(ev.target.value)
    }, [nick_inp])

    const ChangePhone = useCallback((ev) => {
        setPhone_inp(ev.target.value)
        console.log('sds')
    }, [phone_inp])
   

    const onInputFileChange = useCallback( (
        event: any
      ) => {
        event.preventDefault()
        const nativeEvent = event.nativeEvent.target as HTMLInputElement;
        const targetEvent = event.target as HTMLInputElement;
        if (targetEvent.files && targetEvent.files[0]) {
          const imageFile = targetEvent.files[0];
          const data = new FormData()
          data.append('file', imageFile)
          setState(imageFile)
          fetch('/images',{
              method: 'POST',
              headers: {
                // "Content-type": "multipart/form-data",
                'Authorization' : 'Bearer '+ localStorage.getItem('token') 
              },
              body: data
          })
          // eslint-disable-next-line no-param-reassign
          nativeEvent.value = "";
        }
      },[state])

      const save = useCallback(async () => {
        const response = await fetch('/user', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }, 
            body: JSON.stringify({
                "nickname": nick_inp,
                "phoneNumber": phone_inp,
                "status": login_inp
            })
        })
        const data = await response.json()
        console.log(data)
        localStorage.setItem('nick', nick_inp)
        localStorage.setItem('phone', phone_inp)
        localStorage.setItem('status', login_inp)
      },[nick_inp,phone_inp,login_inp])

      useEffect(() => {
        const fetchimg = async () => {
           const response = await fetch('/images/' + localStorage.getItem('id_user'),{
                headers: {
                    'Authorization' : 'Bearer '+ localStorage.getItem('token') 
                }
            })
            const data = await response.blob()
            const reader = new FileReader()
            reader.readAsDataURL(data)
            reader.onloadend = () => {
                const base64url =reader.result?.toString();
                setImg(base64url || '')
            }
            
        }
        console.log('ha')
        setTimeout(() => fetchimg().catch(er => console.error), 200) 
    },[ state])

    return(
    <div className='profile_screen'>
        <NavBar />
        <div className='profile'>
        <form className='' encType="multipart/form-data" method="POST" >
            <div className='avatar' >
                
                <img className='avatar' src={'data:image/jpeg; ' + img} />
                <input type='file' style={{opacity: '0.3'}} onChange={(e) => onInputFileChange(e)} accept='.jpg, .jpeg, .png' multiple />

            </div>
            </form>
            <div className="inputs">
                    <div className='inp_div'>
                        <div className='label_inp'>Статус</div>
                        <input value={login_inp} id="login" className="inp" type={"text"} placeholder={"я крутой"} onChange={(ev) => ChangeLog(ev)}/>
                    </div>
                    <div className='inp_div'>
                        <div className='label_inp'>Никнейм</div>
                        <input value={nick_inp} className="inp" type={"text"} onChange={(ev) => ChangeNick(ev)} />
                    </div>
                    <div className='inp_div'>
                        <div className='label_inp'>Телефон</div>
                        <input value={phone_inp} className="inp" type={"phone"} onChange={(ev) => ChangePhone(ev)} />
                    </div>
                    <div className='SaveButton'>
                        <button className='SaveButton' onClick={() => save()}>Сохранить</button>
                    </div>
            </div>
        </div>

    </div>
    )
    
}