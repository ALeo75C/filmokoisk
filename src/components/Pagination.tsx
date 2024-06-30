import Arrow from '../assets/icons/arrow-right.svg?react'

import '../styles/Pagination.css'
import { useSelector } from "react-redux"
import { selectTotalPage } from "../redux/selectors"
import { RootState } from "../redux/store"

interface PafinationPropsType {
    handleClick: (step: number, totalPages: number)=> void,
    page: number
}

const Pagination: React.FC<PafinationPropsType> = ({handleClick, page}) => {
    const totalPages = useSelector((state: RootState) => selectTotalPage(state));
    
    return (
        <div className='Pagination'>
            <div className={`arrowBtn ${page === 1 ? 'disabled' : ''}`} onClick={() => handleClick(-1, totalPages)}><Arrow/></div>
            <p>{page}</p>
            <div className={`arrowBtn ${page === totalPages ? 'disabled' : ''}`}  onClick={() => handleClick(1, totalPages)}><Arrow/></div>
        </div>
    )
}

export default Pagination