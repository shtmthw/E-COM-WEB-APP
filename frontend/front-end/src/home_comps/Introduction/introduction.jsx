import React from 'react'
// import cover from '../assets/cover.jpg'
import cover from '../../../src/assets/cover.jpg';
import './introduction.css'

function Introduction() {
  return (
    <div className='flexdiv'>
    <div className='Main-Intro-div'>
      <img className='cover' src={cover} alt="" />
      <h3>Get The Best Of The Best On Our Domain..</h3>

    </div>
    </div>
  )
}

export default Introduction