import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'

import NavBar from '../subcomponents/NavBar.jsx'

export default function GoalItem() {

  const [goalItem, setGoalItem] = useState() // [] is truthy in py
  const [tasksList, setTasksList] = useState([])
  const [listTaskPoints, setListTaskPoints] = useState([])
  const [sumTaskPoints, setSumTaskPoints] = useState(Number())
  const [storyStep, setStoryStep] = useState(1)

  const [errorMsg, setErrorMsg] = useState('')

  let { goalId } = useParams()

  //! GET GOALS
  useEffect(() => {
    async function getGoalItem() {
      try {
        const { data } = await axios.get(`/api/goals/${goalId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        setGoalItem(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getGoalItem()
  }, [goalId])

  //! GET TASKS
  useEffect(() => {
    async function getTasksList() {
      try {
        const { data } = await axios.get('/api/tasks/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('tasks: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setTasksList(data)

      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getTasksList()
  }, [])

  //! SUM POINTS FROM TASKS
  function getSum(total, num) {
    return total + Math.round(num);
  }
  function getSumTaskPoints() {
    if (tasksList.length > 0) {
      tasksList.map(taskItem => {
        if (taskItem.ref_goal_log && taskItem.ref_goal_log.id === goalItem.id) {
          setListTaskPoints(setListTaskPoints.push(taskItem.ref_task_define.value))
        }
      })
    }
    console.log('listTaskPoints: ', listTaskPoints)
    console.log('sumTaskPoints: ', listTaskPoints.reduce(getSum, 0))
    // return sumTaskPoints = listTaskPoints.reduce(getSum, 0)
    setSumTaskPoints(listTaskPoints.reduce(getSum, 0))
    // }
    // function getStoryStep(){

    console.log(Math.round(sumTaskPoints / goalItem.ref_reward_define.value) * goalItem.ref_story.steps)
    const step = (Math.round((sumTaskPoints / goalItem.ref_reward_define.value) * goalItem.ref_story.steps))

    if (step >= 0) {
      setStoryStep(step + 1) // story image sequence starts at index 1
    } else {
      setStoryStep(0) // show image for negative progress at index 0
    }
  }

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Goal</h1>
        </header>
        <main id='goal-item'>

          <Link to={'/goals'}><p className=''>See all goals</p></Link>

          {goalItem ?
            <article>
              <h1>{goalItem.title}</h1>

              <h2>Progress</h2>
              {/* goal image */}
              {goalItem ?
                <img className='hero' src={goalItem.ref_story.scenes_artwork[storyStep]} alt={goalItem.title} />
                :
                <p>no image</p>
              }

              <p>{sumTaskPoints} out of {goalItem.ref_reward_define.value} completed</p>

              {/* dates */}
              <p>Start: {goalItem.date_start}</p>
              {
                goalItem.date_end ?
                  <p>End: {goalItem.date_end}</p>
                  :
                  <p>End: no end date</p>
              }

              {/* notes */}
              <p>Notes: {goalItem.notes}</p>

              <hr />

              <h2>Reward</h2>
              <h3>{goalItem.ref_reward_define.title}</h3>

              {/* refs_assignees */}
              <p>For:</p>
              {goalItem.refs_assignees.length > 0 ?
                goalItem.refs_assignees.map(assignee => {
                  return (
                    <p>{assignee.nickname}</p>

                    // :
                    // <p>Finding youngsters</p>
                  )
                })
                :
                errorMsg ?
                  <option>{errorMsg}</option>
                  :
                  <option>Getting list of people&#8230;</option>
              }

              {/* reward image */}
              {goalItem.ref_reward_define.image1 ?
                <img src={goalItem.ref_reward_define.image1} alt={goalItem.ref_reward_define.title} />
                :
                <></>
              }

            </article>
            :
            errorMsg ?
              <p><em>{errorMsg}</em></p>
              :
              <p><em>Downloading&#8230;</em></p>
          }
          <hr />
          <aside>
            <h2>Tasks</h2>
            <h3>Tasks done towards this goal</h3>

            {tasksList.length > 0 ?
              tasksList.map(taskItem => {
                return (
                  (taskItem.ref_goal_log && taskItem.ref_goal_log.id === goalItem.id) ?
                    <div key={taskItem.id}>
                      <img src={taskItem.ref_task_define.image1} alt={taskItem.ref_task_define.title} />
                      <p>{taskItem.ref_task_define.title}</p>
                      <p>{taskItem.ref_task_define.timestamp_created}</p>
                      <p>Points: {taskItem.ref_task_define.value}</p>
                      <p><a href={`/tasks/${taskItem.id}`}>Details</a></p>
                    </div>
                    :
                    <></>
                )
              })
              :
              errorMsg ?
                <p><em>{errorMsg}</em></p>
                :
                <p><em>Downloading&#8230;</em></p>
            }

          </aside>
        </main>
      </div>
    </>
  )
}