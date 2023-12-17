import { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from '@emotion/styled';
import { Box, styled } from '@mui/material';


const modalItems: HTMLElement | null = document.getElementById('modals');

type TModal = {
    children: ReactNode;
    onClose: () => void;
    overlay: boolean;
};
export const StyledLink = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
    flexDirection: "column",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    maxWidth: "720px",
    maxHeight: "80vh",
    zIndex: "15",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "6px",
    padding: "6px 6px",
}))


const headerLink = styles.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-end;
  gap: 36px;
`;


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
            <StyledLink >
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
            </StyledLink>
            {overlay ? (<ModalOverlay onClose={onClose} />) : null}
        </>, modalItems!
    )
}

export default Modal;
