import React from 'react'
import { Outlet } from 'react-router'

export default function HomeLayOut() {
  return (
    <div>
      <nav>

      </nav>
      <main className='max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </div>
  )
}
