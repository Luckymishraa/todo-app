export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SET_TASK_PRIORITY = "SET_TASK_PRIORITY";
export const SET_TASK_DATE_TIME = "SET_TASK_DATE_TIME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOGGLE_PRIORITY = "TOGGLE_PRIORITY";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";

// Action creators
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const toggleTaskPriority = (taskId) => ({
  type: TOGGLE_PRIORITY,
  payload: taskId,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const setTaskPriority = (id, priority) => ({
  type: SET_TASK_PRIORITY,
  payload: { id, priority },
});

export const setTaskDateTime = (id, date, time) => ({
  type: SET_TASK_DATE_TIME,
  payload: { id, date, time },
});

export const toggleTaskCompletion = (taskId) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: taskId,
});

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
