import { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { StyledBoxOverlay } from '../../constants/constant-mui';


const modalItems: HTMLElement | null = document.getElementById('modals');

type TModal = {
    children: ReactNode;
    onClose: () => void;
    overlay: boolean;
};

const Modal: FC<TModal> = ({ onClose, children, overlay = true }) => {
    useEffect(() => {
        const removeModal = (e: KeyboardEvent) => {
            e.key === 'Escape' && onClose();
        }

        modalItems!.classList.add('modalWrapper');
        document.addEventListener('keydown', removeModal);

        return () => {
            document.removeEventListener('keydown', removeModal);
            modalItems!.classList.remove('modalWrapper');

        }
    }, [onClose]);


    return ReactDOM.createPortal(
        <>
            <StyledBoxOverlay >
                {/* <headerLink>
                    <div
                        className={styles.icon}
                        data-testid='close-modal'
                        onClick={onClose}
                        >
                        <CloseIcon type="primary" />
                    </div>
                </headerLink> */}
                <div >
                    {children}
                </div>
            </StyledBoxOverlay>
            {overlay ? (<ModalOverlay onClose={onClose} />) : null}
        </>, modalItems!
    )
}

export default Modal;
