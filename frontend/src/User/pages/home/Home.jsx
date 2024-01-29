import React from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Topsuggestion from '../../components/topsuggestion/Topsuggestion'
import Hero from '../../components/hero/Hero'
import Enrolledsuggestion from '../../components/enrolledsuggestion/Enrolledsuggestion'
import Suggestion from '../../components/suggestion/Suggestion'
import Footer from '../../components/footer/footer'

const Home = () => {
  return (
    <div className='userHome'>
      <Navbar/>
      <Topsuggestion/>
      <Hero/>
      <Enrolledsuggestion/>
      <Suggestion title="Because you viewed games"/>
      <Suggestion title="Because searched PSC"/>
      <Suggestion title="Recommended for you"/>
      <Footer/>
    </div>
  )
}

export default Home