import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'

// Sub-Components
import NavBar from '../subcomponents/NavBar.jsx'

export default function StoryItem() {
  const [storyItem, setStoryItem] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  let { storyId } = useParams()

  useEffect(() => {
    async function getStoryItem() {
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
    getStoryItem()
  }, [storyId])

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Story Item</h1>
        </header>
        <main id='story-item'>
          <Link to={'/stories'}><p className=''>Back to all Stories</p></Link>
          {storyItem ?
            <article>
              <h2>{storyItem.title}</h2>
              <p>{storyItem.title_audio_url}</p>
              <p>{storyItem.about}</p>
              <p>{storyItem.about_audio_url}</p>
              <p>Steps: {storyItem.steps}</p>
              <p>Start image:</p>
              <br />
              <img src={storyItem.scenes_artwork[1]} alt='start story' />
              <p>Last image:</p>
              <br />
              <img src={storyItem.scenes_artwork[storyItem.steps + 1]} alt='story ending' />
              <img src={storyItem.items_artwork} alt='' />


              <p>{storyItem.scenes_narrative}</p>
              <p>{storyItem.scenes_narrative_audio}</p>
            </article>
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