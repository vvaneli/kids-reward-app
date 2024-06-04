import { useState } from 'react'

// import Nav from './components/Nav'
// import Body from './components/Body'
import { Outlet, Link } from 'react-router-dom'

export default function Root() {

  return (
    <>
      < Outlet />
    </>
  )
}