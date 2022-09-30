import React from 'react'
import { Modal } from 'react-bootstrap'
import { GrClose} from "react-icons/gr"
import "./SiteModal.scss";

export interface IModalInfo {
    modalTitle: string;
    show: boolean;
    handleClose: () => void;
    children: JSX.Element | JSX.Element[];
    size: string;

}

const SiteModal: React.FC<IModalInfo> = ({ modalTitle, show, handleClose, children }) => {
    return (
        <Modal className={"site_modal"} size={'lg'} show={show}>
            <Modal.Header className={"d-flex justify-center-between"}>
                    <Modal.Title>{modalTitle}</Modal.Title>
                    <GrClose onClick={handleClose} className={"close_modal"}  />
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}

export default SiteModal
