import React, { useState } from "react";
import { AiOutlineBell, AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../actions"; // Import action

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);  // Control date picker visibility
  const [showTimePicker, setShowTimePicker] = useState(false);  // Control time picker visibility

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleAddTask = () => {
    if (!isAuthenticated) {
      alert("Please log in to add tasks.");
      return;
    }

    if (task.trim() && date && time) {
      const newTask = {
        id: Date.now(),
        text: task,
        date,
        time,
        priority: "Medium", // default priority
      };
      dispatch(addTask(newTask)); // Dispatch task to store

      // Also save tasks to sessionStorage for persistence
      const tasksFromSession = JSON.parse(localStorage.getItem("tasks")) || [];
      tasksFromSession.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasksFromSession));

      setTask("");
      setDate("");
      setTime("");
    } else {
      alert("Please fill all fields to add a task.");
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 shadow-md fixed top-16 left-64 w-[calc(100%-16rem)] h-40 p-6 z-10">
      {/* Task Input */}
      <div className="flex justify-center items-center h-full">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
          className="w-3/4 sm:w-2/3 md:w-1/2 border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Bottom Actions - Icons and Add Task */}
      <div className="flex justify-between items-center mt-4">
        {/* Left Icons */}
        <div className="flex space-x-4 text-gray-600">
          <AiOutlineBell className="text-3xl cursor-pointer hover:text-blue-500" title="Set Reminder" />
          
          {/* Date Icon to show Date Picker */}
          <AiOutlineCalendar
            className="text-3xl cursor-pointer hover:text-blue-500"
            title="Pick Date"
            onClick={() => setShowDatePicker(!showDatePicker)} // Toggle date picker visibility
          />

          {/* Time Icon to show Time Picker */}
          <AiOutlineClockCircle
            className="text-3xl cursor-pointer hover:text-blue-500"
            title="Pick Time"
            onClick={() => setShowTimePicker(!showTimePicker)} // Toggle time picker visibility
          />
        </div>

        {/* Add Task Button */}
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Task
        </button>
      </div>

      {/* Date Picker - shown when date icon is clicked */}
      {showDatePicker && !date && (
        <div className="mt-2">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setShowDatePicker(false);  // Hide date picker after selection
            }}
            className="w-full sm:w-3/4 md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-all ease-in-out duration-300"
          />
        </div>
      )}

      {/* Time Picker - shown when time icon is clicked */}
      {showTimePicker && !time && (
        <div className="mt-2">
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setShowTimePicker(false);  // Hide time picker after selection
            }}
            className="w-full sm:w-3/4 md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-all ease-in-out duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default TaskInput;
