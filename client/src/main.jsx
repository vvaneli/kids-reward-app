import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './Root.jsx'

// Styles
import './styles/main.scss'

// Pages
import Admin from './components/pages/Admin.jsx'  //* For AdminOnly
import Register from './components/pages/Register.jsx'
import Login from './components/pages/Login.jsx'
import LoginKids from './components/pages/LoginKids.jsx' //! TO DELETE
import Onboard from './components/pages/Onboard.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import ProfileItem from './components/pages/ProfileItem.jsx'
import ProfileItemEdit from './components/pages/ProfileItemEdit.jsx'
// import ProfileGroupAdd from './components/pages/ProfileGroupAdd.jsx'
import ProfilesGroupList from './components/pages/ProfilesGroupList.jsx'
// import ProfileGroupItem from './components/pages/ProfileGroupItem.jsx'
// import ProfileGroupItemEdit from './components/pages/ProfileGroupItemEdit.jsx'
//? Define
// import RewardDefineAdd from './components/pages/RewardDefineAdd.jsx'
import RewardDefineList from './components/pages/RewardDefineList.jsx'
// import RewardDefineItem from './components/pages/RewardDefineItem.jsx'
// import RewardDefineItemEdit from './components/pages/RewardDefineItemEdit.jsx'
import RewardDefineListKids from './components/pages/RewardDefineListKids.jsx' //! To DELETE
// import TaskDefineAddNew from './components/pages/TaskDefineAddNew.jsx'
import TaskDefineList from './components/pages/TaskDefineList.jsx'
// import TaskDefineItem from './components/pages/TaskDefineItem.jsx'
// import TaskDefineItemEdit from './components/pages/TaskDefineItemEdit.jsx'
//? Log
import GoalAddNew from './components/pages/GoalAddNew.jsx'
import GoalsList from './components/pages/GoalsList.jsx'
import GoalItem from './components/pages/GoalItem.jsx'
// import GoalItemEdit from './components/pages/GoalItemEdit.jsx'
import TaskAddNew from './components/pages/TaskAddNew.jsx'
import TasksList from './components/pages/TasksLists.jsx'
import TaskItem from './components/pages/TaskItem.jsx'
// import TaskItemEdit from './components/pages/TaskItemEdit.jsx'
import StoriesList from './components/pages/StoriesList.jsx'
import StoryItem from './components/pages/StoryItem.jsx'
//? Kids
import KidsDashboard from './components/pages/KidsDashboard.jsx'
// import KidsTasksList from './components/pages/KidsTasksList.jsx'
import KidsProfilesList from './components/pages/KidsProfilesList.jsx'
import KidsTaskDefineListEarnie from './components/pages/KidsTaskDefineListEarnie.jsx'
import KidsTaskDefineListSmelly from './components/pages/KidsTaskDefineListSmelly.jsx'

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Register />
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
        path: 'kids/login', //! TO DELETE
        element: <LoginKids />
      },
      {
        path: 'welcome',
        element: <Onboard />
      },
      {
        path: 'dashboard/',
        element: <Dashboard />
      },
      {
        path: 'profiles/:profileId',
        element: <ProfileItem />
      },
      {
        path: 'profiles/edit/:profileId',
        element: <ProfileItemEdit />
      },
      // {
      //   path: 'profiles/group/add',
      //   element: <ProfileGroupAdd />
      // },
      {
        path: 'profiles/group',
        element: <ProfilesGroupList />
      },
      // {
    //   path: 'profiles/group/:profileId',
      //   element: <ProfileGroupItem />
      // },
      // {
      //   path: 'profiles/group/edit/:profileId',
      //   element: <ProfileGroupItemEdit />
      // },
      // {
      //   path: 'rewards-define/add',
      //   element: <RewardDefineAdd />
      // },
      {
        path: 'rewards-define',
        element: <RewardDefineList />
      },
      // {
      //   path: 'rewards-define/:rewards-defineId',
      //   element: <RewardDefineItem />
      // },
      // {
      //   path: 'rewards-define/edit/:rewards-defineId',
      //   element: <RewardDefineItemEdit />
      // },
      // {
      //   path: 'tasks-define/add',
      //   element: <TaskDefineAddNew />
      // },
      {
        path: 'tasks-define',
        element: <TaskDefineList />
      },
      // {
      //   path: 'tasks-define/:task-defineId',
      //   element: <TaskDefineItem />
      // },
      // {
      //   path: 'tasks-define/edit/:task-defineId',
      //   element: <TaskDefineItemEdit />
      // },
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
      // {
      //   path: 'goals/edit/:goalId',
      //   element: <GoalItemEdit />
      // },
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
      // {
      //   path: 'tasks/edit/:taskId',
      //   element: <TaskItemEdit />
      // },
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
        element: <KidsDashboard />
      },
      // {
      //   path: 'kids/tasks',
      //   element: <KidsTasksList />
      // },
      {
        path: 'kids/tasks-define-smelly',
        element: <KidsTaskDefineListSmelly />
      },
      {
        path: 'kids/tasks-define-earnie',
        element: <KidsTaskDefineListEarnie />
      },
      {
        path: 'kids/rewards-define', //! To DELETE
        element: <RewardDefineListKids />
      },
      {
        path: 'kids/profiles',
        element: <KidsProfilesList />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
