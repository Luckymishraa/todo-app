import React, { useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineEllipsis } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTaskPriority, deleteTask, toggleTaskCompletion } from "../actions"; // Action to toggle priority, delete, and completion

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks); // Access tasks from Redux store
  const [showMenu, setShowMenu] = useState(null); // To handle visibility of the menu
  const dispatch = useDispatch();

  // Toggle task priority
  const handleTogglePriority = (id) => {
    dispatch(toggleTaskPriority(id)); // Dispatch toggle priority action
  };

  // Delete task
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id)); // Dispatch delete task action
    const updatedTasks = JSON.parse(localStorage.getItem("tasks")).filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Toggle task completion status
  const handleToggleCompletion = (id) => {
    dispatch(toggleTaskCompletion(id)); // Dispatch toggle completion action
  };

  // Separate tasks into completed and not completed
  const remainingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="fixed top-56 left-64 w-[calc(100%-16rem)] p-4 bg-gray-50">
      <h3 className="text-lg font-bold mb-4">Your Tasks</h3>

      {/* Remaining Tasks */}
      <h4 className="font-semibold text-xl">Remaining Tasks</h4>
      <div className="space-y-2">
        {remainingTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg hover:shadow-md"
          >
            {/* Task Text */}
            <span className="text-sm font-medium flex-1">{task.text}</span>

            {/* Priority Star and Three Dots Menu */}
            <div className="flex items-center space-x-3">
              {/* Priority Star */}
              <button onClick={() => handleTogglePriority(task.id)}>
                {task.priority === "High" ? (
                  <AiFillStar className="text-yellow-500 text-2xl" />
                ) : (
                  <AiOutlineStar className="text-gray-400 text-2xl hover:text-yellow-500" />
                )}
              </button>

              {/* Toggle Completion Button */}
              <button onClick={() => handleToggleCompletion(task.id)} className="text-green-500 hover:text-green-700">
                Mark as Completed
              </button>

              {/* Three Dots Menu */}
              <button
                className="relative"
                onClick={() => setShowMenu(showMenu === task.id ? null : task.id)}
              >
                <AiOutlineEllipsis className="text-gray-600 text-2xl hover:text-blue-500" />
              </button>

              {/* Menu */}
              {showMenu === task.id && (
                <div className="absolute right-4 top-10 bg-white shadow-md rounded-lg w-40 py-2 text-gray-700">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completed Tasks */}
      <h4 className="font-semibold text-xl mt-8">Completed Tasks</h4>
      <div className="space-y-2">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg hover:shadow-md"
          >
            {/* Task Text */}
            <span className="text-sm font-medium flex-1 line-through">{task.text}</span> {/* Line-through for completed tasks */}

            {/* Priority Star and Three Dots Menu */}
            <div className="flex items-center space-x-3">
              {/* Priority Star */}
              <button onClick={() => handleTogglePriority(task.id)}>
                {task.priority === "High" ? (
                  <AiFillStar className="text-yellow-500 text-2xl" />
                ) : (
                  <AiOutlineStar className="text-gray-400 text-2xl hover:text-yellow-500" />
                )}
              </button>

              {/* Toggle Completion Button */}
              <button onClick={() => handleToggleCompletion(task.id)} className="text-red-500 hover:text-red-700">
                Mark as Incomplete
              </button>

              {/* Three Dots Menu */}
              <button
                className="relative"
                onClick={() => setShowMenu(showMenu === task.id ? null : task.id)}
              >
                <AiOutlineEllipsis className="text-gray-600 text-2xl hover:text-blue-500" />
              </button>

              {/* Menu */}
              {showMenu === task.id && (
                <div className="absolute right-4 top-10 bg-white shadow-md rounded-lg w-40 py-2 text-gray-700">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
