// taskReducer.js
import { ADD_TASK, TOGGLE_PRIORITY, DELETE_TASK, SET_TASK_PRIORITY, SET_TASK_DATE_TIME, TOGGLE_TASK_COMPLETION, LOGIN, LOGOUT } from './actions';


const initialTaskState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],  // Load tasks from localStorage
};

export const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const updatedTasksAdd = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(updatedTasksAdd));  // Persist tasks in localStorage
      return { ...state, tasks: updatedTasksAdd };

    case TOGGLE_PRIORITY:
      const updatedTasksPriority = state.tasks.map(task =>
        task.id === action.payload ? { ...task, priority: task.priority === "High" ? "Medium" : "High" } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasksPriority));  // Persist tasks in localStorage
      return { ...state, tasks: updatedTasksPriority };

    case DELETE_TASK:
      const updatedTasksDelete = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updatedTasksDelete));  // Persist tasks in localStorage
      return { ...state, tasks: updatedTasksDelete };

    case SET_TASK_PRIORITY:
      const updatedTasksSetPriority = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, priority: action.payload.priority } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasksSetPriority));  // Persist tasks in localStorage
      return { ...state, tasks: updatedTasksSetPriority };

    case SET_TASK_DATE_TIME:
      const updatedTasksSetDateTime = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, date: action.payload.date, time: action.payload.time } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasksSetDateTime));  // Persist tasks in localStorage
      return { ...state, tasks: updatedTasksSetDateTime };

    case TOGGLE_TASK_COMPLETION:
      const updatedTasksCompletion = state.tasks.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasksCompletion));  // Persist tasks in localStorage
      return { ...state, tasks: updatedTasksCompletion };

     default:
      return state;
  }
};

// userReducer.js
const initialUserState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('isAuthenticated', 'true');  // Store login status in localStorage
      return { ...state, isAuthenticated: true };

    case LOGOUT:
      localStorage.removeItem('isAuthenticated');  // Remove login status from localStorage
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
};
