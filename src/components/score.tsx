/// <reference types="vite-plugin-svgr/client" />
import Star  from "../assets/icons/star.svg?react";

import '../styles/Score.css'

interface ScotePropsType {
    val: number,
}

const createScoreItems = (count: number, score: number) => {
    const handleClick = (e, val: number) => {
        e.stopPropagation()
        console.log(val)
    }
    const items = []
    let currScore = Math.round(score)
    for (let index = 1; index <= count; index++) {
        items.push(
            <div onClick={(e) => handleClick(e, index)} key={index} className={`point ${currScore>0 ? 'active' : ''}`}>
                <Star/>
                <span>{index}</span>
            </div>
        )
        currScore--
    }
    return <div className='Score'>{items}</div>
}

const Score: React.FC<ScotePropsType> = ({val}) => {
    return createScoreItems(5, val)
}

export default Score