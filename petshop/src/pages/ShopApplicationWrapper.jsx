import React from 'react'
import Navigation from '../components/Navigationbar'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

function ShopApplicationWrapper() {
  return (
    <>
        <Navigation />
        <ScrollToTop />
        <Outlet />


    </>
  )
}

export default ShopApplicationWrapper
