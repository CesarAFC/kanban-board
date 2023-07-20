import { ReactNode } from "react"
import { CgCloseO } from 'react-icons/cg'

type ModalProps = {
    children: ReactNode,
    isOpen: boolean,
    closeModal: () => void,
}

function Modal({children, isOpen, closeModal}: ModalProps) {

    const handleModalContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }
    

  return (
    <article className={`fixed z-50 top-0 left-0 w-screen min-h-screen bg-black/[0.3] justify-center items-center ${isOpen ? 'flex' : 'hidden'} `} onClick={closeModal}>
        <div onClick={handleModalContainerClick} className="relative min-w-[120px] max-w-[280px] min-h-[100px] max-h-[200px] p-3 bg-slate-100 rounded-md shadow-md">
            <button className="absolute top-2 right-2 rounded-full transition hover:bg-slate-300" onClick={closeModal}><CgCloseO /></button>
            {children}
        </div>
    </article>
  )
}

export default Modal