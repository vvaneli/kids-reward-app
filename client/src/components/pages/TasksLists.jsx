import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'

// Sub-Components
import NavBar from '../subcomponents/NavBar.jsx'

export default function TasksList() {
  const [tasksList, setTasksList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getTasksList() {
      try {
        const { data } = await axios.get('/api/tasks/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Add a task towards a goal.') }
        setTasksList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getTasksList()
  }, [])

  return (
    <>
    <NavBar />
<div className='wrapper'>
  <header>
        <h1>Tasks</h1>
  </header>
      <main id='tasks-list'>
        {tasksList.length > 0 ?
              tasksList.map(taskItem => {
                return (
                  <article key={taskItem.id}>
                    <h2>{taskItem.ref_task_define.title}</h2>
                    <p>{taskItem.ref_task_define.title_audio_url}</p>
                    <img src={taskItem.image1} alt={taskItem.title} />
                    <img src={taskItem.ref_task_define.image1} alt={taskItem.ref_task_define.title} />
                    <img src={taskItem.image2} alt={taskItem.title} />
                    <p>{taskItem.timestamp_created}</p>
                    <p>{taskItem.notes}</p>
                    <p>{taskItem.ref_task_define.description}</p>
                    <p>{taskItem.ref_task_define.description_audio_url}</p>
                    <p>{taskItem.ref_task_define.value}</p>
                    {/* <h3>{taskItem.ref_goal_log.title}</h3>
                    <p>{taskItem.ref_goal_log.title_audio_url}</p>
                    <img src={taskItem.ref_goal_log.image1} alt={taskItem.ref_goal_log.title} />
                    <p>{taskItem.ref_goal_log.date_start}</p>
                    <p>{taskItem.ref_goal_log.date_end}</p>
                    <p>{taskItem.ref_goal_log.notes}</p>
                    <p>{taskItem.ref_goal_log.reward_is_claimed}</p>
                    <p>{taskItem.ref_goal_log.timestamp_reward_claimed}</p> */}
                    <p>{taskItem.refs_assignees.nickname}</p>
                    <img src={taskItem.refs_assignees.image_profile} alt='' />
                    <Link to={`/tasks/${taskItem.id}`} className=''>Details</Link>
                  </article>
                )
              })
              :
              errorMsg ?
                <p><em>{errorMsg}</em></p>
                :
                <p><em>Downloading&#8230;</em></p>

            }
      </main>
      </div>
    </>
  )
}