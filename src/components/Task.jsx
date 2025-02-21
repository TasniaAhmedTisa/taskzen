import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TaskBoard({ user }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    fetch(`http://localhost:5000/tasks?user=${user.uid}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [user]);

  // Handle Drag & Drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    
    // Update task category if moved across lists
    movedTask.category = result.destination.droppableId;
    
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);

    // Save changes to the backend
    try {
      await fetch(`http://localhost:5000/tasks/${movedTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movedTask),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <TaskColumn key={category} category={category} tasks={tasks} />
        ))}
      </div>
    </DragDropContext>
  );
}

// Task Column Component
function TaskColumn({ category, tasks }) {
  return (
    <div className="bg-gray-100 p-3 rounded-3xl shadow-md">
      <h2 className="text-xl font-semibold mb-1 text-center">{category}</h2>
      <Droppable droppableId={category}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {tasks
              .filter((task) => task.category === category)
              .map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-white p-3 rounded-lg shadow-md"
                    >
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
