import React from 'react'
import Hero from '../components/HomePage/Hero'
import Bestsellers from '../components/HomePage/Bestsellers'
import CategoryGrid from '../components/HomePage/CategoryGrid'
import NewArrivals from '../components/HomePage/NewArrivals'
import Philosophy from '../components/HomePage/Philosophy'
import Testimonials from '../components/HomePage/Testimonials'

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Bestsellers></Bestsellers>
      <CategoryGrid></CategoryGrid>
      <NewArrivals></NewArrivals>
      <Philosophy></Philosophy>
      <Testimonials></Testimonials>
    </div>
  )
}
