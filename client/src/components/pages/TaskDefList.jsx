import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function TaskDefList() {
  const [taskDefList, setTaskDefList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getTaskDefList() {
      try {
        const { data } = await axios.get('/api/tasks-define/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Define a Task to contribute towards a goal.') }
        setTaskDefList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getTaskDefList()
  }, [])

  return (
    <>
      <main id='tasks-define-list'>
        <h1>tasks-define</h1>
        {taskDefList.length > 0 ?
              taskDefList.map(taskDefList => {
                return (
                  <article key={taskDefList.id}>
                    <h2>{taskDefList.title}</h2>
                    <img src={taskDefList.image1} alt={taskDefList.title} />
                    <p>{taskDefList.title_audio_url}</p>
                    <p>{taskDefList.value}</p>
                    <p>{taskDefList.description}</p>
                    <p>{taskDefList.description_audio_url}</p>
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