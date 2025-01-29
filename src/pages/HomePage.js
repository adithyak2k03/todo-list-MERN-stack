import React, {useEffect, useState} from "react";
import "../stylesheets/HomePage.css";
import Task from "../components/Task";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { fetchTasks, addTask, toggleTask, editTask, deleteTask } from "../services/api"



const HomePage = (props) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleFetchTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    const newTask = await addTask(inputValue);
    if (newTask) {
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setInputValue("");
    }
  };

  const handleToggleTask = async (id) => {
    const updatedTask = await toggleTask(id, !tasks.find((t) => t._id === id).completed);
    if (updatedTask) {
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === id ? updatedTask : t)));
    }
  };

  const handleEditTask = async (id, newText) => {
    const updatedTask = await editTask(id, newText);
    if (updatedTask) {
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === id ? updatedTask : t)));
    }
  };

  const handleDeleteTask = async (id) => {
    const success = await deleteTask(id);
    if (success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };



  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  }

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
  }

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentTask(null);
  }

  useEffect(()=>{
    handleFetchTasks();
  },[]);

    return(
        <>
          <div className="page-title">
            <h1>TODO LIST</h1>
          </div>

          <div className="input-n-list">
            <div className="input-n-btn">
              <input 
                className="input-field" 
                type="text" 
                placeholder="add item..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleAddTask}
                type="submit"
              >Add</button>
            </div>

            <ul className="task-list">
            {tasks.map((task)=>(
              <li key={task._id}>
                <Task
                  task={task}
                  toggleTask={handleToggleTask}
                  onEdit={() => openEditModal(task)}
                  onDelete={()=> openDeleteModal(task)}
                />
              </li>
            ))}
            </ul>

          </div>

          <EditTaskModal
            task={currentTask}
            isOpen={isEditModalOpen}
            onClose={closeModals}
            onSave={handleEditTask}
          />
          <DeleteTaskModal
            task = {currentTask}
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onDelete={handleDeleteTask}
          />
      </>
    );
}

export default HomePage;