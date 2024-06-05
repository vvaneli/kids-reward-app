import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

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
      <main id='tasks-list'>
        <h1>Tasks</h1>
        {tasksList.length > 0 ?
              tasksList.map(tasksList => {
                return (
                  <article key={tasksList.id}>
                    <h2>{tasksList.ref_task_define.title}</h2>
                    <p>{tasksList.ref_task_define.title_audio_url}</p>
                    <img src={tasksList.image1} alt={tasksList.title} />
                    <img src={tasksList.ref_task_define.image1} alt={tasksList.ref_task_definetitle} />
                    <img src={tasksList.image2} alt={tasksList.title} />
                    <p>{tasksList.timestamp_created}</p>
                    <p>{tasksList.notes}</p>
                    <p>{tasksList.ref_task_define.description}</p>
                    <p>{tasksList.ref_task_define.description_audio_url}</p>
                    <p>{tasksList.ref_task_define.value}</p>
                    <h3>{tasksList.ref_goal_log.title}</h3>
                    <p>{tasksList.ref_goal_log.title_audio_url}</p>
                    <img src={tasksList.ref_goal_log.image1} alt={tasksList.ref_goal_log.title} />
                    <p>{tasksList.ref_goal_log.date_start}</p>
                    <p>{tasksList.ref_goal_log.date_end}</p>
                    <p>{tasksList.ref_goal_log.notes}</p>
                    <p>{tasksList.ref_goal_log.reward_is_claimed}</p>
                    <p>{tasksList.ref_goal_log.timestamp_reward_claimed}</p>
                    {/* <p>{TasksList.refs_assignees[0].nickname}</p> */}
                    {/* <img src={TasksList.refs_assignees[0].image_profile} alt='' /> */}
                    <Link to={`/tasks/${tasksList.id}`} className=''>Details</Link>
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
    </>
  )
}