import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function RewardDefineList() {
  const [rewardDefineList, setRewardDefineList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getRewardDefineList() {
      try {
        const { data } = await axios.get('/api/rewards-define/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Define a reward to use for goal setting.') }
        setRewardDefineList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getRewardDefineList()
  }, [])

  return (
    <>
      <main id='rewards-define-list'>
        <h1>rewards-define</h1>
        {rewardDefineList.length > 0 ?
              rewardDefineList.map(rewardDefineList => {
                return (
                  <article key={rewardDefineList.id}>
                    <h2>{rewardDefineList.title}</h2>
                    <img src={rewardDefineList.image1} alt={rewardDefineList.title} />
                    <p>{rewardDefineList.title_audio_url}</p>
                    <p>{rewardDefineList.value}</p>
                    <p>{rewardDefineList.description}</p>
                    <p>{rewardDefineList.description_audio_url}</p>
                    <Link to={`/rewards-define/${rewardDefineList.id}`} className=''>Details</Link>
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