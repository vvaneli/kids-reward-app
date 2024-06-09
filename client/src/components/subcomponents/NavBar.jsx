import { Link, useNavigate } from 'react-router-dom'

import { removeToken } from '../../lib/auth'

import logoWord from '../../assets/smelly-earnie-logo.svg'
import profile from '../../assets/default_profile.svg'
import logout from '../../assets/logout_24dp_FILL0_wght400_GRAD0_opsz24.svg'

export default function NavBar() {

  const navigate = useNavigate()

  function handleLogOut() {
    removeToken()
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <ul>
          <Link to={'/dashboard'} className='link-to'><li><img src={logoWord} alt='home' /></li></Link>


          <li className="dropdown">
            <a href="javascript:void(0)" className="dropdown-title">Set</a>
            <div className="dropdown-items">
              <Link to={'/rewards-define/add'} className='link-to'><li>Define a reward</li></Link>
              <Link to={'/tasks-define/add'} className='link-to'><li>Define a task</li></Link>
              <Link to={'/goals/add'} className='link-to'><li>Set a goal</li></Link>
            </div>
          </li>

          <li className="dropdown">
            <a href="javascript:void(0)" className="dropdown-title">Ready</a>
            <div className="dropdown-items">
              <Link to={'/rewards-define'} className='link-to'><li>Rewards defined</li></Link>
              <Link to={'/tasks-define'} className='link-to'><li>Tasks defined</li></Link>
              <Link to={'/stories'} className='link-to'><li>Stories</li></Link>
            </div>
          </li>

          <li className="dropdown">
            <a href="javascript:void(0)" className="dropdown-title">Action</a>
            <div className="dropdown-items">
              <Link to={'/tasks/add'} className='link-to'><li>Log a task</li></Link>
              <Link to={'/tasks'} className='link-to'><li>Tasks done</li></Link>
              <Link to={'/goals'} className='link-to'><li>Goal progress</li></Link>
            </div>
          </li>
          <Link to={'/profiles'} className='link-to'><li><img src={profile} alt='profiles' /></li></Link>
          <li className='link-to logout'><img src={logout} alt='logout' onClick={handleLogOut} /></li>

        </ul>
      </nav >
    </>
  )
}

{/* <h3>Define Rewards</h3>


  <h3>Set Goals</h3>

  <h2>Log Tasks</h2>

  <h3>People</h3>
  <Link to={'/profiles'} className='link-to'>Profiles</Link>
  <Link to={'/profiles/edit/'} className='link-to'>Edit Profile -- form</Link>
{/* <h3>Stories</h3> 
            //! Get Set
          <Link to={'/goals/add'} className='link-to'><li>Set a goal</li></Link>
          <Link to={'/rewards-define/add'} className='link-to'>Reward definition -- form</Link>
          <Link to={'/tasks-define/add'} className='link-to'>Task definition -- form</Link>
          //! Ready

          <Link to={'/goals'} className='link-to'>List of goals</Link>
          <Link to={'/rewards-define'} className='link-to'>Reward definitions</Link>
          <Link to={'/tasks-define'} className='link-to'>Task definitions</Link>
          <Link to={'/stories'} className='link-to'>List of stories</Link>
          //! Action
          <Link to={'/tasks/add'} className='link-to'>Add a task done -- form</Link>
          <Link to={'/tasks'} className='link-to'>List of tasks done</Link>
  */ }
// 
{/* <li className="dropdown">
            <a href="javascript:void(0)" className="dropdown-title">Village</a>
            <div className="dropdown-items">
            <Link to={'/profiles'} className='link-to'><li>Profiles</li></Link>
            <Link to={'/profiles/edit/'} className='link-to'><li>Edit Profile -- form</li></Link>
            </div>
          </li> */}