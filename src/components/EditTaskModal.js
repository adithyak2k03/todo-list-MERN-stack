import React, { useState } from "react";

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
                <h2>Edit Task</h2>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e)=> setNewTask(e.target.value)}
                    placeholder="Enter new task name"
                />
                <div>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;