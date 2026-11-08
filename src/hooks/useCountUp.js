import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Animates a number once its container becomes visible. */
export function useCountUp(target, { start = false, duration = 1600 } = {}) {
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return undefined
    if (prefersReducedMotion) {
      setValue(target)
      return undefined
    }

    let frame = 0
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, prefersReducedMotion, start, target])

  return value
}
