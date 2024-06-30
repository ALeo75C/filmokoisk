interface ModalPropsType {
    children: React.ReactNode | null
}

import { createPortal } from "react-dom"

const Modal: React.FC<ModalPropsType> = ({children,}) => {
    return createPortal(<div className="modal">{children}</div>, document.getElementById('root'))
}

export default Modal