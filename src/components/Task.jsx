import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


export default function TaskBoard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      fetch(`https://taskzen-server.onrender.com/tasks?user=${user.uid}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [user]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.category = categories[result.destination.droppableId];
    updatedTasks.splice(result.destination.index, 0, movedTask);

    try {
      await fetch(`https://taskzen-server.onrender.com/tasks/${movedTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movedTask),
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true); 
  };

  // Handle Input Change in Modal
  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  // Save Edited Task to Backend
  const handleSave = async () => {
    try {
      await fetch(`https://taskzen-server.onrender.com/tasks/${currentTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTask),
      });

      setTasks(tasks.map((task) => (task._id === currentTask._id ? currentTask : task)));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      // Send DELETE request to the backend to delete the task
      const response = await fetch(`https://taskzen-server.onrender.com/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Remove the deleted task from the local state (UI update)
        setTasks(tasks.filter((task) => task._id !== taskId));
        alert('Task deleted successfully!');
      } else {
        const result = await response.json();
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };
  
  if (!user) {
    return <div className="text-center p-4">Please log in to view your tasks.</div>;
  }

  const categories = ["To-Do", "In Progress", "Done"];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>

    <div className="p-4 lg:flex">
      {categories.map((category, index) => (
 <Droppable key={category} droppableId={index.toString()}>
 {(provided) => (
   <div
     ref={provided.innerRef}
     {...provided.droppableProps}
     className="mb-6 border m-2 p-3 shadow-lg bg-black rounded-xl w-1/3"
   >    
         <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-pink-700 text-center py-3">{category}</h2>
          <div className="grid grid-cols-1 gap-4">
            {tasks
              .filter((task) => task.category === category)
              .map((task, taskIndex) => (
                <Draggable key={task._id} draggableId={task._id} index={taskIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded shadow flex justify-between"
                    >
                  <div>
                  <h3 className="font-bold text-xl text-blue-600">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                              <button
                                className="text-yellow-500 hover:text-yellow-600"
                                onClick={() => handleEdit(task)}
                              >
                                <FaEdit className="text-2xl" />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(task._id)}
                              >
                                <FaTrashAlt className="text-xl" />
                              </button>
                            </div>
                    </div>
                 
                  )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
        </div>
    

      {/* Edit Task Modal */}
      {isModalOpen && currentTask && (
        <div className="fixed inset-0 lg:flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={currentTask.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={currentTask.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={currentTask.dueDate?.split("T")[0]}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-end space-x-3">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </DragDropContext>
  );
}
    