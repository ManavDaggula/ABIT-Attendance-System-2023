import React from 'react'
import "./Header.css"
import logo from "./../abit_logo.jpg";

export default function Header() {
  return (
    <div className="header">
        <img src={logo} alt="" />
    </div>
  )
}
