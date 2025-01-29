import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditTaskModal = ({task, isOpen, onClose, onSave }) => {

    const [newTask, setNewTask] = useState(task?.text || "");

    const handleSave = () =>{
        onSave(task._id, newTask);
        onClose();
    };

    if(!isOpen) return null;

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
                <h2>Edit Task</h2>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e)=> setNewTask(e.target.value)}
                    // placeholder="Enter new task name"
                    placeholder={task.text}
                />
                <div>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;