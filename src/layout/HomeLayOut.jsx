import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'

export default function HomeLayOut() {
  return (
    <div>
      <nav className='sticky top-0 z-50'>
        <Navbar></Navbar>
      </nav>
      <main className=''>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}
