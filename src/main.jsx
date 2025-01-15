
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import './index.css'
import App from './App.jsx'
import store from "./store"; // Import the store

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
</Provider>,
)
