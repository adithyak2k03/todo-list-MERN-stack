import React, {useEffect, useState} from "react";
import "../stylesheets/HomePage.css";
import Task from "../components/Task";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

const API_URL = "http://localhost:5000/tasks";

const HomePage = (props) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = async () =>{

    if(inputValue.trim()){
      
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text: inputValue}),
      };
      try{
        const response = await fetch(API_URL,payload);
        
        if(response.ok){
          const newTask = await response.json();
          setTasks((prevTasks)=>[newTask, ...prevTasks]);
          setInputValue("");
          }else{
            console.error("Failed to add task");
          }
        }catch(error){
          console.error("Error adding task:", error);
        }
    }
  };

  const fetchTasks = async () => {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch(error){
      console.error("Error fetching tasks: ", error);
    }
  };

  const toggleTask = async(id) =>{
    try{
      const task = tasks.find((t)=> t._id === id);
      if (!task) {
        console.error("Task not found");
        return;
      }
      const payload = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({completed: !task.completed}),
      };
      const response = await fetch(`${API_URL}/${id}`, payload);
      if(response.ok){
        const updatedTask = await response.json();
        setTasks(
          (prevTasks) => prevTasks.map((t) => (t._id === id ? updatedTask : t))
        );
      }
    }catch(error){
      console.error("Error toggling task:", error);
    }
  };

  const editTask = (id, newText) => {
    try{
      const payload = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text:newText}),
      };

      fetch(`${API_URL}/${id}`, payload)
        .then((response) => response.json())
        .then((updatedTask) =>{
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t._id === id ? updatedTask : t)) 
          );
        });

    }catch(error){
      console.error("Error editing task", error);
    }
  };

  const deleteTask = (id) => {
    try {
      fetch(`${API_URL}/${id}`, {method: "DELETE"})
        .then((response) => response.json())
        .then(() => {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !==id));
        });
    } catch(error){
      console.error("Error deleting task ", error)
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
    fetchTasks();
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
                onClick={addTask}
                type="submit"
              >Add</button>
            </div>

            <ul className="task-list">
            {tasks.map((task)=>(
              <li key={task._id}>
                <Task
                  task={task}
                  toggleTask={toggleTask}
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
            onSave={editTask}
          />
          <DeleteTaskModal
            task = {currentTask}
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onDelete={deleteTask}
          />
      </>
    );
}

export default HomePage;