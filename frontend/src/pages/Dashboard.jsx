import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/task");
      setTasks(res.data);
    } catch (err) {
      alert("Unauthorized");
    }
  };

  // Add or Update Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        const res = await API.put(`/task/${editingId}`, form);

        setTasks(
          tasks.map((task) => (task._id === editingId ? res.data.task : task)),
        );

        setEditingId(null);
      } else {
        // ADD
        const res = await API.post("/task", form);
        setTasks([...tasks, res.data.task]);
      }

      // Clear form
      setForm({
        title: "",
        description: "",
        status: "pending",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Set form for editing
  const editTask = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });

    setEditingId(task._id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        background: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <h2>Task Dashboard</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <br />
        <br />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <br />
        <br />
        <button type="submit">{editingId ? "Update Task" : "Add Task"}</button>
      </form>

      <hr />

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task._id} style={{ marginBottom: "15px" }}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => editTask(task)}>Edit</button>

          <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
