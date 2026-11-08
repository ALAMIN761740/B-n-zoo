const DHAKA_TIME_ZONE = 'Asia/Dhaka'
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const toMinutes = (value) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

export function getDhakaParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: DHAKA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hourCycle: 'h23',
  })
  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  )

  return {
    year: Number(parts.year),
    month: Number(parts.month) - 1,
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: parts.weekday,
    weekdayIndex: Math.max(0, WEEKDAYS.indexOf(parts.weekday)),
  }
}

export function getSeason(month, seasons) {
  return seasons.find((season) => season.months.includes(month)) ?? seasons[0]
}

export function getDateKey(parts) {
  const month = String(parts.month + 1).padStart(2, '0')
  const day = String(parts.day).padStart(2, '0')
  return `${parts.year}-${month}-${day}`
}

/**
 * Returns an honest, schedule-based zoo status.
 * It never pretends to know about holiday closures that are not configured.
 */
export function getZooStatus(schedule, now = new Date()) {
  const parts = getDhakaParts(now)
  const season = getSeason(parts.month, schedule.seasons)
  const dateKey = getDateKey(parts)
  const exception = schedule.exceptions?.find((item) => item.date === dateKey) ?? null
  const regularClosed = parts.weekdayIndex === schedule.weeklyClosureDay

  let isClosedDay = regularClosed
  if (exception) isClosedDay = exception.type === 'closed'

  const currentMinutes = parts.hour * 60 + parts.minute
  const openMinutes = toMinutes(season.open)
  const closeMinutes = toMinutes(season.close)

  let status = 'openNow'
  if (isClosedDay) {
    status = 'closedToday'
  } else if (currentMinutes < openMinutes) {
    status = 'opensLater'
  } else if (currentMinutes >= closeMinutes) {
    status = 'closedForToday'
  } else if (currentMinutes >= closeMinutes - 45) {
    status = 'closingSoon'
  }

  return {
    status,
    season,
    exception,
    parts,
    dateKey,
    isClosedDay,
    openMinutes,
    closeMinutes,
    currentMinutes,
    isOpen: status === 'openNow' || status === 'closingSoon',
  }
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

export function toBengaliDigits(value) {
  return String(value).replace(/\d/g, (digit) => BN_DIGITS[Number(digit)])
}

export function formatNumber(value, lang = 'en', options = {}) {
  if (lang === 'bn') return toBengaliDigits(new Intl.NumberFormat('en-US', options).format(value))
  return new Intl.NumberFormat('en-US', options).format(value)
}

export function formatDate(isoDate, lang = 'en', options = {}) {
  const date = isoDate instanceof Date ? isoDate : new Date(`${isoDate}T12:00:00`)
  return new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: DHAKA_TIME_ZONE,
    ...options,
  }).format(date)
}

export function formatWeekday(date = new Date(), lang = 'en') {
  return new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-GB', {
    weekday: 'long',
    timeZone: DHAKA_TIME_ZONE,
  }).format(date)
}

export function formatTime(value, lang = 'en') {
  const [hour, minute] = value.split(':').map(Number)
  const minutes = String(minute).padStart(2, '0')

  if (lang === 'bn') {
    const period =
      hour < 5 ? 'রাত' : hour < 12 ? 'সকাল' : hour < 16 ? 'দুপুর' : hour < 18 ? 'বিকেল' : 'সন্ধ্যা'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    return `${period} ${toBengaliDigits(displayHour)}:${toBengaliDigits(minutes)}`
  }

  const period = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}:${minutes} ${period}`
}

export function formatTimeRange(open, close, lang = 'en') {
  return `${formatTime(open, lang)} – ${formatTime(close, lang)}`
}
