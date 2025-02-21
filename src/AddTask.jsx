import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AddTask = () => {
  // State to store task data
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '', 
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the task data to the backend
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Task added successfully!');
        setTaskData({ title: '', description: '', dueDate: '', category: '' }); // Clear form
      } else {
        alert('Failed to add task: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding task');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="hero bg-red-100 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Add Your Task</h1>
            <p className="py-6">
              Organize your tasks efficiently by setting categories and deadlines.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  className="input input-bordered"
                  value={taskData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter task description"
                  className="textarea textarea-bordered"
                  value={taskData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Due Date</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  className="input input-bordered"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered"
                  value={taskData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddTask;
