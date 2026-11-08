import { useEffect, useMemo, useState } from 'react'
import { schedule } from '../data/siteData.js'
import { getZooStatus } from '../utils/dateUtils.js'

/**
 * Recalculates the zoo's opening status against Dhaka time once a minute.
 * Public-holiday exceptions only appear if they have been added to
 * `schedule.exceptions` after official verification.
 */
export function useZooStatus() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => getZooStatus(schedule, now), [now])
}
