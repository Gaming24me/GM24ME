import React, {useState} from 'react'

export default function TechCard({name, color, level}){
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="tech-card"
      style={{
        borderTop:`4px solid ${color || '#8b5cf6'}`,
        background:`linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,255,0.9))`,
        position:'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
        <div style={{flex:1}}>
          <div className="tech-name">{name}</div>
          <div className="tech-level">{level}</div>
        </div>
        <div style={{
          width:60,
          height:60,
          borderRadius:15,
          background:`linear-gradient(135deg, ${color || '#8b5cf6'}, ${color || '#8b5cf6'}dd)`,
          boxShadow:`inset 0 -8px 20px rgba(0,0,0,0.1), 0 8px 25px ${color || '#8b5cf6'}30`,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          fontSize:'1.5rem',
          position:'relative',
          overflow:'hidden'
        }}>
          <span style={{
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
            transition: 'filter 0.3s ease'
          }}>
            {name.charAt(0).toUpperCase()}
          </span>
          <div style={{
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            background:`radial-gradient(circle, transparent 30%, ${color || '#8b5cf6'}20)`,
            opacity: isHovered ? 0.3 : 0,
            transition: 'opacity 0.3s ease'
          }}/>
        </div>
      </div>

      {/* Progress bar animation */}
      <div style={{
        position:'absolute',
        bottom:0,
        left:0,
        height:'3px',
        background: color || '#8b5cf6',
        width: isHovered ? '100%' : '0%',
        transition: 'width 0.6s ease',
        borderRadius: '0 0 20px 20px'
      }}/>
    </div>
  )
}


