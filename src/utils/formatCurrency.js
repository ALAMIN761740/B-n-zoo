import { formatNumber } from './dateUtils.js'

/**
 * Formats Bangladeshi Taka in a clear, locale-aware way.
 * The zoo's published prices are whole taka amounts.
 */
export function formatCurrency(amount, lang = 'en') {
  if (lang === 'bn') {
    return `${formatNumber(amount, 'bn', { useGrouping: false })} টাকা`
  }
  return `BDT ${formatNumber(amount, 'en', { useGrouping: false })}`
}
