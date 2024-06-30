import { useEffect, useState } from 'react'
import Arrow from '../assets/icons/arrow-right.svg?react'

interface InputPropsType {
    title: string,
    placeholder: string,
    options: {[key in string]: string},
    handleSubmit: (atr: string[]) => void,
    type: string
}
type Selected = string[] 


const Input: React.FC<InputPropsType> = ({title, placeholder, options, handleSubmit, type}) => {
    const [selected, setSelected] = useState<Selected>([])
    const [showDropdown, setShowDropdown] = useState(false)
    
    useEffect(()=>{
        setShowDropdown(false)
        if(selected) {
            if (selected[0]) handleSubmit([type, selected[0]])
        }
    }, [selected])

    
    const renderOptions = (options: {[key in string]: string}) => {
        const optionsItems = []
        for(const key of Object.keys(options)) {
            optionsItems.push(<p key={key} onClick={()=>setSelected([key, options[key]])}>{options[key]}</p>)
        }
        return optionsItems
    }
    
    return (
        <div className="Input">
            <label>{title}</label>
            <div className={`selec-element ${showDropdown ? 'active' : ''}`}>
                <Arrow/>
                <input readOnly type="text" placeholder={placeholder} onClick={()=> setShowDropdown(st =>!st)} value={selected[0] !== '0' ? selected[1] : ''} />
                {showDropdown ? 
                <div className='dropdown'>
                    {renderOptions(options)}
                </div> : ''
                }
            </div>
        </div>
    )
}

export default Input