import React, { useState, useEffect, useRef, useMemo } from 'react'

const TechShowcase2 = () => {
  const [activeDemo, setActiveDemo] = useState('realtime')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [apiRequests, setApiRequests] = useState([])
  const [systemMetrics, setSystemMetrics] = useState({
    requests: 0,
    errors: 0,
    latency: 45,
    throughput: 1250
  })
  const [activeConnections, setActiveConnections] = useState([])
  const [databaseQueries, setDatabaseQueries] = useState([])

  const canvasRef = useRef(null)
  const websocketRef = useRef(null)

  // Simulate real-time backend operations
  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      // Simulate API requests
      const newRequest = {
        id: Date.now(),
        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
        endpoint: ['/api/users', '/api/products', '/api/orders', '/api/analytics'][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.1 ? 200 : [400, 401, 404, 500][Math.floor(Math.random() * 4)],
        latency: Math.floor(Math.random() * 200) + 20,
        timestamp: Date.now()
      }

      setApiRequests(prev => [newRequest, ...prev.slice(0, 9)])

      // Update system metrics
      setSystemMetrics(prev => ({
        requests: prev.requests + 1,
        errors: prev.errors + (newRequest.status >= 400 ? 1 : 0),
        latency: Math.max(20, Math.floor(Math.random() * 150) + 20),
        throughput: Math.floor(Math.random() * 500) + 1000
      }))

      // Simulate database queries
      if (Math.random() > 0.6) {
        const queries = ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
        const newQuery = {
          id: Date.now(),
          type: queries[Math.floor(Math.random() * queries.length)],
          table: ['users', 'products', 'orders', 'analytics'][Math.floor(Math.random() * 4)],
          duration: Math.floor(Math.random() * 50) + 5,
          timestamp: Date.now()
        }
        setDatabaseQueries(prev => [newQuery, ...prev.slice(0, 7)])
      }

      // Simulate active connections
      if (Math.random() > 0.8) {
        const connection = {
          id: Date.now(),
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
          connectedAt: Date.now()
        }
        setActiveConnections(prev => [...prev.slice(-4), connection])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Real-time architecture visualization
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const services = []
    const connections = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create microservices
    const serviceNames = ['API Gateway', 'Auth Service', 'User Service', 'Product Service', 'Order Service', 'Payment Service', 'Notification Service']
    serviceNames.forEach((name, index) => {
      services.push({
        id: index,
        name,
        x: (canvas.width / serviceNames.length) * index + 50,
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 30,
        color: ['var(--lux-blue)', 'var(--electric-blue)', 'var(--neon-purple)', 'var(--lux-blue)', 'var(--electric-blue)', 'var(--neon-purple)', 'var(--lux-blue)'][index],
        requests: Math.floor(Math.random() * 100) + 50
      })
    })

    // Create connections between services
    for (let i = 0; i < services.length; i++) {
      for (let j = i + 1; j < services.length; j++) {
        if (Math.random() > 0.6) {
          connections.push({ from: i, to: j, active: Math.random() > 0.7 })
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach(conn => {
        const from = services[conn.from]
        const to = services[conn.to]

        ctx.strokeStyle = conn.active ? 'var(--lux-blue)' : 'rgba(6, 182, 212, 0.3)'
        ctx.lineWidth = conn.active ? 3 : 1
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()

        // Draw data packets on active connections
        if (conn.active && Math.random() > 0.95) {
          const progress = Math.random()
          const x = from.x + (to.x - from.x) * progress
          const y = from.y + (to.y - from.y) * progress

          ctx.fillStyle = 'var(--electric-blue)'
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Update and draw services
      services.forEach((service, index) => {
        service.x += service.vx
        service.y += service.vy

        if (service.x < 30 || service.x > canvas.width - 30) service.vx *= -1
        if (service.y < 100 || service.y > canvas.height - 100) service.vy *= -1

        // Draw service node
        ctx.fillStyle = service.color
        ctx.beginPath()
        ctx.arc(service.x, service.y, service.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw service border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw service name
        ctx.fillStyle = 'white'
        ctx.font = '12px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(service.name.split(' ')[0], service.x, service.y + 45)

        // Draw request indicator
        if (service.requests > 0) {
          ctx.fillStyle = 'var(--lux-blue)'
          ctx.beginPath()
          ctx.arc(service.x + 20, service.y - 20, 8, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = 'white'
          ctx.font = '10px monospace'
          ctx.textAlign = 'center'
          ctx.fillText(service.requests.toString(), service.x + 20, service.y - 16)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const demos = {
    realtime: {
      name: 'Real-Time API Monitoring',
      icon: '📊',
      description: 'Live API request tracking, performance metrics, and real-time analytics'
    },
    architecture: {
      name: 'Microservices Architecture',
      icon: '🏗️',
      description: 'Dynamic service orchestration, load balancing, and inter-service communication'
    },
    database: {
      name: 'Database Performance',
      icon: '🗄️',
      description: 'Query optimization, connection pooling, and real-time performance monitoring'
    },
    security: {
      name: 'Security & Authentication',
      icon: '🔒',
      description: 'Advanced security protocols, JWT authentication, and rate limiting'
    },
    devops: {
      name: 'DevOps & CI/CD',
      icon: '⚙️',
      description: 'Automated deployment pipelines, container orchestration, and monitoring'
    },
    scalability: {
      name: 'Scalability & Performance',
      icon: '📈',
      description: 'Auto-scaling, load balancing, and high-performance architecture patterns'
    }
  }

  const backendTechnologies = useMemo(() => [
    {
      category: 'API Technologies',
      icon: '🔗',
      technologies: [
        { name: 'REST APIs', status: 'Active', requests: 1247 },
        { name: 'GraphQL', status: 'Active', requests: 892 },
        { name: 'WebSockets', status: 'Active', requests: 234 },
        { name: 'gRPC', status: 'Standby', requests: 0 }
      ]
    },
    {
      category: 'Databases',
      icon: '🗃️',
      technologies: [
        { name: 'PostgreSQL', status: 'Primary', requests: 2156 },
        { name: 'Redis Cache', status: 'Active', requests: 8923 },
        { name: 'MongoDB', status: 'Secondary', requests: 456 },
        { name: 'Elasticsearch', status: 'Active', requests: 1234 }
      ]
    },
    {
      category: 'Cloud Services',
      icon: '☁️',
      technologies: [
        { name: 'AWS Lambda', status: 'Active', requests: 3456 },
        { name: 'API Gateway', status: 'Active', requests: 8765 },
        { name: 'Load Balancer', status: 'Active', requests: 12345 },
        { name: 'CDN', status: 'Active', requests: 23456 }
      ]
    }
  ], [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'var(--lux-blue)'
      case 'Primary': return 'var(--electric-blue)'
      case 'Secondary': return 'var(--neon-purple)'
      case 'Standby': return 'var(--muted)'
      default: return 'var(--text)'
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Live Architecture Visualization */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: 0.6
        }}
      />

      {/* Hero Section with Live Metrics */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--bg), var(--surface))'
      }}>
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          animation: isLoaded ? 'fadeInUp 1s ease forwards' : 'none',
          opacity: isLoaded ? 1 : 0
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2rem',
            animation: isLoaded ? 'slideUp 1s ease forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            Backend Architecture
          </h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            animation: isLoaded ? 'slideUp 1s ease 0.2s forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            Experience enterprise-grade backend systems with real-time monitoring and analytics
          </p>

          {/* Live System Metrics Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '1000px',
            margin: '0 auto 3rem'
          }}>
            {Object.entries(systemMetrics).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  animation: `pulse 3s infinite ${Math.random() * 2}s`
                }}
              >
                <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase' }}>
                  {key.toUpperCase()}
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'var(--lux-blue)',
                  marginTop: '0.5rem'
                }}>
                  {value.toLocaleString()}{key === 'latency' ? 'ms' : key === 'throughput' ? '/s' : ''}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('demos').scrollIntoView({ behavior: 'smooth' })}
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
              animation: isLoaded ? 'slideUp 1s ease 0.4s forwards' : 'none',
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
            Explore Backend Systems 🚀
          </button>
        </div>
      </div>

      {/* Interactive Backend Demos */}
      <div id="demos" style={{
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
            Live Backend Demonstrations
          </h2>

          {/* Demo Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {Object.entries(demos).map(([key, demo], index) => (
              <div
                key={key}
                onClick={() => setActiveDemo(key)}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '2rem',
                  background: activeDemo === key ?
                    'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))' :
                    'rgba(255, 255, 255, 0.05)',
                  border: activeDemo === key ? 'none' : '1px solid var(--border-color)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  transform: activeDemo === key ? 'scale(1.02)' :
                           hoveredCard === key ? 'translateY(-5px)' : 'scale(1)',
                  boxShadow: activeDemo === key ? 'var(--shadow-glow)' :
                           hoveredCard === key ? 'var(--shadow-large)' : 'var(--shadow-medium)',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{demo.icon}</span>
                  <h3 style={{ margin: 0, color: 'var(--text)' }}>{demo.name}</h3>
                </div>
                <p style={{ margin: 0, opacity: 0.8, color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {demo.description}
                </p>
              </div>
            ))}
          </div>

          {/* Active Demo Content with Real Functionality */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--lux-blue)' }}>
              {demos[activeDemo].name}
            </h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
              {demos[activeDemo].description}
            </p>

            {/* Interactive Demo Preview */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(6, 182, 212, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--electric-blue)' }}>
                🔴 Live Backend Operations
              </h4>

              {activeDemo === 'realtime' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  {/* API Requests Log */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                      📡 Live API Requests
                    </div>
                    {apiRequests.slice(0, 8).map((req, index) => (
                      <div
                        key={req.id}
                        style={{
                          marginBottom: '0.5rem',
                          padding: '0.5rem',
                          background: req.status >= 400 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                          borderRadius: '4px',
                          animation: `slideIn 0.3s ease ${index * 0.1}s forwards`,
                          opacity: 0
                        }}
                      >
                        <div style={{ color: req.status >= 400 ? 'var(--error)' : 'var(--success)' }}>
                          {req.method} {req.endpoint} → {req.status}
                        </div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
                          {req.latency}ms
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* System Status */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '1rem' }}>
                      ⚡ System Status
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{
                        padding: '0.5rem',
                        background: 'rgba(34, 197, 94, 0.2)',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.2rem', color: 'var(--success)' }}>🟢</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text)' }}>API Gateway</div>
                      </div>
                      <div style={{
                        padding: '0.5rem',
                        background: 'rgba(34, 197, 94, 0.2)',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.2rem', color: 'var(--success)' }}>🟢</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Database</div>
                      </div>
                      <div style={{
                        padding: '0.5rem',
                        background: 'rgba(34, 197, 94, 0.2)',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.2rem', color: 'var(--success)' }}>🟢</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Cache</div>
                      </div>
                      <div style={{
                        padding: '0.5rem',
                        background: 'rgba(34, 197, 94, 0.2)',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.2rem', color: 'var(--success)' }}>🟢</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Load Balancer</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'architecture' && (
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                      🏗️ Service Orchestration Status
                    </div>
                    <div style={{ color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
                      ✅ API Gateway: Routing 2,847 requests/min
                    </div>
                    <div style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>
                      ✅ Auth Service: 1,234 active sessions
                    </div>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                      ✅ User Service: Processing 456 operations
                    </div>
                    <div style={{ color: 'var(--electric-blue)' }}>
                      ✅ Payment Service: 89 transactions processed
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    🔄 Auto-scaling active • Load balancing optimized • 99.9% uptime
                  </div>
                </div>
              )}

              {activeDemo === 'database' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  {databaseQueries.map((query, index) => (
                    <div
                      key={query.id}
                      style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        animation: `slideIn 0.3s ease ${index * 0.1}s forwards`,
                        opacity: 0
                      }}
                    >
                      <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                        {query.type}
                      </div>
                      <div style={{ color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
                        {query.table}
                      </div>
                      <div style={{ color: 'var(--neon-purple)' }}>
                        {query.duration}ms
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeDemo === 'security' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    color: 'var(--success)',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    🔐 JWT Verified
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    color: 'var(--success)',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    🛡️ Rate Limited
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    color: 'var(--success)',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    🔒 Encrypted
                  </div>
                </div>
              )}

              {activeDemo === 'devops' && (
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                      🚀 CI/CD Pipeline Status
                    </div>
                    <div style={{ color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
                      ✅ Build #1,234: PASSED (2m 34s)
                    </div>
                    <div style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>
                      ✅ Tests: 1,567 passed, 0 failed
                    </div>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                      ✅ Deploy: Production updated
                    </div>
                    <div style={{ color: 'var(--electric-blue)' }}>
                      ✅ Monitoring: All systems green
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    🔄 Auto-deployment active • Blue-green deployment • Rollback ready
                  </div>
                </div>
              )}

              {activeDemo === 'scalability' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--lux-blue)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center',
                    animation: 'pulse 2s infinite'
                  }}>
                    📊 1.2M req/s
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--electric-blue)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    🌐 5 regions
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--neon-purple)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    ⚡ 99.9% uptime
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--lux-blue)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    🔄 Auto-scaling
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Dashboard */}
      <div style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Enterprise Technology Stack
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {backendTechnologies.map((category, index) => (
              <div
                key={category.category}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                  <h3 style={{ color: 'var(--lux-blue)', margin: 0 }}>
                    {category.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(6, 182, 212, 0.2)'
                      }}
                    >
    <div>
                        <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>
                          {tech.name}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: getStatusColor(tech.status),
                          fontWeight: 'bold'
                        }}>
                          {tech.status}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: 'var(--lux-blue)'
                      }}>
                        {tech.requests.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Connections Monitor */}
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
            Real-Time Connection Monitor
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {activeConnections.map((conn, index) => (
              <div
                key={conn.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid var(--border-color)',
                  animation: `slideIn 0.3s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--lux-blue)',
                    animation: 'pulse 2s infinite'
                  }} />
                  <span style={{ color: 'var(--lux-blue)', fontWeight: 'bold' }}>
                    {conn.ip}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                  {conn.userAgent}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
                  Connected {new Date(conn.connectedAt).toLocaleTimeString()}
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
          50% { opacity: 0.7; }
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

export default TechShowcase2


