import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { gremlinGroveSketch } from '../games/gremlin-grove/sketch'

function GremlinGrove() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const instance = new p5(gremlinGroveSketch, containerRef.current)
    return () => instance.remove()
  }, [])

  return <div className="gremlin-grove-canvas" ref={containerRef} />
}

export default GremlinGrove
