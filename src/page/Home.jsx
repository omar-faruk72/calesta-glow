import React from 'react'
import Hero from '../components/HomePage/Hero'
import Bestsellers from '../components/HomePage/Bestsellers'
import CategoryGrid from '../components/HomePage/CategoryGrid'

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Bestsellers></Bestsellers>
      <CategoryGrid></CategoryGrid>
    </div>
  )
}
