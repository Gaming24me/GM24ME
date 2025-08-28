import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import TechShowcase1 from './pages/TechShowcase1'
import TechShowcase2 from './pages/TechShowcase2'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  const location = useLocation()

  return (
    <div>
      <Header />

      <main className="container">
        <div key={location.pathname} className="page">
          <Routes location={location}>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/tech-1" element={<TechShowcase1/>} />
            <Route path="/tech-2" element={<TechShowcase2/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}


