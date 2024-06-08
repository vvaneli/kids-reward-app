import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function ProfileItemEdit() {
  const [profileItem, setProfileItem] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  let { profileId } = useParams()

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
        setErrorMsg(error.message)
      }
    }
    getProfileItem()
  }, [profileId])

  return (
    <>
      <main id='profile-item'>
        <h1>Profile Item</h1>
        {/* <Link to={'/profiles'}><p className=''>All Profiles</p></Link> */}
        {profileItem ?
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