import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './Root.jsx'

// Styles
import './styles/main.scss'

// Pages
import Admin from './components/pages/Admin.jsx'  //! TEMPORARY
import Register from './components/pages/Register.jsx'
import Login from './components/pages/Login.jsx'
import LoginKids from './components/pages/LoginKids.jsx'
import ProfilesList from './components/pages/ProfilesList.jsx'
import ProfilesListKids from './components/pages/ProfilesListKids.jsx'
import ProfileItem from './components/pages/ProfileItem.jsx'
import ProfileItemEdit from './components/pages/ProfileItemEdit.jsx'
import Home from './components/pages/Home.jsx'
import RewardDefineList from './components/pages/RewardDefineList.jsx'
import RewardDefineListKids from './components/pages/RewardDefineListKids.jsx'
import TaskAddNew from './components/pages/TaskAddNew.jsx'
import TaskDefineList from './components/pages/TaskDefineList.jsx'
import TaskDefineListKids from './components/pages/TaskDefineListKids.jsx'
import GoalAddNew from './components/pages/GoalAddNew.jsx'
import GoalsList from './components/pages/GoalsList.jsx'
import GoalItem from './components/pages/GoalItem.jsx'
import TasksList from './components/pages/TasksLists.jsx'
import TaskItem from './components/pages/TaskItem.jsx'
import StoriesList from './components/pages/StoriesList.jsx'
import StoryItem from './components/pages/StoryItem.jsx'
import DashboardKids from './components/pages/DashboardKids.jsx'

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
        path: 'admin',
        element: <Admin />
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
        path: 'kids/login',
        element: <LoginKids />
      },
      {
        path: 'profiles',
        element: <ProfilesList />
      },
      {
        path: 'kids/profiles',
        element: <ProfilesListKids />
      },
      {
        path: 'profiles/:profileId',
        element: <ProfileItem />
      },
      {
        path: 'profiles/edit/:profileId',
        element: <ProfileItemEdit />
      },
      {
        path: 'rewards-define',
        element: <RewardDefineList />
      },
      {
        path: 'kids/rewards-define',
        element: <RewardDefineListKids />
      },
      {
        path: 'tasks-define',
        element: <TaskDefineList />
      },
      {
        path: 'kids/tasks-define',
        element: <TaskDefineListKids />
      },
      {
        path: 'goals/add',
        element: <GoalAddNew />
      },
      {
        path: 'goals',
        element: <GoalsList />
      },
      {
        path: 'goals/:goalId',
        element: <GoalItem />
      },
      {
        path: 'tasks/add',
        element: <TaskAddNew />
      },
      {
        path: 'tasks',
        element: <TasksList />
      },
      {
        path: 'tasks/:taskId',
        element: <TaskItem />
      },
      {
        path: 'stories',
        element: <StoriesList />
      },
      {
        path: 'stories/:storyId',
        element: <StoryItem />
      },
      {
        path: 'kids/dashboard',
        element: <DashboardKids />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
