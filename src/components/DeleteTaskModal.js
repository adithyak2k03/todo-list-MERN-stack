import React from "react";

const DeleteTaskModal = ({ task, isOpen, onClose, onDelete}) =>{

    if(!isOpen) return null;

    const handleDelete = () => {
        onDelete(task._id);
        onClose();
    };

    return(

        <div className="modal-overlay">
            <div className="modal-content">
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