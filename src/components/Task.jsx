import { useEffect, useState } from "react";

export default function TaskBoard({ user }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend if user is logged in
  useEffect(() => {
    if (user && user.uid) {
      fetch(`http://localhost:5000/tasks?user=${user.uid}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [user]);

  if (!user) {
    return <div className="text-center p-4">Please log in to view your tasks.</div>;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Category: {task.category}</p>
        </div>
      ))}
    </div>
  );
}
