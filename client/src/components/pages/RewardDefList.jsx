import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function RewardDefList() {
  const [rewardDefList, setRewardDefList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getRewardDefList() {
      try {
        const { data } = await axios.get('/api/rewards-define/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Define a reward to use for goal setting.') }
        setRewardDefList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getRewardDefList()
  }, [])

  return (
    <>
      <main id='rewards-define-list'>
        <h1>rewards-define</h1>
        {rewardDefList.length > 0 ?
              rewardDefList.map(rewardDefList => {
                return (
                  <article key={rewardDefList.id}>
                    <h2>{rewardDefList.title}</h2>
                    <img src={rewardDefList.image1} alt={rewardDefList.title} />
                    <p>{rewardDefList.title_audio_url}</p>
                    <p>{rewardDefList.value}</p>
                    <p>{rewardDefList.description}</p>
                    <p>{rewardDefList.description_audio_url}</p>
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