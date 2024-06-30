// import Button from "./button"
import { useEffect, useState } from 'react'
import '../styles/Filter.css'
import Input from "./Input"

interface FilterPropsType {
    handleSubmit: (genre: string | undefined, year: string | undefined) => void,
}

type StateType = string

const GENRES = {
    '0': 'Не выбран',
    comedy: 'Комедия',
    drama: 'Драма',
    action: 'Боевик',
    thriller: 'Триллер',
    horror: 'Ужасы',
    family: 'Семейный',
    cartoon: 'Анимированный',
    fantasy: 'Фэнтези',
    romance: 'Романтика',
    adventure: 'Приключения',
    musical: 'Мьюзикл',
    war: 'Военный',
}
const YEARS = {
    '0': 'Не выбран',
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
}

const Filter: React.FC<FilterPropsType> = ({handleSubmit}) => {
    const [currentGenre, setCurentGenre] = useState<StateType>() 
    const [currentYear, setCurentYear] = useState<StateType>() 

    const changeState = (atr: string[]) => {
        if (atr[0] === 'genre') {
            setCurentGenre(atr[1])
        } else {
            setCurentYear(atr[1])
        }
    }
    useEffect(()=> {
        handleSubmit(currentGenre, currentYear)
    }, [currentGenre, currentYear])

    return (
        <div className="Filter">
            <h3>Фильтр</h3>
            <Input placeholder='Выберите жанр' title="Жанр" options={GENRES} handleSubmit={changeState} type='genre'/>
            <Input placeholder='Выберите год' title="Год выпуска" options={YEARS} handleSubmit={changeState} type='release_year'/>
        </div>
    )
}

export default Filter