import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import App from './App.jsx'
import Home from './pages/Home'
import Crypto from './pages/Crypto'
import Trending from './pages/Trending'
import Saved from './pages/Saved'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path: "/crypto",
        element: <Crypto/>
      },
      {
        path: "/trending",
        element: <Trending/>
      },
      {
        path: "/saved",
        element: <Saved/>
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
