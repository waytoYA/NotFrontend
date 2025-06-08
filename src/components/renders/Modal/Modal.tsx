import { PropsWithChildren, useEffect, useState } from 'react';
import './Modal.css'
import { ModalCloseIcon } from '@/ui/Icons';

const Modal = ({
    open,
    onClose,
    children,
}: PropsWithChildren<{
    open: boolean;
    onClose: () => void;
}>) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (open) {
            document.getElementById('modal')?.classList.add('show')
            document.getElementById('modal-block')?.classList.add('modal-open')
        } else {
            document.getElementById('modal')?.classList.remove('show')
            document.getElementById('modal-block')?.classList.remove('modal-open')
        }
    }, [isOpen])

    useEffect(() => { setIsOpen(open) }, [open])

    // if (!open) return <></>

    return (
        <div id="modal" className='modal' onClick={onClose}>
            <div id="modal-block" className='modal_block' onClick={e => e.stopPropagation()}>
                
                <div
                    className='modal_block_close'
                    onClick={onClose}
                >
                    <ModalCloseIcon />
                </div>

                {children}

            </div>
        </div>
    )
}

export default Modal;