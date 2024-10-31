/**
 * @file main.jsx
 * @description The main entry file for the React application that sets up routing and renders the application into the DOM.
 * @note This file is responsible for initializing the React application, applying strict mode, and providing the router configuration.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login.jsx'
import World from './pages/world/World.jsx'
import Greenhouse from './pages/greenhouse-effect/GreenHouse.jsx'
import OzoneLayer from './pages/ozone-layer/OzoneLayer.jsx'
import Smog from './pages/smog/Smog.jsx'
import Welcome from './pages/world/Welcome.jsx'

// Configure the router paths.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/world",
    element: <World />,
  },
  {
    path: "/green-house",
    element: <Greenhouse />,
  },
  {
    path: "/ozone-layer",
    element: <OzoneLayer />,
  },
  {
    path: "/smog",
    element: <Smog />,
  },
  {
    path: "/Welcome",
    element: <Welcome />,
  }
]);

// Render the application into the DOM element with id 'root'.
// The application is wrapped in StrictMode for highlighting potential issues during development.
// RouterProvider is used to provide the router configuration to the entire application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
