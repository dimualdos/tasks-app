import { FC } from 'react';
import styles from '@emotion/styled';

type TModalOverlay = {
    onClose: () => void;
}
const OverlayLink = styles.div`
background-color: #F2F2F2;
opacity: 0.1;
z-index: 14;
cursor: pointer;
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0
`;

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
    return (
        <OverlayLink onClick={onClose} ></OverlayLink>
    )
}

export default ModalOverlay;
