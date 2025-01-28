const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db.js");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connectToMongo();


const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
  });
  
  const Task = mongoose.model("Task", taskSchema);
  
// Add a new Task
app.post("/tasks", async(req ,res)=>{
    try{
        const {text} = req.body;

        const newTask = new Task({ text, completed: false});
        await newTask.save();
        res.status(201).json(newTask);
    } catch(error){
        console.error("Error saving task ", error);
        res.status(500).json({error: "Failed to save Task"});
    }
});

// View All tasks
app.get("/tasks", async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({error: "Failed to fetch tasks"});
    };
});

// Toggle strikeThrough or not(completed), and task title edit 
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;

        // Build the update object dynamically
        const updateFields = {};
        if (text !== undefined) updateFields.text = text;
        if (completed !== undefined) updateFields.completed = completed;


        // Update the task in the database
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task" });
    }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the task ID from the URL

        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});


  

app.listen(PORT, () => console.log(`Server runing on http://localhost:${PORT}`));
