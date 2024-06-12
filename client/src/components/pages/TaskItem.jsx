import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function TaskItem() {
  const [taskItem, setTaskItem] = useState() // [] is truthy in py
  const [errorMsg, setErrorMsg] = useState('')

  let { taskId } = useParams()

  useEffect(() => {
    async function getTaskItem() {
      try {
        const { data } = await axios.get(`/api/tasks/${taskId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        setTaskItem(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getTaskItem()
  }, [taskId])

  return (
    <>
      <main id='task-item'>
        <h1>Task Item</h1>
        <Link to={'/tasks'}><p className=''>Seel all tasks</p></Link>
        {taskItem ?
          <article>
            <h2>{taskItem.ref_task_define.title}</h2>
            <p>{taskItem.timestamp_created}</p>
            <p>{taskItem.ref_task_define.title_audio_url}</p>
            {/* <h2>{taskItem.ref_task_define.title}</h2> */}
            {/* <img src={taskItem.scenes_artwork[1]} alt='start story' />
            <img src={taskItem.scenes_artwork[taskItem.steps + 1]} alt='story ending' /> */}
            <img src={taskItem.image1} alt={taskItem.ref_task_define.title} />

            <img src={taskItem.image2} alt={taskItem.ref_task_define.title} />
            <img src={taskItem.ref_task_define.image1} alt={taskItem.ref_task_define.title} />

            {/* <p>{taskItem.about_audio_url}</p>
            <p>{taskItem.scenes_narrative}</p>
          <p>{taskItem.scenes_narrative_audio}</p> */}
            {/* <p>Steps: {taskItem.steps}</p> */}
            {/* <p>{taskItem.title_audio_url}</p> */}
            <p>{taskItem.ref_task_define.value}</p>
            <p>{taskItem.ref_task_define.description}</p>
            <p>{taskItem.ref_task_define.description_audio_url}</p>
            <p>{taskItem.notes}</p>
            {taskItem.ref_goal_log ?
            <>
              <p>Goal: {taskItem.ref_goal_log.title}</p>
              <p><a href={`/goals/${taskItem.ref_goal_log.id}`}>Details</a></p>
              </>
              :
              <p>Goal: unassigned</p>
            }
            {taskItem.refs_assignees.length > 0 ?
              taskItem.refs_assignees.map(assignee => {
                return (
                  <>
                    <p>Done by: {assignee.nickname}</p>
                    <img src={assignee.image_profile} alt='assignee.nickname' />
                  </>
                )
              }
              )
              :
              <p>Getting assignees&#8230;</p>
            }

            <p>Saved by: {taskItem.ref_owner.nickname}</p>
            <img src={taskItem.ref_owner.image_profile} alt={taskItem.ref_owner.nickname} />
          </article>
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