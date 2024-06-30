interface ButtonPropsType {
    text: string;
    handleClick: () => void;
    className?: 'fill'; 
}

const Button: React.FC<ButtonPropsType> = ({text, handleClick, className}) => {
    return (
        <div onClick={()=> handleClick()} className={`Button ${className || ''}`}>
            <p>{text}</p>
        </div>
    )
}

export default Button