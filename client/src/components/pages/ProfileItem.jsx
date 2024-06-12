import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getToken, removeToken } from '../../lib/auth.js'

// Sub-Components
import NavBar from '../subcomponents/NavBar.jsx'

export default function ProfileItem() {
  const [profileItem, setProfileItem] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  let { profileId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    async function getProfileItem() {
      try {
        const { data } = await axios.get(`/api/account/${profileId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        // if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setProfileItem(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message) // outputs: 'Request failed with status code ...'
      }
    }
    getProfileItem()
  }, [profileId])

  // Delete account
  async function deleteAccount(e) {
    e.preventDefault()
    try {
      await axios.delete(`/api/account/${profileId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      removeToken()
      navigate('/')
    } catch (error) {
      console.log(error.message)
      setErrorMsg(error.message)
    }
  }

  return (
    <>
    <NavBar />
<div className='wrapper'>
  <header>
        <h1>Profile Item</h1>
  </header>
      <main id='profile-item'>
        {/* <Link to={'/profiles'}><p className=''>All Profiles</p></Link> */}
        {profileItem ?
          <>
            <article>
              <h2>{profileItem.nickname}</h2>
              <img src={profileItem.image_profile} alt='profile image' />
              <p>Nickname: {profileItem.nickname}</p>
              <p>Username: {profileItem.username}</p>
              <p>Email: {profileItem.email}</p>
              <p>First name: {profileItem.first_name}</p>
              <p>Last name:{profileItem.last_name}</p>
              <p>Birthday: {profileItem.birthday}</p>
              <p>Access level: {profileItem.access_level}</p>
            </article>
            <aside>
              <Link to={`/profiles/edit/${profileItem.id}`}>Edit</Link>
            </aside>
          </>
          :
          errorMsg ?
            <p><em>{errorMsg}</em></p>
            :
            <p><em>Downloading&#8230;</em></p>
        }
      </main>
      <aside className='account-delete'>
        <button type='button' onClick={deleteAccount}>Delete Account</button>
      </aside>
      </div>
    </>
  )

}