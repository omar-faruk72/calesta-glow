import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'

export default function HomeLayOut() {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className='max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}
