import { useState } from 'react'

// import Nav from './components/Nav'
// import Body from './components/Body'
import { Outlet, Link } from 'react-router-dom'
import NavBar from './components/subcomponents/NavBar.jsx'

export default function Root() {

  return (
    <>
      < Outlet />
    </>
  )
}