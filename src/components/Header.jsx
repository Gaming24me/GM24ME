import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const loc = useLocation()
  const nav = [
    {label:'Home', to:'/'},
    {label:'About', to:'/about'},
    {label:'Projects', to:'/projects'},
    {label:'Tech 1', to:'/tech-1'},
    {label:'Tech 2', to:'/tech-2'},
    {label:'Contact', to:'/contact'}
  ]

  return (
    <header className="site-header">
      <div className="logo">พอร์ตโฟลิโอ</div>
      <nav className="nav">
        {nav.map((n,i)=> (
          <Link key={i} to={n.to} className={loc.pathname===n.to? 'active link':'link'}>{n.label}</Link>
        ))}
      </nav>
    </header>
  )
}


