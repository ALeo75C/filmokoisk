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


export default function MainPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState<string | null>(searchParams.get('title'))
    const [year, setYear] = useState<string | null>(searchParams.get('release_year'))
    const [genre, setGenre] = useState<string | null>(searchParams.get('genre'))
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('pafe')) || 1)
    const [reloadFlag, setreloadFlag] = useState<boolean>(true)

    const dispatch: AppDispatch = useDispatch()

    const changeFilters = (genre: string | undefined, year: string | undefined) => {
        if (genre) setGenre(genre !== '0' ? genre : null)
        if (year) setYear(year !== '0' ? year : null)      
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
            <Filter handleSubmit={changeFilters}/>
            <div className="right">
                <Search handleSubmit={setSearch}/>
                <MovieCardCollection/>
                <Pagination handleClick={changeCurentPage} page={currentPage}/>
            </div>
        </div>
    )
}