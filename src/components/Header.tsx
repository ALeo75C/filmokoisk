import Button from "./button"
import '../styles/Header.css'

const Header = () => {
    return (
        <div className="Header">
            <a href="/"><h1>Фильмопоиск</h1></a>
            <div className="profileContainer">
                <Button 
                    handleClick={()=>console.log('click')}
                    text="Войти"
                    className="fill"
                />
                <Button 
                    handleClick={()=>console.log('click')}
                    text="Выйти"
                />
            </div>
        </div>
    )
}

export default Header