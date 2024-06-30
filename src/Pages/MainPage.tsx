import MovieCardCollection from "../components/MovieCardsCollection";
import Search from "../components/search";

import { useDispatch} from "react-redux";
import { getMovies } from "../redux/thunk";
import Pagination from "../components/Pagination";
import { ArgsType } from "../types";
import { AppDispatch } from "../redux/store";
import Filter from "../components/FilterBlock";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "../components/DropDownInput";

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

export default function MainPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState<string | null>(searchParams.get('title'))
    const [year, setYear] = useState<string | null>(searchParams.get('release_year'))
    const [genre, setGenre] = useState<string | null>(searchParams.get('genre'))
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('pafe')) || 1)
    const [reloadFlag, setreloadFlag] = useState<boolean>(true)

    const dispatch: AppDispatch = useDispatch()

    const changeFilters = (atr: string[]) => {
        if (atr[0] === 'genre') {
            setGenre(atr[1] !== '0' ? atr[1] : null)
        } else {
            setYear(atr[1] !== '0' ? atr[1] : null) 
        }
    }
    const changeCurentPage = (step: number, totalPages: number) => {
        const newPage = currentPage + step
        if (newPage && newPage<= totalPages) setCurrentPage(newPage)
    }

    useEffect(() => {
        setCurrentPage(1)
        if (reloadFlag) setreloadFlag(false)
        }, [search, year, genre])
    
    useEffect(() => {
        if (reloadFlag) setreloadFlag(false)
    }, [currentPage])

    useEffect(() => {
        const arg: ArgsType = {
            "title": search || '',
            "genre": genre || '',
            "release_year": year || '',
            "page": currentPage
        }
        if (!reloadFlag) {
            dispatch(getMovies(arg))
            const params: {[key in string]: string} = {}
            for(const key of Object.keys(arg)) {
                if (arg[key]) {
                    params[key] = String(arg[key])
                }
            }
            setSearchParams(params)
            setreloadFlag(true)
        }
    }, [reloadFlag])

    return (
        <div className="MainPage">
            <Filter>
                <h3>Фильтр</h3>
                <Input placeholder='Выберите жанр' title="Жанр" options={GENRES} handleSubmit={changeFilters} type='genre'/>
                <Input placeholder='Выберите год' title="Год выпуска" options={YEARS} handleSubmit={changeFilters} type='release_year'/>
            </Filter>
            <div className="right">
                <Search handleSubmit={setSearch}/>
                <MovieCardCollection/>
                <Pagination handleClick={changeCurentPage} page={currentPage}/>
            </div>
        </div>
    )
}