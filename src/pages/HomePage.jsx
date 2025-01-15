import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Login from "../Login.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const tasks = useSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  // State to toggle the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarRef = useRef(null);
  const sidebarToggleRef = useRef(null);

  // Close the sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !sidebarToggleRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false); // Close sidebar if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="flex flex-col h-screen">
          {/* Pass the toggleSidebar function to Navbar */}
          <Navbar toggleSidebar={toggleSidebar} sidebarToggleRef={sidebarToggleRef} />

          {/* Main Content Area */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className={`lg:block fixed inset-0 z-50 bg-gray-800 bg-opacity-50 lg:static transition-all duration-300 ease-in-out transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <SideBar
                completedTasks={completedTasks}
                remainingTasks={remainingTasks}
                todayTasksCount={remainingTasks}
                toggleSidebar={toggleSidebar}
              />
            </div>

            {/* Content */}
            <div className="flex-1 mt-16 ml-0 lg:ml-64">
              <TaskInput />
              <TaskList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
