import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function DashboardKids() {
  const [storyItem, setStoryItem] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  let { storyId } = useParams()

  useEffect(() => {
    async function getDashboardKids() {
      try {
        const { data } = await axios.get(`/api/stories/${storyId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        setStoryItem(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getDashboardKids()
  }, [storyId])

  return (
    <>
      <main id='story-item'>
        <h1>Story Item</h1>
        <Link to={'/stories'}><p className=''>All Stories</p></Link>
        {storyItem ?
          <article>
            <h2>{storyItem.title}</h2>
            <img src={storyItem.scenes_artwork[1]} alt='start story' />
            <img src={storyItem.scenes_artwork[storyItem.steps + 1]} alt='story ending' />
            <img src={storyItem.items_artwork} alt='' />
            <p>{storyItem.title_audio_url}</p>
            <p>{storyItem.about}</p>
            <p>{storyItem.about_audio_url}</p>
            <p>{storyItem.scenes_narrative}</p>
            <p>{storyItem.scenes_narrative_audio}</p>
            <p>Steps: {storyItem.steps}</p>
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