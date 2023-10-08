import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Stickywall from './Stickywall'
import Calender from './Attendence'
import Today from './Courses'
import Upcoming from './Student'

export default function Index() {

  return (
    <Routes>
        <Route path='/' element={<Stickywall/>} />
        <Route path='/attendence' element={<Calender/>} />
        <Route path='/courses' element={<Today/>} />
        <Route path='/students' element={<Upcoming/>} />
        
    </Routes>
  )
}
