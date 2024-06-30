import { useEffect, useRef, useState } from "react";
import Arrow from '../assets/icons/arrow-right.svg?react'

import { Actor } from "../types";

interface FilterPropsType {
    actors: Actor[] | undefined,
}

const step = 300

const ActorsBlock: React.FC<FilterPropsType> = ({actors}) => {
    const [scrolled, setScrolled] = useState(false)
    const [canScrolled, setCanScrolled] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    const scrollContainerRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(()=> {
        setCanScrolled(scrollContainerRef?.current.clientWidth >= wrapperRef.current.clientWidth)
    }, [])

    useEffect(()=> {
        if (scrollPosition + wrapperRef.current.clientWidth >= scrollContainerRef?.current.clientWidth) setCanScrolled(false)
        if (scrollPosition <= 0) setScrolled(false)
    }, [scrollPosition])
    
    const scrollRight = () => {
        setScrolled(true)
        setScrollPosition(position => position + step)
        
        console.log(scrollContainerRef?.current.clientWidth, wrapperRef.current.clientWidth)
        wrapperRef.current.scrollBy({ left: step, behavior: 'smooth' });
    };
    
    const scrollLeft = () => {
        setCanScrolled(true)
        setScrollPosition(position => position - step)
        wrapperRef.current.scrollBy({ left: -step, behavior: 'smooth' });
    };
    
    return (
      <div className="actorsBlock">
        <h2>Актеры</h2>
        {scrolled ? <Arrow className="scrollBtn left" onClick={scrollLeft}/> : ''}
        <div className="wrapper" ref={wrapperRef}>
            <div ref={scrollContainerRef} className="actorsCardCollection">
                {
                    actors?.map((actor, i) => {
                        return (
                            <div className="actorCard" key={i}>
                                <div className="actorPhoto poster" style={{backgroundImage: `url(${actor.photo})`}} />
                                <p>{actor.name}</p>
                                </div>
                    )})
                }
            </div>
        </div>
        { canScrolled ? <Arrow className="scrollBtn right" onClick={scrollRight}/> : '' }
      </div>
    );
}

export default ActorsBlock