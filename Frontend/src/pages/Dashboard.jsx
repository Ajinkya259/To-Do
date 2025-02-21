import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/"); // Redirect to login if not authenticated
        } else {
            fetchTasks(token);
        }
    }, [navigate]);

    const fetchTasks = async (token) => {
        try {
            const response = await axios.get("http://localhost:5000/api/tasks", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!newTask.trim()) return;

        try {
            await axios.post(
                "http://localhost:5000/api/tasks",
                { title: newTask },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewTask(""); // Clear input field
            fetchTasks(token); // Refresh task list
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const handleToggleTask = async (taskId) => {
        const token = localStorage.getItem("token");

        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${taskId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTasks(token); // Refresh task list
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks(token); // Refresh task list
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/"); // Redirect to login
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleAddTask}>
                <input type="text" placeholder="New Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} required />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.title}
                        </span>
                        <button onClick={() => handleToggleTask(task._id)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
