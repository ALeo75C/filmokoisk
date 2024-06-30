import '../styles/Filter.css'
import React from 'react';

interface FilterPropsType {
    children: React.ReactNode;
}


const Filter: React.FC<FilterPropsType> = ({children}) => {
    return (
        <div className="Filter">
            {children}
        </div>
    )
}

export default Filter