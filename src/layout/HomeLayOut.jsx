import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/share/Navbar'

export default function HomeLayOut() {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className='max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </div>
  )
}
