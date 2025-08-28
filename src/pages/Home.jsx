import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [visitorCount, setVisitorCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const canvasRef = useRef(null)

  // Real-time visitor simulation
  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Simulate visitor count
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(visitorInterval)
      clearInterval(timeInterval)
    }
  }, [])

  // Interactive background animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const particles = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: ['var(--lux-blue)', 'var(--electric-blue)', 'var(--neon-purple)'][Math.floor(Math.random() * 3)]
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mouse interaction
        const dx = particle.x - mousePosition.x * canvas.width
        const dy = particle.y - mousePosition.y * canvas.height
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          particle.vx += (dx / distance) * 0.01
          particle.vy += (dy / distance) * 0.01
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('var(', 'rgba(')
        ctx.fill()

        // Draw connections to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x
          const dy2 = particle.y - otherParticle.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (distance2 < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${(150 - distance2) / 500})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [mousePosition])

  const fastTravel = [
    {label:'About', href:'/about', desc:'Learn more about me', icon:'👤', category: 'personal'},
    {label:'Projects', href:'/projects', desc:'View my work', icon:'💼', category: 'work'},
    {label:'Tech Showcase 1', href:'/tech-1', desc:'Frontend mastery', icon:'⚛️', category: 'tech'},
    {label:'Tech Showcase 2', href:'/tech-2', desc:'Backend expertise', icon:'🏗️', category: 'tech'},
    {label:'Contact', href:'/contact', desc:'Get in touch', icon:'📬', category: 'personal'}
  ]

  const achievements = useMemo(() => [
    { value: visitorCount, label: 'Visitors Today', icon: '👥', color: 'var(--lux-blue)' },
    { value: '99.9%', label: 'Uptime', icon: '⚡', color: 'var(--electric-blue)' },
    { value: '2.4s', label: 'Avg Load Time', icon: '🚀', color: 'var(--neon-purple)' },
    { value: '50+', label: 'Projects Completed', icon: '💎', color: 'var(--lux-blue)' }
  ], [visitorCount])

  const skills = [
    {name:'React & Modern JS', level:'Expert', color:'var(--lux-blue)', progress: 95},
    {name:'UI/UX Design', level:'Advanced', color:'var(--electric-blue)', progress: 88},
    {name:'Backend Development', level:'Advanced', color:'var(--neon-purple)', progress: 85},
    {name:'Animation & Motion', level:'Expert', color:'var(--electric-blue)', progress: 92}
  ]

  const categories = {
    personal: { icon: '👤', color: 'var(--lux-blue)' },
    work: { icon: '💼', color: 'var(--electric-blue)' },
    tech: { icon: '⚡', color: 'var(--neon-purple)' }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Interactive Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />

      {/* Hero Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          animation: isLoaded ? 'fadeInUp 1s ease forwards' : 'none',
          opacity: isLoaded ? 1 : 0,
          transform: `translateY(${mousePosition.y * 10 - 5}px)`,
          transition: 'transform 0.1s ease'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            animation: isLoaded ? 'slideUp 1s ease forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            สวัสดี ✨
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '2rem',
            animation: isLoaded ? 'slideUp 1s ease 0.3s forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            Experience the future of web development with cutting-edge technologies and real-time interactions
          </p>

          {/* Live Stats Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  animation: `pulse 3s infinite ${index * 0.5}s`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: achievement.color
                }} />
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  animation: 'bounce 2s infinite'
                }}>
                  {achievement.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: achievement.color,
                  marginBottom: '0.25rem'
                }}>
                  {achievement.value}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, color: 'var(--muted)' }}>
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>

          {/* Current Time Display */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            marginBottom: '3rem',
            display: 'inline-block',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--lux-blue)', fontWeight: 'bold' }}>
              🕐 {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Skills Overview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '1000px',
            margin: '0 auto 3rem'
          }}>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  animation: `fadeInUp 0.8s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(6, 182, 212, 0.2)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: `${skill.progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                    borderRadius: '3px',
                    transition: 'width 2s ease',
                    animation: `fillWidth 2s ease ${index * 0.2}s forwards`,
                    transformOrigin: 'left'
                  }} />
                </div>
                <div style={{ fontWeight: 'bold', color: 'var(--text)', marginBottom: '0.25rem' }}>
                  {skill.name}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: skill.color,
                  fontWeight: 'bold'
                }}>
                  {skill.level} • {skill.progress}%
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('navigation').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '1.5rem 3rem',
              fontSize: '1.2rem',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-glow)',
              transition: 'all 0.3s ease',
              animation: isLoaded ? 'slideUp 1s ease 0.6s forwards' : 'none',
              opacity: isLoaded ? 1 : 0
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = 'var(--shadow-glow)'
            }}
          >
            Explore My World 🌟
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div id="navigation" style={{
        padding: '5rem 0',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Navigate My Digital Universe
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {Object.entries(categories).map(([categoryKey, category], categoryIndex) => (
              <div
                key={categoryKey}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  animation: `fadeInUp 0.6s ease ${categoryIndex * 0.2}s forwards`,
                  opacity: 0
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                  <h3 style={{ color: category.color, margin: 0 }}>
                    {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                  </h3>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {fastTravel
                    .filter(item => item.category === categoryKey)
                    .map((item, index) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: 'var(--text)',
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(6, 182, 212, 0.1)',
                          animation: `slideIn 0.4s ease ${index * 0.1}s forwards`,
                          opacity: 0
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)'
                          e.target.style.boxShadow = 'var(--shadow-medium)'
                          e.target.style.borderColor = category.color
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.1)'
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                            {item.desc}
                          </div>
                        </div>
                        <span style={{ color: category.color, fontSize: '1.2rem' }}>→</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          to { box-shadow: 0 0 30px rgba(6, 182, 212, 0.6); }
        }

        @keyframes fillWidth {
          from { width: 0%; }
          to { width: var(--progress); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}


