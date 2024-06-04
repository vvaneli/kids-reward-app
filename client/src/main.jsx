import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './Root.jsx'

// Styles
import './styles/main.scss'

// Pages
import Register from './components/pages/Register.jsx'
import Login from './components/pages/Login.jsx'
import ProfilesList from './components/pages/ProfilesList.jsx'
import ProfileItem from './components/pages/ProfileItem.jsx'
import Home from './components/pages/Home.jsx'
import RewardDefList from './components/pages/RewardDefList.jsx'
import TaskDefList from './components/pages/TaskDefList.jsx'
import GoalsList from './components/pages/GoalsList.jsx'
import TasksList from './components/pages/TasksLists.jsx'

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profiles',
        element: <ProfilesList />
      },
      {
        path: 'profile',
        element: <ProfileItem />
      },
      {
        path: 'rewards-define',
        element: <RewardDefList />
      },
      {
        path: 'tasks-define',
        element: <TaskDefList />
      },
      {
        path: 'goals',
        element: <GoalsList />
      },
      {
        path: 'tasks',
        element: <TasksList />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
