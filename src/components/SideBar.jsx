import React from "react";
import { useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { AiOutlineUnorderedList, AiOutlinePlus } from "react-icons/ai";
import { FaRegCalendarAlt, FaStar, FaCalendarCheck, FaUserCircle } from "react-icons/fa";
import pic from "../assets/img/user.png";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SideBar = ({ completedTasks, remainingTasks, todayTasksCount, toggleSidebar }) => {
  const dispatch = useDispatch();

  // Sample data for the pie chart
  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedTasks, remainingTasks],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#45a049", "#e53935"],
      },
    ],
  };

  return (
    <div className="bg-gray-100 h-[calc(100vh-64px)] w-64 fixed  z-10 overflow-y-auto shadow-lg">
      {/* Top Section: Image and Name */}
      <div className="flex flex-col items-center mb-6">
        <img src={pic} alt="User" className="h-24 w-24 rounded-full mb-2" />
        <h2 className="text-lg font-bold">Ram Mishra</h2>
      </div>

      {/* Task Categories */}
      <div className="mb-6 ms-3">
        <h3 className="text-gray-700 font-semibold mb-2">Tasks</h3>
        <ul className="space-y-4">
          <li
            className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black"
            onClick={() => toggleSidebar()}
          >
            <AiOutlineUnorderedList />
            <span>All Tasks</span>
          </li>
          <li
            className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black"
            onClick={() => toggleSidebar()}
          >
            <FaRegCalendarAlt />
            <span>Today</span>
          </li>
          <li
            className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black"
            onClick={() => toggleSidebar()}
          >
            <FaStar />
            <span>Important</span>
          </li>
          <li
            className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black"
            onClick={() => toggleSidebar()}
          >
            <FaCalendarCheck />
            <span>Planned</span>
          </li>
          <li
            className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black"
            onClick={() => toggleSidebar()}
          >
            <FaUserCircle />
            <span>Assigned to Me</span>
          </li>
        </ul>
      </div>

      {/* Add List */}
      <div className="mb-6 ms-3">
        <h3 className="text-gray-700 font-semibold mb-2">Add</h3>
        <div
          className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black"
          onClick={() => toggleSidebar()}
        >
          <AiOutlinePlus />
          <span>Add List</span>
        </div>
      </div>

      {/* Today's Tasks and Pie Chart */}
      <div className="ms-3">
        <h3 className="text-gray-700 font-semibold mb-2">Today</h3>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <span>Today's Tasks</span>
          <span className="font-bold">{todayTasksCount}</span>
        </div>

        {/* Pie Chart */}
        <div className="">
          <Pie size={12} data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
