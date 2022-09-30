import React from 'react';
import {Modal} from "react-bootstrap";

interface IDeleteModal {
    show: boolean,
    onSubmit: () => void,
    onClose: () => void
}

const DeleteModal: React.FC<IDeleteModal> = ({ show, onClose, onSubmit }) => {
    return (
        <Modal show={show} centered={true} className={'w-100 justify-content-center'}>
            <Modal.Body>
                <h5 className={'text-muted my-3'}>Are you sure you want to delete?</h5>
                <div className={"d-flex justify-content-center w-100"}>
                    <button onClick={onSubmit} className={" btn btn-success mx-2"}>Yes</button>
                    <button onClick={onClose} className={" btn btn-danger mx-2"}>No</button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default DeleteModal;