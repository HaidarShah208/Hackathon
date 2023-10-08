import React from 'react'
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Dashboard from './Dashboard'
export default function Index() {

  return (
    <>
    <Routes>
      <Route path='/*' element={<Dashboard/>} />
    </Routes>
    <ToastContainer />
    </>
  )
}
