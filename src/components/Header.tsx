import Button from "./button"
import '../styles/Header.css'
import { useEffect, useState } from "react"
import Modal from "./modal"
import Filter from "./FilterBlock"

import Close  from "../assets/icons/close.svg?react";
import Person  from "../assets/icons/person.svg?react";
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../redux/thunk"
import { AppDispatch, RootState } from "../redux/store"
import { addUser, deleteUser } from "../redux/slises/userSlise"

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const user = useSelector((state: RootState) => state.user.token);
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const tk = localStorage.getItem('token')
        if (tk) {
            dispatch(addUser(tk))
        }
    }, [])

    useEffect(() => {
        if (user) localStorage.setItem('token', user)
    }, [user])
    
    
    const handleSubmit = () => {
        const args = {
            "username": login,
            "password": password
        }
        dispatch(getUser(args)).then(()=> setModalVisible(false))
    }

    return (
        <div className="Header">
            <a href="/"><h1>Фильмопоиск</h1></a>
            <div className="profileContainer">
                {user ? 
                    <div className="block">
                        <Person/>
                        <Button 
                            handleClick={()=>dispatch(deleteUser())}
                            text="Выйти"
                        />
                    </div>
                    :
                        <Button 
                            handleClick={()=>setModalVisible(true)}
                            text="Войти"
                            className="fill"
                        />
                }
            </div>
            {modalVisible && 
            <Modal>
                <Filter>
                    <Close onClick={() => setModalVisible(false)}/>
                    <h3>Авторизация</h3>
                    <div className="textInput">
                        <p>Логин</p>
                        <input type="text" placeholder='Логин' value={login} onChange={(e) => {e.stopPropagation(); setLogin(e.target.value)}}/>
                    </div>
                    <div className="textInput">
                        <p>Пароль</p>
                        <input type="text" placeholder='Логин' value={password} onChange={(e) => {e.stopPropagation(); setPassword(e.target.value)}}/>
                    </div>
                    <div className="Btns">
                        <Button text='Войти' className="fill" handleClick={handleSubmit}/>
                        <Button text='Отменить' handleClick={() => setModalVisible(false)}/>
                    </div>
                </Filter>
            </Modal>}
        </div>
    )
}

export default Header