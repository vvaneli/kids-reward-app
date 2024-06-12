import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'

// Sub-Components
import NavBar from '../subcomponents/NavBar.jsx'

export default function StoriesList() {
  const [storiesList, setStoriesList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getStoriesList() {
      try {
        const { data } = await axios.get('/api/stories/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        // if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setStoriesList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getStoriesList()
  }, [])

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Stories List</h1>
        </header>
        <main id='stories-list'>
          {storiesList.length > 0 ?
            storiesList.map(storiesList => {
              return (
                <article key={storiesList.id}>
                  <h2>{storiesList.title}</h2>
                  <img src={storiesList.scenes_artwork[1]} alt='start story' />
                  <img src={storiesList.scenes_artwork[storiesList.steps + 1]} alt='story ending' />
                  {/* <img src={storiesList.items_artwork} alt='' /> */}
                  <p>{storiesList.title_audio_url}</p>
                  <p>{storiesList.about}</p>
                  <p>{storiesList.about_audio_url}</p>
                  <p>{storiesList.scenes_narrative}</p>
                  <p>{storiesList.scenes_narrative_audio}</p>
                  {/* <p><a href=''>Details</a></p> */}
                  <Link to={`/stories/${storiesList.id}`} className=''>Details</Link>
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