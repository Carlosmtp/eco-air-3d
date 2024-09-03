/**
 * @file App.jsx
 * @description The main entry file for the React application that imports styles and the root `App` component to be rendered.
 */

import './App.css'
import Login from './pages/login/Login';

/**
 * @component App
 * @description The root component of the React application that serves as the entry point and houses the main components of the application.
 * @returns {JSX.Element} The main application container that includes the Login component.
 * @example
 * // Example usage:
 * <App />
 */
function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
