const API_URL = "http://localhost:5000/tasks";

const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

const addTask = async (text) => {
    if (!text.trim()) return null;

    const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    };

    try {
        const response = await fetch(API_URL, payload);
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error("Error adding task:", error);
        return null;
    }
};

const toggleTask = async (id, completed) => {
    const payload = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    };
  
    try {
      const response = await fetch(`${API_URL}/${id}`, payload);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error toggling task:", error);
      return null;
    }
};

const editTask = async (id, newText) => {
    const payload = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    };
  
    try {
      const response = await fetch(`${API_URL}/${id}`, payload);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error editing task:", error);
      return null;
    }
};

const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      return response.ok;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
};

export { fetchTasks, addTask, toggleTask, editTask, deleteTask };
