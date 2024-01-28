import { FC } from 'react';
import styles from '@emotion/styled';
import { Box, styled } from '@mui/material';

type TModalOverlay = {
    onClose: () => void;
    taskOverlay: boolean
}
const OverlayLink = styles.div`
    background-color: #F2F2F2;
    opacity: 0.2;
    z-index: 14;
    cursor: pointer;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0
`;


const OverlayLinkTasks = styled(Box)(({ theme }) => ({
    background: theme.palette.mode === "dark" ?
        '100% linear-gradient(to right, #01333F, #02124A)' :
        'linear-gradient(to right, #0C5D71, #041654) transparent',
    opacity: 0.8,
    zIndex: 14,
    cursor: 'pointer',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}));

const ModalOverlay: FC<TModalOverlay> = ({ onClose, taskOverlay }) => {
    return (
        <div onClick={onClose} >{
            taskOverlay ?
                <OverlayLinkTasks></OverlayLinkTasks> :
                <OverlayLink ></OverlayLink>
        }
        </div>
    )
}

export default ModalOverlay;
