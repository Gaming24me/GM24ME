import React, { useState, useEffect, useRef, useMemo } from 'react'

const About = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: 0,
    currentSession: 0,
    pageViews: 0
  })
  const [selectedExperience, setSelectedExperience] = useState(0)
  const canvasRef = useRef(null)

  const fullBio = "I'm passionate about creating exceptional digital experiences through clean code, innovative design, and cutting-edge technologies. With expertise in both frontend and backend development, I bring ideas to life through robust, scalable solutions that delight users and drive business growth."

  // Typing animation effect
  useEffect(() => {
    if (activeTab === 'about' && !isTyping) {
      setIsTyping(true)
      setTypedText('')

      let index = 0
      const typingInterval = setInterval(() => {
        if (index < fullBio.length) {
          setTypedText(fullBio.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [activeTab, isTyping])

  // Real-time updates
  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Update time and stats
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setVisitorStats(prev => ({
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 3),
        currentSession: Math.floor(Math.random() * 100) + 50,
        pageViews: prev.pageViews + Math.floor(Math.random() * 2)
      }))
    }, 2000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  // Interactive background particles
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const particles = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        color: ['var(--lux-blue)', 'var(--electric-blue)', 'var(--neon-purple)'][Math.floor(Math.random() * 3)]
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('var(', 'rgba(')
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const tabs = {
    about: {
      name: 'About Me',
      icon: '👤',
      content: {
        title: 'Hello, I\'m Your Name',
        subtitle: 'Full-Stack Developer & UI/UX Enthusiast',
        description: fullBio,
        highlights: [
          '🎯 5+ years of experience in web development',
          '🚀 Proficient in React, Node.js, and cloud technologies',
          '🎨 Strong focus on user experience and accessibility',
          '🌟 Passionate about performance optimization and best practices'
        ],
        stats: [
          { label: 'Projects Completed', value: '50+', icon: '💎', color: 'var(--lux-blue)' },
          { label: 'Happy Clients', value: '25+', icon: '😊', color: 'var(--electric-blue)' },
          { label: 'Lines of Code', value: '100K+', icon: '📝', color: 'var(--neon-purple)' },
          { label: 'Coffee Cups', value: '500+', icon: '☕', color: 'var(--lux-blue)' }
        ]
      }
    },
    skills: {
      name: 'Skills & Expertise',
      icon: '🛠️',
      content: {
        categories: [
          {
            title: 'Frontend Development',
            icon: '💻',
            skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
            level: 95,
            description: 'Modern React ecosystem with TypeScript for type safety and Next.js for optimal performance'
          },
          {
            title: 'Backend Development',
            icon: '⚙️',
            skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
            level: 90,
            description: 'Scalable backend solutions with REST APIs, GraphQL, and microservices architecture'
          },
          {
            title: 'DevOps & Cloud',
            icon: '☁️',
            skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
            level: 85,
            description: 'Cloud-native development with containerization, orchestration, and automated deployment'
          }
        ]
      }
    },
    experience: {
      name: 'Experience',
      icon: '💼',
      content: {
        roles: [
          {
            title: 'Senior Full-Stack Developer',
            company: 'Tech Innovation Corp',
            period: '2022 - Present',
            description: 'Lead development of scalable web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.',
            achievements: [
              'Improved application performance by 40%',
              'Led team of 5 developers',
              'Implemented CI/CD pipelines',
              'Reduced deployment time by 60%'
            ],
            tech: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
            metrics: [
              { label: 'Team Size', value: '5 developers' },
              { label: 'Users Served', value: '100K+' },
              { label: 'Performance Gain', value: '40%' }
            ]
          },
          {
            title: 'Frontend Developer',
            company: 'Digital Solutions Ltd',
            period: '2020 - 2022',
            description: 'Developed responsive web applications using React and modern JavaScript. Collaborated with design teams to implement pixel-perfect UIs.',
            achievements: [
              'Built 15+ production applications',
              'Reduced bundle size by 30%',
              'Established design system',
              'Improved Lighthouse scores by 25 points'
            ],
            tech: ['React', 'JavaScript', 'SCSS', 'Figma'],
            metrics: [
              { label: 'Apps Built', value: '15+' },
              { label: 'Bundle Reduction', value: '30%' },
              { label: 'Lighthouse Score', value: '+25pts' }
            ]
          }
        ]
      }
    },
    contact: {
      name: 'Get In Touch',
      icon: '📬',
      content: {
        info: [
          {label: 'Email', value: 'your.email@example.com', icon: '✉️', action: 'mailto:your.email@example.com'},
          {label: 'Phone', value: '+1 (555) 123-4567', icon: '📞', action: 'tel:+15551234567'},
          {label: 'Location', value: 'Your City, Country', icon: '📍', action: null},
          {label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', icon: '💼', action: 'https://linkedin.com/in/yourprofile'}
        ],
        availability: {
          status: 'Available for new projects',
          responseTime: '< 24 hours',
          timezone: 'UTC+7'
        }
      }
    }
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
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      />

      {/* Hero Section */}
      <div style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          transform: `translateY(${mousePosition.y * 15 - 7}px)`,
          transition: 'transform 0.1s ease'
        }}>
          {/* Avatar with real-time effects */}
          <div style={{
            position: 'relative',
            margin: '0 auto 2rem',
            width: '180px',
            height: '180px'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              animation: isLoaded ? 'bounce 1s ease forwards' : 'none',
              opacity: isLoaded ? 1 : 0,
              position: 'relative',
              overflow: 'hidden'
            }}>
              👨‍💻
              {/* Animated border */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid transparent',
                borderTop: '3px solid var(--lux-blue)',
                borderRight: '3px solid var(--electric-blue)',
                animation: 'spin 3s linear infinite'
              }} />
            </div>

            {/* Status indicator */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--lux-blue)',
              border: '3px solid var(--bg)',
              animation: 'pulse 2s infinite'
            }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 12vw, 7rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            animation: isLoaded ? 'slideUp 1s ease 0.2s forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            About Me
          </h1>

          {/* Real-time typing bio */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 2rem',
            minHeight: '100px'
          }}>
            <p style={{
              fontSize: '1.3rem',
              opacity: 0.9,
              lineHeight: 1.6,
              animation: isLoaded ? 'slideUp 1s ease 0.4s forwards' : 'none',
              opacity: isLoaded ? 1 : 0,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap'
            }}>
              {activeTab === 'about' ? typedText : tabs[activeTab].content.description}
              {activeTab === 'about' && isTyping && (
                <span style={{
                  animation: 'blink 1s infinite',
                  color: 'var(--lux-blue)'
                }}>
                  █
                </span>
              )}
            </p>
          </div>

          {/* Live Stats Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '1000px',
            margin: '0 auto 3rem'
          }}>
            {tabs.about.content.stats.map((stat, index) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  animation: `pulse 3s infinite ${index * 0.7}s`,
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
                  background: stat.color
                }} />
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem',
                  animation: 'bounce 2s infinite'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  marginBottom: '0.25rem'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, color: 'var(--muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Real-time time and visitor info */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            display: 'inline-block',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--lux-blue)', fontWeight: 'bold' }}>
              🕐 {currentTime.toLocaleTimeString()} • 👥 {visitorStats.totalVisitors} visitors today
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Tab Navigation */}
      <div style={{
        padding: '3rem 0',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="container">
          {/* Interactive Tab Navigation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {Object.entries(tabs).map(([key, tab], index) => (
              <div
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: activeTab === key ? '2px solid var(--lux-blue)' : '2px solid rgba(6, 182, 212, 0.2)',
                  background: activeTab === key ?
                    'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))' :
                    'rgba(255, 255, 255, 0.05)',
                  color: activeTab === key ? 'white' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== key) {
                    e.target.style.transform = 'translateY(-5px)'
                    e.target.style.boxShadow = 'var(--shadow-large)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== key) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  animation: activeTab === key ? 'bounce 2s infinite' : 'none'
                }}>
                  {tab.icon}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {tab.name}
                </div>
                {activeTab === key && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'var(--neon-purple)',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Advanced Tab Content */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            boxShadow: 'var(--shadow-large)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.05,
              backgroundImage: `radial-gradient(circle at 20% 20%, var(--lux-blue) 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, var(--electric-blue) 0%, transparent 50%),
                               radial-gradient(circle at 40% 80%, var(--neon-purple) 0%, transparent 50%)`
            }} />

            {/* About Tab */}
            {activeTab === 'about' && (
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {tabs.about.content.title}
                  </h2>
                  <h3 style={{ color: 'var(--lux-blue)', marginBottom: '2rem' }}>
                    {tabs.about.content.subtitle}
                  </h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem',
                  marginBottom: '3rem'
                }}>
                  {tabs.about.content.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '2rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: `slideIn 0.6s ease ${index * 0.1}s forwards`,
                        opacity: 0
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-5px)'
                        e.target.style.boxShadow = 'var(--shadow-large)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'var(--shadow-medium)'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'linear-gradient(90deg, var(--lux-blue), var(--electric-blue))'
                      }} />
                      <div style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                        {highlight}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive highlights grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { icon: '🎯', title: 'Problem Solver', desc: 'Turning complex challenges into elegant solutions' },
                    { icon: '🚀', title: 'Performance Focus', desc: 'Optimizing for speed and efficiency' },
                    { icon: '🎨', title: 'Design Minded', desc: 'Creating beautiful, intuitive experiences' },
                    { icon: '🌟', title: 'Innovation Driven', desc: 'Pushing boundaries with cutting-edge tech' }
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      style={{
                        padding: '1.5rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        animation: `fadeInUp 0.8s ease ${index * 0.2}s forwards`,
                        opacity: 0
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)'
                        e.target.style.background = 'rgba(6, 182, 212, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)'
                        e.target.style.background = 'rgba(6, 182, 212, 0.1)'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {item.icon}
                      </div>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--lux-blue)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{
                  textAlign: 'center',
                  marginBottom: '3rem',
                  background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Technical Mastery
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: '2rem'
                }}>
                  {tabs.skills.content.categories.map((category, index) => (
                    <div
                      key={category.title}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                        opacity: 0
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-5px)'
                        e.target.style.boxShadow = 'var(--shadow-large)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'var(--shadow-medium)'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'linear-gradient(90deg, var(--lux-blue), var(--electric-blue))'
                      }} />

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
                        <div>
                          <h3 style={{ margin: 0, color: 'var(--lux-blue)' }}>{category.title}</h3>
                          <p style={{ margin: '0.5rem 0', opacity: 0.8, fontSize: '0.9rem' }}>
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Advanced skill bar */}
                      <div style={{
                        width: '100%',
                        height: '12px',
                        background: 'rgba(6, 182, 212, 0.2)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        marginBottom: '1.5rem',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: `${category.level}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--lux-blue), var(--electric-blue))',
                          borderRadius: '6px',
                          transition: 'width 2s ease',
                          animation: `fillWidth 2s ease ${index * 0.2}s forwards`,
                          transformOrigin: 'left'
                        }} />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          {category.level}%
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {category.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'rgba(6, 182, 212, 0.1)',
                              border: '1px solid rgba(6, 182, 212, 0.3)',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              color: 'var(--lux-blue)',
                              transition: 'all 0.3s ease',
                              animation: `slideIn 0.4s ease ${skillIndex * 0.1}s forwards`,
                              opacity: 0
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.1)'
                              e.target.style.background = 'rgba(6, 182, 212, 0.2)'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)'
                              e.target.style.background = 'rgba(6, 182, 212, 0.1)'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{
                  textAlign: 'center',
                  marginBottom: '3rem',
                  background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Career Timeline
                </h2>

                <div style={{ position: 'relative' }}>
                  {/* Timeline line */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: 'linear-gradient(to bottom, var(--lux-blue), var(--electric-blue))',
                    transform: 'translateX(-50%)'
                  }} />

                  {tabs.experience.content.roles.map((role, index) => (
                    <div
                      key={role.title}
                      style={{
                        display: 'flex',
                        alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
                        marginBottom: '3rem',
                        position: 'relative'
                      }}
                    >
                      {/* Timeline dot */}
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--lux-blue)',
                        border: '4px solid var(--bg)',
                        transform: 'translate(-50%, -50%)',
                        animation: `pulse 2s infinite ${index * 0.5}s`
                      }} />

                      <div style={{
                        width: '45%',
                        marginLeft: index % 2 === 0 ? '0' : 'auto',
                        marginRight: index % 2 === 0 ? 'auto' : '0',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '16px',
                        padding: '2rem',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        position: 'relative',
                        animation: `slideIn 0.6s ease ${index * 0.2}s forwards`,
                        opacity: 0
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: 'var(--lux-blue)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {role.period}
                        </div>

                        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: 'var(--lux-blue)' }}>
                          {role.title}
                        </h3>
                        <h4 style={{ color: 'var(--electric-blue)', margin: 0, marginBottom: '1rem' }}>
                          {role.company}
                        </h4>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                          {role.description}
                        </p>

                        {/* Metrics */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                          gap: '1rem',
                          marginBottom: '1.5rem'
                        }}>
                          {role.metrics.map((metric, metricIndex) => (
                            <div
                              key={metric.label}
                              style={{
                                background: 'rgba(6, 182, 212, 0.1)',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px solid rgba(6, 182, 212, 0.2)'
                              }}
                            >
                              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--lux-blue)' }}>
                                {metric.value}
                              </div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech stack */}
                        <div style={{ marginBottom: '1rem' }}>
                          <h5 style={{ marginBottom: '0.5rem', color: 'var(--neon-purple)' }}>
                            Technologies Used:
                          </h5>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {role.tech.map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  background: 'rgba(139, 92, 246, 0.1)',
                                  border: '1px solid rgba(139, 92, 246, 0.3)',
                                  borderRadius: '12px',
                                  fontSize: '0.8rem',
                                  color: 'var(--neon-purple)'
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 style={{ marginBottom: '0.5rem', color: 'var(--lux-blue)' }}>
                            Key Achievements:
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {role.achievements.map((achievement, i) => (
                              <div
                                key={i}
                                style={{
                                  padding: '0.5rem',
                                  background: 'rgba(34, 197, 94, 0.1)',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(34, 197, 94, 0.2)',
                                  fontSize: '0.9rem'
                                }}
                              >
                                ✅ {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Let's Build Something Amazing
                  </h2>
                  <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
                    I'm always excited to collaborate on innovative projects and help bring your ideas to life.
                  </p>

                  {/* Availability status */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '25px',
                    padding: '1rem 2rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'var(--lux-blue)',
                      animation: 'pulse 2s infinite'
                    }} />
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--lux-blue)' }}>
                        {tabs.contact.content.availability.status}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        Response time: {tabs.contact.content.availability.responseTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {tabs.contact.content.info.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.action || '#'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        padding: '2rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '16px',
                        textDecoration: 'none',
                        color: 'var(--text)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                        opacity: 0
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-5px)'
                        e.target.style.boxShadow = 'var(--shadow-large)'
                        e.target.style.borderColor = 'var(--lux-blue)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'var(--shadow-medium)'
                        e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)'
                      }}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--lux-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: 'white',
                        animation: `pulse 3s infinite ${index * 0.5}s`
                      }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                          {item.label}
                        </div>
                        <div style={{ opacity: 0.8, marginBottom: '0.5rem' }}>
                          {item.value}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'var(--lux-blue)',
                          fontWeight: 'bold'
                        }}>
                          Click to connect →
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
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

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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

export default About
