import React, { useState, useEffect, useRef, useMemo } from 'react'

const TechShowcase1 = () => {
  const [activeDemo, setActiveDemo] = useState('realtime')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [realtimeData, setRealtimeData] = useState([])
  const [userActivity, setUserActivity] = useState([])
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    memory: 45,
    network: 12,
    cpu: 23
  })
  const [codeEditor, setCodeEditor] = useState(`// Advanced React Component
import React, { useState, useEffect } from 'react'

const AdvancedComponent = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data')
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="advanced-component">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="data-visualization">
          {data.map(item => (
            <div key={item.id} className="data-item">
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdvancedComponent`)

  const canvasRef = useRef(null)
  const chartData = useRef([])

  // Simulate real-time data updates
  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      const newDataPoint = {
        timestamp: Date.now(),
        value: Math.sin(Date.now() / 1000) * 50 + 50 + Math.random() * 10,
        users: Math.floor(Math.random() * 1000) + 500,
        revenue: Math.floor(Math.random() * 50000) + 25000
      }

      setRealtimeData(prev => [...prev.slice(-20), newDataPoint])

      // Update performance metrics
      setPerformanceMetrics({
        fps: Math.floor(Math.random() * 10) + 55,
        memory: Math.floor(Math.random() * 20) + 40,
        network: Math.floor(Math.random() * 15) + 8,
        cpu: Math.floor(Math.random() * 25) + 20
      })

      // Simulate user activity
      if (Math.random() > 0.7) {
        const activities = ['login', 'purchase', 'view_product', 'add_to_cart', 'search']
        const newActivity = {
          id: Date.now(),
          type: activities[Math.floor(Math.random() * activities.length)],
          user: `user_${Math.floor(Math.random() * 1000)}`,
          timestamp: Date.now()
        }
        setUserActivity(prev => [newActivity, ...prev.slice(0, 4)])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Real-time data visualization with enhanced 3D effects
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Ensure canvas has proper dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio || 800
      canvas.height = rect.height * window.devicePixelRatio || 300
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationId
    const animate = () => {
      if (!ctx || realtimeData.length === 0) {
        animationId = requestAnimationFrame(animate)
        return
      }

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)')
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw grid with 3D effect
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)'
      ctx.lineWidth = 1
      ctx.shadowColor = 'rgba(6, 182, 212, 0.5)'
      ctx.shadowBlur = 2

      for (let i = 0; i <= 10; i++) {
        const y = (height / 10) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw vertical grid lines
      for (let i = 0; i <= 20; i++) {
        const x = (width / 20) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Reset shadow for data visualization
      ctx.shadowBlur = 0

      // Draw 3D data line with glow effect
      ctx.strokeStyle = 'var(--lux-blue)'
      ctx.lineWidth = 4
      ctx.shadowColor = 'var(--lux-blue)'
      ctx.shadowBlur = 10
      ctx.beginPath()

      realtimeData.forEach((point, index) => {
        const x = (index / (realtimeData.length - 1)) * width
        const y = height - (point.value / 100) * height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw 3D data points with enhanced effects
      ctx.fillStyle = 'var(--electric-blue)'
      ctx.shadowColor = 'var(--electric-blue)'
      ctx.shadowBlur = 8

      realtimeData.forEach((point, index) => {
        const x = (index / (realtimeData.length - 1)) * width
        const y = height - (point.value / 100) * height

        // Draw outer glow
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Draw inner point
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Reset fill style
        ctx.fillStyle = 'var(--electric-blue)'
      })

      // Draw connecting lines between points for 3D effect
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)'
      ctx.lineWidth = 1
      ctx.shadowBlur = 0

      for (let i = 0; i < realtimeData.length - 1; i++) {
        const currentPoint = realtimeData[i]
        const nextPoint = realtimeData[i + 1]

        const x1 = (i / (realtimeData.length - 1)) * width
        const y1 = height - (currentPoint.value / 100) * height
        const x2 = ((i + 1) / (realtimeData.length - 1)) * width
        const y2 = height - (nextPoint.value / 100) * height

        // Draw subtle connecting lines
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [realtimeData])

  const demos = {
    realtime: {
      name: 'Real-Time Data Visualization',
      icon: '📊',
      description: 'Live data streaming, real-time charts, and dynamic dashboards'
    },
    webgl: {
      name: 'Advanced Graphics & Animation',
      icon: '🎨',
      description: 'Interactive particle systems, real-time animations, and advanced canvas rendering'
    },
    ai: {
      name: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Intelligent algorithms, predictive analytics, and smart features'
    },
    collaboration: {
      name: 'Real-Time Collaboration',
      icon: '👥',
      description: 'Multi-user editing, live cursors, and synchronized experiences'
    },
    pwa: {
      name: 'Progressive Web Apps',
      icon: '📱',
      description: 'Offline-first, installable apps with native-like features'
    },
    blockchain: {
      name: 'Blockchain Integration',
      icon: '⛓️',
      description: 'Decentralized features, crypto payments, and smart contracts'
    }
  }

  const advancedFeatures = useMemo(() => [
    {
      title: 'Neural Network Visualizer',
      description: 'Interactive neural network with real-time training visualization',
      tech: ['TensorFlow.js', 'WebGL', 'Canvas API'],
      complexity: 'Expert'
    },
    {
      title: '3D Product Configurator',
      description: 'Real-time 3D model manipulation with material and lighting controls',
      tech: ['Three.js', 'WebGL', 'GLTF'],
      complexity: 'Advanced'
    },
    {
      title: 'Collaborative Code Editor',
      description: 'Multi-user code editing with syntax highlighting and real-time sync',
      tech: ['Monaco Editor', 'WebSockets', 'CRDT'],
      complexity: 'Expert'
    },
    {
      title: 'Voice-Controlled Interface',
      description: 'Speech recognition with natural language processing',
      tech: ['Web Speech API', 'NLP', 'Machine Learning'],
      complexity: 'Advanced'
    },
    {
      title: 'AR/VR Experience',
      description: 'Augmented reality features with device orientation tracking',
      tech: ['WebXR', 'Three.js', 'Device APIs'],
      complexity: 'Expert'
    },
    {
      title: 'Real-Time Video Processing',
      description: 'Live video effects and computer vision capabilities',
      tech: ['WebRTC', 'WebGL', 'Computer Vision'],
      complexity: 'Expert'
    }
  ], [])

  const systemMetrics = [
    { name: 'Response Time', value: '45ms', trend: 'down', color: 'var(--lux-blue)' },
    { name: 'Uptime', value: '99.9%', trend: 'up', color: 'var(--electric-blue)' },
    { name: 'Throughput', value: '1.2M req/s', trend: 'up', color: 'var(--neon-purple)' },
    { name: 'Error Rate', value: '0.01%', trend: 'down', color: 'var(--lux-blue)' }
  ]

  // Advanced Graphics & Animation Demo Component (GPU-friendly)
  const GraphicsDemo = () => {
    const canvasRef = useRef(null)
    const [stats, setStats] = useState({
      fps: 60,
      particles: 0,
      effects: 0,
      memory: '8.2MB'
    })

    useEffect(() => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let animationId
      let particles = []
      let time = 0
      let mouseX = 0
      let mouseY = 0

      // Mouse tracking for interaction
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      }

      canvas.addEventListener('mousemove', handleMouseMove)

      // Set canvas size
      const updateCanvasSize = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * window.devicePixelRatio || 600
        canvas.height = rect.height * window.devicePixelRatio || 300
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
      }

      updateCanvasSize()
      window.addEventListener('resize', updateCanvasSize)

      // Create advanced particle system
      const createParticles = () => {
        particles = []

        // Main particle streams
        for (let i = 0; i < 120; i++) {
          particles.push({
            x: Math.random() * canvas.width / window.devicePixelRatio,
            y: Math.random() * canvas.height / window.devicePixelRatio,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 4 + 1,
            life: Math.random() * 100 + 50,
            maxLife: Math.random() * 100 + 50,
            color: `hsl(${Math.random() * 60 + 180}, 70%, ${Math.random() * 30 + 50}%)`,
            type: Math.random() > 0.7 ? 'energy' : 'data'
          })
        }

        // Connection lines
        for (let i = 0; i < 20; i++) {
          particles.push({
            x: Math.random() * canvas.width / window.devicePixelRatio,
            y: Math.random() * canvas.height / window.devicePixelRatio,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: 2,
            life: 1000,
            maxLife: 1000,
            color: 'rgba(6, 182, 212, 0.6)',
            type: 'connection'
          })
        }
      }

      createParticles()

      const animate = () => {
        const width = canvas.width / (window.devicePixelRatio || 1)
        const height = canvas.height / (window.devicePixelRatio || 1)

        time += 0.016

        // Create dynamic background gradient
        const gradient = ctx.createRadialGradient(
          mouseX || width / 2, mouseY || height / 2, 0,
          width / 2, height / 2, Math.max(width, height) / 2
        )
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)')
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.1)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Update and render particles
        particles.forEach((particle, index) => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Boundary wrapping
          if (particle.x < 0) particle.x = width
          if (particle.x > width) particle.x = 0
          if (particle.y < 0) particle.y = height
          if (particle.y > height) particle.y = 0

          // Mouse interaction
          const dx = particle.x - (mouseX || width / 2)
          const dy = particle.y - (mouseY || height / 2)
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100 && distance > 0) {
            const force = (100 - distance) / 100
            particle.vx += (dx / distance) * force * 0.02
            particle.vy += (dy / distance) * force * 0.02
          }

          // Speed limiting
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
          if (speed > 3) {
            particle.vx = (particle.vx / speed) * 3
            particle.vy = (particle.vy / speed) * 3
          }

          // Life cycle for energy particles
          if (particle.type === 'energy') {
            particle.life--
            if (particle.life <= 0) {
              particle.life = particle.maxLife
              particle.x = Math.random() * width
              particle.y = Math.random() * height
            }
          }

          // Draw particle based on type
          if (particle.type === 'energy') {
            const alpha = particle.life / particle.maxLife
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.fillStyle = particle.color
            ctx.shadowColor = particle.color
            ctx.shadowBlur = 10

            // Pulsing effect
            const pulseSize = particle.size * (1 + Math.sin(time * 5 + index) * 0.3)
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
            ctx.fill()

            // Energy ring
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 2
            ctx.globalAlpha = alpha * 0.5
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, pulseSize * 1.5, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()
          } else if (particle.type === 'data') {
            ctx.fillStyle = particle.color
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          } else if (particle.type === 'connection') {
            ctx.strokeStyle = particle.color
            ctx.lineWidth = particle.size
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle.x + particle.vx * 20, particle.y + particle.vy * 20)
            ctx.stroke()
          }
        })

        // Draw connection lines between nearby particles
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)'
        ctx.lineWidth = 1

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i]
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }

        // Update stats
        setStats({
          fps: Math.round(1000 / (performance.now() - (window.lastFrameTime || performance.now()))),
          particles: particles.length,
          effects: 3, // Energy particles, data particles, connections
          memory: '8.2MB'
        })
        window.lastFrameTime = performance.now()

        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', updateCanvasSize)
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
      }
    }, [])

  return (
      <div style={{
        width: '100%',
        height: '300px',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--bg), var(--surface))',
            cursor: 'none'
          }}
        />

        {/* Graphics Engine Stats */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'var(--lux-blue)',
          padding: '0.5rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontFamily: 'monospace'
        }}>
          <div>🎨 Advanced Graphics Engine</div>
          <div>FPS: {stats.fps}</div>
          <div>Particles: {stats.particles}</div>
          <div>Effects: {stats.effects}</div>
        </div>

        {/* Interactive Features */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'var(--electric-blue)',
          padding: '0.5rem',
          borderRadius: '8px',
          fontSize: '0.8rem'
        }}>
          <div>🎯 Interactive System</div>
          <div>Mouse Tracking</div>
          <div>Particle Physics</div>
          <div>Real-time Rendering</div>
        </div>

        {/* Performance Status */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(34, 197, 94, 0.2)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '20px',
          padding: '0.5rem 1rem',
          fontSize: '0.8rem',
          color: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--lux-blue)',
            animation: 'pulse 2s infinite'
          }} />
          <span>Advanced Graphics Engine Active</span>
        </div>

        {/* Memory Usage */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'var(--neon-purple)',
          padding: '0.5rem',
          borderRadius: '8px',
          fontSize: '0.8rem'
        }}>
          <div>💾 Memory: {stats.memory}</div>
          <div>⚡ GPU: Not Required</div>
      </div>
    </div>
  )
}

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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
            Advanced Web Technologies
          </h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            animation: isLoaded ? 'slideUp 1s ease 0.2s forwards' : 'none',
            opacity: isLoaded ? 1 : 0
          }}>
            Experience the future of web development with cutting-edge technologies
          </p>

          {/* Live Performance Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            {Object.entries(performanceMetrics).map(([key, value]) => (
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
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--lux-blue)',
                  marginTop: '0.5rem'
                }}>
                  {value}{key === 'fps' ? '' : key === 'memory' ? 'MB' : key === 'network' ? 'ms' : '%'}
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
            Experience Advanced Features 🚀
          </button>
        </div>
      </div>

      {/* Real-Time Data Visualization */}
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
            Live Advanced Web Technologies
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
                🔴 Live Demonstration
              </h4>

              {activeDemo === 'realtime' && (
                <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={300}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.8)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'var(--lux-blue)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    Live Data: {realtimeData.length > 0 ? realtimeData[realtimeData.length - 1].value.toFixed(1) : 0}%
                  </div>
                </div>
              )}

              {activeDemo === 'webgl' && (
                <GraphicsDemo />
              )}

              {activeDemo === 'ai' && (
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
                    🤖 AI Processing
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--electric-blue)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    📊 Analytics
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--neon-purple)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    🎯 Predictions
                  </div>
                </div>
              )}

              {activeDemo === 'collaboration' && (
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontFamily: 'monospace'
                  }}>
                    <div style={{ color: 'var(--lux-blue)', marginBottom: '0.5rem' }}>
                      👤 User_123: Hello everyone!
                    </div>
                    <div style={{ color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
                      👤 User_456: Great work on the project!
                    </div>
                    <div style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>
                      👤 User_789: The real-time sync is amazing!
                    </div>
                    <div style={{
                      color: 'var(--lux-blue)',
                      animation: 'blink 1s infinite'
                    }}>
                      👤 You: |
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    🔴 3 users online • Real-time synchronization active
                  </div>
                </div>
              )}

              {activeDemo === 'pwa' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--lux-blue)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    📱 Installable
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--electric-blue)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    🔌 Offline Ready
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--neon-purple)',
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    🔔 Push Notifications
                  </div>
                </div>
              )}

              {activeDemo === 'blockchain' && (
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
                      🔗 Block #1,234,567
                    </div>
                    <div style={{ color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
                      ⛓️  Hash: a1b2c3d4...f9g0h1i2
                    </div>
                    <div style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem' }}>
                      💰 Transactions: 2,847 confirmed
                    </div>
                    <div style={{ color: 'var(--lux-blue)' }}>
                      ⚡ Gas Price: 12 gwei
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    🔒 Decentralized • Immutable • Secure
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics Dashboard */}
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
            Real-Time System Monitoring
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {systemMetrics.map((metric, index) => (
              <div
                key={metric.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: metric.trend === 'up' ? 'var(--lux-blue)' : 'var(--electric-blue)'
                }} />
                <h3 style={{ marginBottom: '0.5rem', color: metric.color }}>
                  {metric.name}
                </h3>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'var(--text)',
                  marginBottom: '0.5rem'
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  color: metric.trend === 'up' ? 'var(--lux-blue)' : 'var(--electric-blue)'
                }}>
                  {metric.trend === 'up' ? '↗️ Improving' : '↘️ Stable'}
                </div>
              </div>
            ))}
          </div>

          {/* User Activity Feed */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--lux-blue)' }}>
              🔴 Live User Activity
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {userActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    animation: `slideIn 0.3s ease ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  <div style={{ color: 'var(--lux-blue)', fontWeight: 'bold' }}>
                    {activity.user}
                  </div>
                  <div style={{ color: 'var(--text)', opacity: 0.8 }}>
                    {activity.type.replace('_', ' ').toUpperCase()}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Code Editor */}
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
            Live Code Editor & Preview
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start'
          }}>
            {/* Code Editor */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--lux-blue)' }}>
                💻 Advanced React Component
              </h3>
              <div style={{
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '8px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: '1.4',
                whiteSpace: 'pre-wrap',
                color: 'var(--text)',
                minHeight: '300px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: 'var(--lux-blue)',
                  fontSize: '0.7rem'
                }}>
                  TypeScript + React
                </div>
                {codeEditor.split('\n').map((line, index) => (
                  <div key={index} style={{
                    color: line.includes('//') ? 'var(--muted)' :
                           line.includes('import') ? 'var(--lux-blue)' :
                           line.includes('const') || line.includes('function') ? 'var(--electric-blue)' :
                           line.includes('return') ? 'var(--neon-purple)' :
                           'var(--text)'
                  }}>
                    <span style={{ color: 'var(--muted)', marginRight: '1rem' }}>
                      {(index + 1).toString().padStart(3, ' ')}
                    </span>
                    {line}
                  </div>
                ))}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  color: 'var(--lux-blue)',
                  fontSize: '0.7rem',
                  animation: 'blink 1s infinite'
                }}>
                  █
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--electric-blue)' }}>
                🔄 Live Preview
              </h3>
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '1rem',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  textAlign: 'center',
                  color: 'var(--text)',
                  animation: 'fadeIn 1s ease'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '1rem',
                    animation: 'spin 2s linear infinite'
                  }}>
                    ⚛️
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Advanced Component
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    Rendering with React 18 features
                  </div>
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--lux-blue)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    display: 'inline-block'
                  }}>
                    Suspense • Concurrent • Automatic Batching
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features Showcase */}
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
            Enterprise-Grade Capabilities
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {advancedFeatures.map((feature, index) => (
              <div
                key={feature.title}
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
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ color: 'var(--lux-blue)', margin: 0 }}>
                    {feature.title}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: feature.complexity === 'Expert' ? 'var(--neon-purple)' :
                               feature.complexity === 'Advanced' ? 'var(--electric-blue)' : 'var(--lux-blue)',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {feature.complexity}
                  </span>
                </div>

                <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
                  {feature.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {feature.tech.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        color: 'var(--lux-blue)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance & Innovation Section */}
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
            Innovation & Performance
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: 'var(--lux-blue)', marginBottom: '1rem' }}>Lightning Fast</h3>
              <p style={{ opacity: 0.9 }}>
                Sub-millisecond response times with optimized rendering pipelines
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: 'var(--electric-blue)', marginBottom: '1rem' }}>Enterprise Security</h3>
              <p style={{ opacity: 0.9 }}>
                Bank-grade encryption, secure authentication, and data protection
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
              <h3 style={{ color: 'var(--neon-purple)', marginBottom: '1rem' }}>Global Scale</h3>
              <p style={{ opacity: 0.9 }}>
                Distributed architecture supporting millions of concurrent users
              </p>
            </div>
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

        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: var(--final-width);
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

export default TechShowcase1
