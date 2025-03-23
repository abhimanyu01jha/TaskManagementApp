import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../services/taskService";
import "../styles/global.css";
import "../styles/home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(user.token);
      if (data.message) {
        setMessage(data.message);
        setTasks([]);
      } else {
        setTasks(data);
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setMessage("Failed to fetch tasks. Try again later.");
    }
  };

  const handleCreateTask = async () => {
    if (!title || !description) return;
    await createTask(user.token, { title, description, status: "Pending" });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    await updateTaskStatus(user.token, taskId, newStatus);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(user.token, taskId);
    fetchTasks();
  };

  return (
    <div className="task-container">
      <h2>Task Manager</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>

      {/* Task Input Section */}
      <div className="task-input">
        <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      {message && <p className="no-tasks">{message}</p>}

      {tasks.length > 0 && (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <div className="task-buttons">
                {task.status !== "In Progress" && (
                  <button className="progress-btn" onClick={() => handleUpdateTaskStatus(task._id, "In Progress")}>
                    Mark In Progress
                  </button>
                )}
                {task.status !== "Completed" && (
                  <button className="completed-btn" onClick={() => handleUpdateTaskStatus(task._id, "Completed")}>
                    Mark Completed
                  </button>
                )}
                <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
