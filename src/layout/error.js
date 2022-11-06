import React from 'react';
import { Outlet } from "react-router-dom"

export default function error() {
  return (
	<div>
    <Outlet/>
  </div>
  )
}
