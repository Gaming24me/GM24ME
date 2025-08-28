import React, { useState, useEffect, useRef, useMemo } from 'react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectStats, setProjectStats] = useState({
    totalCommits: 0,
    totalStars: 0,
    totalForks: 0,
    totalContributors: 0
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const canvasRef = useRef(null)

  // Real-time project statistics
  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Simulate real-time GitHub stats
    const statsInterval = setInterval(() => {
      setProjectStats(prev => ({
        totalCommits: prev.totalCommits + Math.floor(Math.random() * 5) + 1,
        totalStars: prev.totalStars + Math.floor(Math.random() * 3),
        totalForks: prev.totalForks + Math.floor(Math.random() * 2),
        totalContributors: prev.totalContributors + (Math.random() > 0.9 ? 1 : 0)
      }))
      setCurrentTime(new Date())
    }, 3000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(statsInterval)
    }
  }, [])

  // Interactive background animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const nodes = []
    const connections = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create project nodes
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 4 + 2,
        alpha: Math.random() * 0.4 + 0.1,
        type: Math.random() > 0.6 ? 'project' : 'tech',
        color: Math.random() > 0.5 ? 'var(--lux-blue)' : 'var(--electric-blue)'
      })
    }

    // Create connections between related projects
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.85) {
          connections.push({
            from: i,
            to: j,
            active: Math.random() > 0.7,
            strength: Math.random()
          })
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach(conn => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]

        ctx.strokeStyle = conn.active ?
          `rgba(6, 182, 212, ${conn.strength * 0.6})` :
          'rgba(6, 182, 212, 0.1)'
        ctx.lineWidth = conn.active ? 2 : 1
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()

        // Draw data flow animation
        if (conn.active && Math.random() > 0.98) {
          const progress = Math.random()
          const x = from.x + (to.x - from.x) * progress
          const y = from.y + (to.y - from.y) * progress

          ctx.fillStyle = 'var(--electric-blue)'
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Update and draw nodes
      nodes.forEach((node, index) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.fillStyle = node.color.replace(')', `, ${node.alpha})`).replace('var(', 'rgba(')
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw pulsing ring for active projects
        if (node.type === 'project' && Math.random() > 0.95) {
          ctx.strokeStyle = node.color.replace(')', ', 0.3)').replace('var(', 'rgba(')
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product catalog, shopping cart, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      image: '🛍️',
      demoUrl: 'https://demo1.vercel.app',
      codeUrl: 'https://github.com/demo1',
      featured: true,
      status: 'Production',
      stars: 245,
      commits: 1247,
      contributors: 8,
      lastUpdate: '2 hours ago',
      complexity: 'Advanced',
      performance: 98
    },
    {
      id: 2,
      title: 'Real-time Chat Application',
      category: 'web',
      description: 'Modern chat app with WebSocket integration, featuring real-time messaging, user presence indicators, and file sharing capabilities.',
      technologies: ['React', 'Socket.io', 'Express', 'Redis', 'PostgreSQL'],
      image: '💬',
      demoUrl: 'https://demo2.vercel.app',
      codeUrl: 'https://github.com/demo2',
      featured: true,
      status: 'Production',
      stars: 189,
      commits: 892,
      contributors: 5,
      lastUpdate: '1 day ago',
      complexity: 'Expert',
      performance: 95
    },
    {
      id: 3,
      title: 'AI-Powered Task Manager',
      category: 'web',
      description: 'Smart task management app with AI suggestions, natural language processing, and collaborative features for teams.',
      technologies: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL'],
      image: '🤖',
      demoUrl: 'https://demo3.vercel.app',
      codeUrl: 'https://github.com/demo3',
      featured: true,
      status: 'Beta',
      stars: 312,
      commits: 567,
      contributors: 12,
      lastUpdate: '3 hours ago',
      complexity: 'Expert',
      performance: 92
    },
    {
      id: 4,
      title: 'Mobile Fitness Tracker',
      category: 'mobile',
      description: 'Cross-platform mobile app for fitness tracking with workout plans, progress analytics, and social features.',
      technologies: ['React Native', 'Firebase', 'ML Kit', 'Stripe'],
      image: '🏃‍♂️',
      demoUrl: 'https://demo4.vercel.app',
      codeUrl: 'https://github.com/demo4',
      featured: false,
      status: 'Development',
      stars: 67,
      commits: 234,
      contributors: 3,
      lastUpdate: '1 week ago',
      complexity: 'Advanced',
      performance: 88
    },
    {
      id: 5,
      title: 'Data Visualization Dashboard',
      category: 'web',
      description: 'Interactive dashboard for business analytics with real-time data visualization and custom report generation.',
      technologies: ['React', 'D3.js', 'Chart.js', 'Express', 'MongoDB'],
      image: '📊',
      demoUrl: 'https://demo5.vercel.app',
      codeUrl: 'https://github.com/demo5',
      featured: false,
      status: 'Production',
      stars: 156,
      commits: 445,
      contributors: 6,
      lastUpdate: '5 days ago',
      complexity: 'Advanced',
      performance: 96
    },
    {
      id: 6,
      title: 'ML Image Recognition API',
      category: 'ml',
      description: 'RESTful API for image recognition and classification using TensorFlow.js with pre-trained models.',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Docker', 'AWS'],
      image: '🔍',
      demoUrl: 'https://demo6.vercel.app',
      codeUrl: 'https://github.com/demo6',
      featured: false,
      status: 'Production',
      stars: 89,
      commits: 312,
      contributors: 4,
      lastUpdate: '2 days ago',
      complexity: 'Expert',
      performance: 94
    }
  ]

  const categories = [
    {key: 'all', label: 'All Projects', icon: '🚀', count: projects.length, color: 'var(--lux-blue)'},
    {key: 'web', label: 'Web Apps', icon: '🌐', count: projects.filter(p => p.category === 'web').length, color: 'var(--electric-blue)'},
    {key: 'mobile', label: 'Mobile Apps', icon: '📱', count: projects.filter(p => p.category === 'mobile').length, color: 'var(--neon-purple)'},
    {key: 'ml', label: 'AI/ML', icon: '🤖', count: projects.filter(p => p.category === 'ml').length, color: 'var(--lux-blue)'}
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  const featuredProjects = projects.filter(p => p.featured)

  const projectMetrics = useMemo(() => ({
    totalProjects: projects.length,
    liveProjects: projects.filter(p => p.status === 'Production').length,
    totalStars: projects.reduce((sum, p) => sum + p.stars, 0),
    totalCommits: projects.reduce((sum, p) => sum + p.commits, 0),
    avgPerformance: Math.round(projects.reduce((sum, p) => sum + p.performance, 0) / projects.length)
  }), [projects])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production': return 'var(--lux-blue)'
      case 'Beta': return 'var(--electric-blue)'
      case 'Development': return 'var(--neon-purple)'
      default: return 'var(--text)'
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
        minHeight: '80vh',
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
          <h1 style={{
            fontSize: 'clamp(3rem, 12vw, 7rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            animation: isLoaded ? 'slideUp 1s ease forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            Innovation Portfolio
          </h1>
          <p style={{
            fontSize: '1.3rem',
            opacity: 0.9,
            marginBottom: '2rem',
            animation: isLoaded ? 'slideUp 1s ease 0.2s forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            Showcasing enterprise-grade solutions and cutting-edge technologies that drive business growth
          </p>

          {/* Live Project Statistics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            {Object.entries(projectMetrics).map(([key, value], index) => (
              <div
                key={key}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  animation: `pulse 3s infinite ${index * 0.8}s`,
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
                  background: 'var(--lux-blue)'
                }} />
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  animation: 'bounce 2s infinite'
                }}>
                  {key === 'totalProjects' ? '📁' :
                   key === 'liveProjects' ? '🟢' :
                   key === 'totalStars' ? '⭐' :
                   key === 'totalCommits' ? '💾' :
                   key === 'avgPerformance' ? '⚡' : '📊'}
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'var(--lux-blue)',
                  marginBottom: '0.25rem'
                }}>
                  {value.toLocaleString()}{key === 'avgPerformance' ? '%' : ''}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, color: 'var(--muted)' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
              </div>
            ))}
          </div>

          {/* Real-time GitHub Stats */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            display: 'inline-block',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            <div style={{ fontSize: '1.1rem', color: 'var(--lux-blue)', fontWeight: 'bold' }}>
              🔴 Live GitHub Stats • {currentTime.toLocaleTimeString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
              {projectStats.totalCommits} commits • {projectStats.totalStars} stars • {projectStats.totalContributors} contributors
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Showcase */}
      <div style={{
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
            🚀 Featured Enterprise Solutions
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ease ${index * 0.2}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px) scale(1.02)'
                  e.target.style.boxShadow = 'var(--shadow-large)'
                  setHoveredProject(project.id)
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = 'var(--shadow-medium)'
                  setHoveredProject(null)
                }}
              >
                {/* Background gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))',
                  opacity: hoveredProject === project.id ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />

                {/* Status and Complexity Badges */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    background: getStatusColor(project.status),
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    animation: 'pulse 2s infinite'
                  }}>
                    {project.status}
                  </div>
                  <div style={{
                    background: project.complexity === 'Expert' ? 'var(--neon-purple)' :
                               project.complexity === 'Advanced' ? 'var(--electric-blue)' : 'var(--lux-blue)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {project.complexity}
                  </div>
                </div>

                {/* Project Icon and Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    animation: hoveredProject === project.id ? 'bounce 1s ease' : 'none'
                  }}>
                    {project.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      marginBottom: '0.5rem',
                      color: 'var(--text)',
                      fontSize: '1.4rem'
                    }}>
                      {project.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      <span>⭐ {project.stars}</span>
                      <span>💾 {project.commits}</span>
                      <span>👥 {project.contributors}</span>
                      <span>⚡ {project.performance}%</span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p style={{
                  color: 'var(--muted)',
                  marginBottom: '2rem',
                  lineHeight: 1.6,
                  fontSize: '1rem'
                }}>
                  {project.description}
                </p>

                {/* Technology Stack */}
                <div style={{
                  marginBottom: '2rem'
                }}>
                  <h4 style={{
                    marginBottom: '1rem',
                    color: 'var(--lux-blue)',
                    fontSize: '1rem'
                  }}>
                    🛠️ Technology Stack
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        style={{
                          padding: '0.4rem 0.8rem',
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          borderRadius: '16px',
                          fontSize: '0.8rem',
                          color: 'var(--lux-blue)',
                          transition: 'all 0.3s ease',
                          animation: `slideIn 0.4s ease ${techIndex * 0.1}s forwards`,
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
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Indicator */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                      Performance Score
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      color: 'var(--lux-blue)',
                      fontWeight: 'bold'
                    }}>
                      {project.performance}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(6, 182, 212, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${project.performance}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--lux-blue), var(--electric-blue))',
                      borderRadius: '4px',
                      transition: 'width 2s ease'
                    }} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: 'auto'
                }}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: '1rem 1.5rem',
                      background: 'var(--gradient-primary)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)'
                      e.target.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    🚀 Live Demo
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: '1rem 1.5rem',
                      background: 'transparent',
                      color: 'var(--lux-blue)',
                      textDecoration: 'none',
                      border: '2px solid var(--lux-blue)',
                      borderRadius: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--lux-blue)'
                      e.target.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent'
                      e.target.style.color = 'var(--lux-blue)'
                    }}
                  >
                    💻 Source Code
                  </a>
                </div>

                {/* Last Updated */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1.5rem',
                  fontSize: '0.7rem',
                  opacity: 0.6,
                  color: 'var(--muted)'
                }}>
                  Updated {project.lastUpdate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Project Filtering & Grid */}
      <div style={{
        padding: '5rem 0',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📂 Complete Project Portfolio
          </h2>

          {/* Interactive Filter Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {categories.map((category, index) => (
              <div
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: activeFilter === category.key ? '2px solid var(--lux-blue)' : '2px solid rgba(6, 182, 212, 0.2)',
                  background: activeFilter === category.key ?
                    'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))' :
                    'rgba(255, 255, 255, 0.05)',
                  color: activeFilter === category.key ? 'white' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== category.key) {
                    e.target.style.transform = 'translateY(-5px)'
                    e.target.style.boxShadow = 'var(--shadow-large)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== category.key) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  animation: activeFilter === category.key ? 'bounce 2s infinite' : 'none'
                }}>
                  {category.icon}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {category.label}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.25rem' }}>
                  {category.count} projects
                </div>
                {activeFilter === category.key && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: category.color,
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Results Summary */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '1rem 2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            display: 'inline-block'
          }}>
            <span style={{ fontSize: '1.1rem', color: 'var(--lux-blue)', fontWeight: 'bold' }}>
              🔍 Showing {filteredProjects.length} of {projects.length} projects
            </span>
            {activeFilter !== 'all' && (
              <span style={{ fontSize: '0.9rem', opacity: 0.8, marginLeft: '1rem' }}>
                in {categories.find(c => c.key === activeFilter)?.label}
              </span>
            )}
          </div>

          {/* Projects Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
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
                  e.target.style.transform = 'translateY(-8px) scale(1.02)'
                  e.target.style.boxShadow = 'var(--shadow-large)'
                  setHoveredProject(project.id)
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = 'var(--shadow-medium)'
                  setHoveredProject(null)
                }}
              >
                {/* Status and Complexity Badges */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    background: getStatusColor(project.status),
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '16px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    animation: 'pulse 2s infinite'
                  }}>
                    {project.status}
                  </div>
                  <div style={{
                    background: project.complexity === 'Expert' ? 'var(--neon-purple)' :
                               project.complexity === 'Advanced' ? 'var(--electric-blue)' : 'var(--lux-blue)',
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '10px',
                    fontSize: '0.6rem',
                    fontWeight: 'bold'
                  }}>
                    {project.complexity}
                  </div>
                </div>

                {/* Project Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    animation: hoveredProject === project.id ? 'bounce 1s ease' : 'none'
                  }}>
                    {project.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      marginBottom: '0.5rem',
                      color: 'var(--text)',
                      fontSize: '1.2rem'
                    }}>
                      {project.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.8rem',
                      opacity: 0.7
                    }}>
                      <span>⭐ {project.stars}</span>
                      <span>💾 {project.commits}</span>
                      <span>⚡ {project.performance}%</span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p style={{
                  color: 'var(--muted)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6,
                  fontSize: '0.9rem'
                }}>
                  {project.description}
                </p>

                {/* Technology Stack */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem'
                  }}>
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={tech}
                        style={{
                          padding: '0.3rem 0.6rem',
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          color: 'var(--lux-blue)',
                          transition: 'all 0.3s ease',
                          animation: `slideIn 0.3s ease ${techIndex * 0.05}s forwards`,
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
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span style={{
                        padding: '0.3rem 0.6rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        color: 'var(--lux-blue)'
                      }}>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid rgba(34, 197, 94, 0.2)'
                  }}>
                    <div style={{ fontSize: '1.2rem', color: 'var(--success)' }}>👥</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {project.contributors}
                    </div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Contributors</div>
                  </div>
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <div style={{ fontSize: '1.2rem', color: 'var(--electric-blue)' }}>📅</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {project.lastUpdate.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Last Update</div>
                  </div>
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <div style={{ fontSize: '1.2rem', color: 'var(--neon-purple)' }}>⚡</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {project.performance}%
                    </div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Performance</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: '0.8rem 1rem',
                      background: 'var(--gradient-primary)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '10px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)'
                      e.target.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    🚀 Live Demo
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: '0.8rem 1rem',
                      background: 'transparent',
                      color: 'var(--lux-blue)',
                      textDecoration: 'none',
                      border: '2px solid var(--lux-blue)',
                      borderRadius: '10px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--lux-blue)'
                      e.target.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent'
                      e.target.style.color = 'var(--lux-blue)'
                    }}
                  >
                    💻 Source Code
                  </a>
                </div>

                {/* Last Updated Footer */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '1rem',
                  fontSize: '0.7rem',
                  opacity: 0.6,
                  color: 'var(--muted)'
                }}>
                  Updated {project.lastUpdate}
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderRadius: '20px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: 'var(--lux-blue)', marginBottom: '1rem' }}>
                No Projects Found
              </h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
                Try adjusting your filter to see more projects
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  padding: '1rem 2rem',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                View All Projects
              </button>
            </div>
          )}
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
          50% { opacity: 0.7; }
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

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          to { box-shadow: 0 0 30px rgba(6, 182, 212, 0.6); }
        }
      `}</style>
    </div>
  )
}

export default Projects
