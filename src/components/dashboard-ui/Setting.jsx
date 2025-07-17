import React from 'react'
import SettingNavbar from './setting-ui/SettingNavbar'
import {Outlet} from "react-router-dom"

function Setting() {
  return (
    <>
    <SettingNavbar/>
    <Outlet/>
    </>
  )
}

export default Setting
