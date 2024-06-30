/// <reference types="vite-plugin-svgr/client" />
import Lope  from "../assets/icons/search.svg?react";
import Close  from "../assets/icons/close.svg?react";
import { useEffect, useState } from 'react'
import '../styles/search.css'

interface SearchProps {
    handleSubmit: (args: string) => void;
}

const foo = (val: string): string => {
    return val
};

const Search: React.FC<SearchProps> = ({handleSubmit}) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        const debounce = setTimeout(() => {
            const search = foo(value)
            handleSubmit(search)
        }, 500)
        return () => {clearTimeout(debounce)}
    }, [value, handleSubmit])
    

    
    return (
        <div className="Search">
            <Lope className="lope"/>
            {value ? <Close onClick={() => setValue('')} className="close"/> : ''}
            <input type="text" placeholder='Название фильма' value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}

export default Search