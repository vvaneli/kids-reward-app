import { Link, useNavigate } from 'react-router-dom'

import { removeToken } from '../../lib/auth'

import logoWord from '../../assets/smelly-earnie-logo.svg'
import profile from '../../assets/default_profile.svg'
import logout from '../../assets/logout_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import menuOpen from '../../assets/menu_24dp_FILL0_wght400_GRAD0_opsz24_000.svg'
import menuClose from '../../assets/close_24dp_FILL0_wght400_GRAD0_opsz24_000.svg'

export default function NavBar() {

  const navigate = useNavigate()

  function handleMenuOpen() {

  }
  function handleMenuClose() {

  }
  function handleLogOut() {
    removeToken()
    navigate('/login')
  }

  return (
    <>
    {/* <img className='nav-icon menu-open' src={menuOpen} alt='open menu' onClick={handleMenuOpen} /> */}
    {/* <img className='nav-icon menu-close' src={menuClose} alt='close menu' onClick={handleMenuClose} /> */}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <ul>
          <li className='link-to'><Link to={'/dashboard'}><img className='nav-logo' src={logoWord} alt='home' /></Link></li>

          <ul className="dropdown">
            <p className="dropdown-title">Set</p>
            <div className="dropdown-items">
              {/* <li><Link to={'/rewards-define/add'} className='link-to'>Define a reward</Link></li> */}
              {/* <li><Link to={'/tasks-define/add'} className='link-to'>Define a task</Link></li> */}
              <li><Link to={'/goals/add'} className='link-to'>Set a goal</Link></li>
            </div>
          </ul>

          <ul className="dropdown">
            <p className="dropdown-title">Ready</p>
            <div className="dropdown-items">
              <li><Link to={'/rewards-define'} className='link-to'>Rewards defined</Link></li>
              <li><Link to={'/tasks-define'} className='link-to'>Tasks defined</Link></li>
              <li><Link to={'/stories'} className='link-to'>Stories</Link></li>
            </div>
          </ul>

          <ul className="dropdown">
            <p className="dropdown-title">Action</p>
            <div className="dropdown-items">
              <li><Link to={'/tasks/add'} className='link-to'>Log a task</Link></li>
              <li><Link to={'/tasks'} className='link-to'>Tasks done</Link></li>
              <li><Link to={'/goals'} className='link-to'>Goal progress</Link></li>
            </div>
          </ul>

          <div className='spacer'></div>

          {/* <div> */}
          <li className='link-to profiles-icon'><Link to={'/profiles/group'}><img className='nav-icon' src={profile} alt='profiles' /></Link></li>
          <li className='link-to profiles-text'><Link to={'/profiles/group'}>People</Link></li>
          {/* </div> */}
          {/* <div> */}
          <li className='link-to logout-icon'><img className='nav-icon logout' src={logout} alt='logout' onClick={handleLogOut} /></li>
          <li className='link-to logout-text' onClick={handleLogOut}>Log out</li>

          {/* </div> */}
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