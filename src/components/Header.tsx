import Button from "./button"
import '../styles/Header.css'
import { useState } from "react"
import Modal from "./modal"
import Filter from "./FilterBlock"

import Close  from "../assets/icons/close.svg?react";


const Header = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="Header">
            <a href="/"><h1>Фильмопоиск</h1></a>
            <div className="profileContainer">
                <Button 
                    handleClick={()=>setModalVisible(true)}
                    text="Войти"
                    className="fill"
                />
                <Button 
                    handleClick={()=>console.log('click')}
                    text="Выйти"
                />
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
                </Filter>
            </Modal>}
        </div>
    )
}

export default Header