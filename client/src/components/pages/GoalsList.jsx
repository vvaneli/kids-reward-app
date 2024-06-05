import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function GoalsList() {
  const [goalsList, setGoalsList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getGoalsList() {
      try {
        const { data } = await axios.get('/api/goals/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Set a goal to earn a reward.') }
        setGoalsList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getGoalsList()
  }, [])

  return (
    <>
      <main id='goals-list'>
        <h1>Goals</h1>
        {goalsList.length > 0 ?
              goalsList.map(goalsList => {
                return (
                  <article key={goalsList.id}>
                    <h2>{goalsList.title}</h2>
                    <p>{goalsList.title_audio_url}</p>
                    <img src={goalsList.image1} alt={goalsList.title} />
                    <p>{goalsList.value}</p>
                    <p>{goalsList.date_start}</p>
                    <p>{goalsList.date_end}</p>
                    <p>{goalsList.description}</p>
                    <p>{goalsList.description_audio_url}</p>
                    <p>{goalsList.steps}</p>
                    <p>{goalsList.notes}</p>
                    <p>{goalsList.reward_is_claimed}</p>
                    <p>{goalsList.timestamp_reward_claimed}</p>
                    <h3>{goalsList.ref_story.title}</h3>
                    <p>{goalsList.ref_story.about}</p>
                    <p>{goalsList.ref_story.title_audio_url}</p>
                    <p>{goalsList.ref_story.about_audio_url}</p>
                    <p>{goalsList.ref_story.scenes_narrative}</p>
                    <p>{goalsList.ref_story.scenes_narrative_audio_url}</p>
                    <img src={goalsList.ref_story.scenes_artwork[0]} alt={goalsList.ref_story.title} />
                    <img src={goalsList.ref_story.items_artwork[0]} alt={goalsList.ref_story.title} />
                    <h3>{goalsList.ref_rewards_define.title}</h3>
                    <p>{goalsList.ref_rewards_define.title_audio_url}</p>
                    <img src={goalsList.ref_rewards_define.image1} alt={goalsList.ref_rewards_define.title} />
                    <p>{goalsList.ref_rewards_define.value}</p>
                    <p>{goalsList.ref_rewards_define.description}</p>
                    <p>{goalsList.ref_rewards_define.description_audio_url}</p>
                    {/* <p>{goalsList.refs_assignees[0].nickname}</p> */}
                    {/* <img src={goalsList.refs_assignees[0].image_profile} alt='' /> */}
                    <Link to={`/goals/${goalsList.id}`} className=''>Details</Link>
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