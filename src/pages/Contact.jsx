import React, { useState, useEffect, useRef } from 'react'

export default function Contact(){
  const [copied, setCopied] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)
  const [responseTime, setResponseTime] = useState('< 24 hours')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState('contact')
  const canvasRef = useRef(null)

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      // Simulate availability changes
      if (Math.random() > 0.95) {
        setIsAvailable(!isAvailable)
      }

      // Simulate response time changes
      if (Math.random() > 0.9) {
        const times = ['< 1 hour', '< 6 hours', '< 24 hours', '< 2 days']
        setResponseTime(times[Math.floor(Math.random() * times.length)])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isAvailable])

  // Interactive background
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const particles = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 3 + 1,
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

  async function copyToClipboard(text, label){
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(label)
      setTimeout(()=> setCopied(''),1600)
    }catch(e){
      console.error('Failed to copy:', e)
    }
  }

  const contactMethods = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'your.email@example.com',
      action: 'mailto:your.email@example.com',
      description: 'Send me an email anytime',
      priority: 'High',
      responseTime: responseTime
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      description: 'Call me for urgent matters',
      priority: 'Medium',
      responseTime: '< 1 hour'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      action: 'https://linkedin.com/in/yourprofile',
      description: 'Connect with me professionally',
      priority: 'High',
      responseTime: '< 24 hours'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Your City, Country',
      action: null,
      description: 'Based in this beautiful location',
      priority: 'Low',
      responseTime: 'N/A'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      message: 'Outstanding work! Delivered beyond expectations with innovative solutions.',
      rating: 5,
      project: 'E-commerce Platform'
    },
    {
      name: 'Michael Chen',
      company: 'StartupXYZ',
      message: 'Exceptional developer with great attention to detail and performance optimization.',
      rating: 5,
      project: 'AI Task Manager'
    },
    {
      name: 'Emma Davis',
      company: 'Digital Agency',
      message: 'Professional, reliable, and delivers high-quality code. Highly recommended!',
      rating: 5,
      project: 'Real-time Chat App'
    }
  ]

  const availabilitySlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          maxWidth: '1200px',
          width: '100%',
          padding: '2rem'
        }}>
          {/* Real-time Status */}
          <div style={{
            marginBottom: '2rem',
            animation: 'fadeInUp 1s ease forwards'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              background: isAvailable ?
                'rgba(34, 197, 94, 0.1)' :
                'rgba(239, 68, 68, 0.1)',
              border: isAvailable ?
                '1px solid rgba(34, 197, 94, 0.3)' :
                '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '25px',
              padding: '1rem 2rem'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isAvailable ? 'var(--lux-blue)' : 'var(--error)',
                animation: 'pulse 2s infinite'
              }} />
              <div>
                <div style={{
                  fontWeight: 'bold',
                  color: isAvailable ? 'var(--lux-blue)' : 'var(--error)'
                }}>
                  {isAvailable ? '🟢 Available for new projects' : '🔴 Currently busy'}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Response time: {responseTime} • {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            animation: 'slideUp 1s ease forwards'
          }}>
            Let's Build Something Amazing
          </h1>
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.9,
            marginBottom: '2rem',
            animation: 'slideUp 1s ease 0.2s forwards'
          }}>
            Ready to transform your ideas into reality? I'm here to help you create exceptional digital experiences.
          </p>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            animation: 'slideUp 1s ease 0.4s forwards'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--lux-blue)' }}>⚡</div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Fast</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Quick turnaround</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--electric-blue)' }}>🎯</div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Reliable</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Always on time</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--neon-purple)' }}>🚀</div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Innovative</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Latest tech</div>
            </div>
          </div>

          <button
            onClick={() => document.getElementById('contact-methods').scrollIntoView({ behavior: 'smooth' })}
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
              animation: 'slideUp 1s ease 0.6s forwards'
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
            Start a Conversation 💬
          </button>
        </div>
      </div>

      {/* Contact Methods */}
      <div id="contact-methods" style={{
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
            Multiple Ways to Connect
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {contactMethods.map((method, index) => (
              <div
                key={method.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-12px) scale(1.02)'
                  e.target.style.boxShadow = '0 25px 50px rgba(6, 182, 212, 0.3)'
                  e.target.style.borderColor = 'var(--lux-blue)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = 'var(--shadow-medium)'
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)'
                }}
              >
                {/* Priority Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: method.priority === 'High' ? 'var(--lux-blue)' :
                             method.priority === 'Medium' ? 'var(--electric-blue)' : 'var(--neon-purple)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {method.priority} Priority
                </div>

                {/* Icon and Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    animation: 'bounce 2s infinite'
                  }}>
                    {method.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      marginBottom: '0.5rem',
                      color: 'var(--lux-blue)',
                      fontSize: '1.4rem'
                    }}>
                      {method.label}
                    </h3>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      marginBottom: '0.25rem'
                    }}>
                      Response time: {method.responseTime}
                    </div>
                  </div>
                </div>

                {/* Contact Value */}
                <div style={{
                  background: 'rgba(6, 182, 212, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25rem',
                    color: 'var(--lux-blue)'
                  }}>
                    {method.value}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8
                  }}>
                    {method.description}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {method.action && (
                    <a
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '1rem 1.5rem',
                        background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        fontWeight: '600',
                        textAlign: 'center',
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
                      🔗 Connect Now
                    </a>
                  )}

                  <button
                    onClick={() => copyToClipboard(method.value, method.label)}
                    style={{
                      flex: 1,
                      padding: '1rem 1.5rem',
                      background: copied === method.label ?
                        'linear-gradient(135deg, #10b981, #059669)' :
                        'rgba(255, 255, 255, 0.1)',
                      color: copied === method.label ? 'white' : 'var(--text)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>{copied === method.label ? '✅' : '📋'}</span>
                    {copied === method.label ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
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
            What Clients Say
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  position: 'relative',
                  animation: `fadeInUp 0.6s ease ${index * 0.2}s forwards`,
                  opacity: 0
                }}
              >
                {/* Rating Stars */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  gap: '0.25rem'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: 'var(--lux-blue)', fontSize: '0.8rem' }}>
                      ⭐
                    </span>
                  ))}
                </div>

                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  opacity: 0.8
                }}>
                  "
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  opacity: 0.9
                }}>
                  {testimonial.message}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 'bold',
                      color: 'var(--lux-blue)',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.7,
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.company}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--electric-blue)',
                      fontWeight: 'bold'
                    }}>
                      {testimonial.project}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Availability Schedule */}
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
            Book a Call
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            opacity: 0.8,
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Schedule a 30-minute discovery call to discuss your project and explore how we can work together.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {availabilitySlots.map((slot, index) => (
              <div
                key={slot.time}
                style={{
                  padding: '1.5rem',
                  background: slot.available ?
                    'rgba(34, 197, 94, 0.1)' :
                    'rgba(239, 68, 68, 0.1)',
                  border: slot.available ?
                    '1px solid rgba(34, 197, 94, 0.3)' :
                    '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: slot.available ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.4s ease ${index * 0.1}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  if (slot.available) {
                    e.target.style.transform = 'scale(1.05)'
                    e.target.style.background = 'rgba(34, 197, 94, 0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (slot.available) {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.background = 'rgba(34, 197, 94, 0.1)'
                  }
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {slot.available ? '🟢' : '🔴'}
                </div>
                <div style={{
                  fontWeight: 'bold',
                  color: slot.available ? 'var(--success)' : 'var(--error)',
                  marginBottom: '0.25rem'
                }}>
                  {slot.time}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.7
                }}>
                  {slot.available ? 'Available' : 'Booked'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, var(--bg), var(--surface))'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            borderRadius: '24px',
            padding: '4rem 2rem',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              color: 'var(--lux-blue)',
              marginBottom: '1rem'
            }}>
              Ready to Transform Your Ideas into Reality?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              Whether you have a clear vision or just a spark of an idea, I'm here to help you build
              something extraordinary. Let's create digital experiences that captivate and inspire.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:your.email@example.com"
                style={{
                  padding: '1.2rem 2.5rem',
                  background: 'linear-gradient(135deg, var(--lux-blue), var(--electric-blue))',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
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
                <span>🚀</span> Let's Get Started
              </a>

              <button
                onClick={() => setActiveTab('contact')}
                style={{
                  padding: '1.2rem 2.5rem',
                  background: 'transparent',
                  color: 'var(--lux-blue)',
                  border: '2px solid var(--lux-blue)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1.1rem',
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
                💬 Start a Chat
              </button>
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
      `}</style>
    </div>
  )
}


