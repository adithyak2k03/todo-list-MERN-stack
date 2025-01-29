import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteTaskModal = ({ task, isOpen, onClose, onDelete}) =>{

    if(!isOpen) return null;

    const handleDelete = () => {
        onDelete(task._id);
        onClose();
    };

    return(

        <div className="modal-overlay">
            <div className="modal-content">
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
                <h2>Are you sure you want to delete this task?</h2>
                <p>{task?.text}</p>
                <div>
                    <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;