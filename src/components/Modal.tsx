import { ReactElement } from "react"
import { CgCloseO } from 'react-icons/cg'

type ModalProps = {
    children: ReactElement
}

function Modal({children}: ModalProps) {
  return (
    <article>
        <div>
            <button><CgCloseO /></button>
            {children}
        </div>
    </article>
  )
}

export default Modal