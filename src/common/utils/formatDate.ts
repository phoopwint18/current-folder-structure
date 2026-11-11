const DATE_LOCALE = 'en-SG'
const EMPTY = '—'

export type DateFormat = 'date' | 'dateTime' | 'time'

const DATE_FORMATS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  date: { dateStyle: 'medium' },
  dateTime: { dateStyle: 'medium', timeStyle: 'short' },
  time: { timeStyle: 'short' },
}

const DATE_FALLBACKS: Record<DateFormat, string> = {
  date: EMPTY,
  dateTime: EMPTY,
  time: '',
}

export function parseDate(value?: string | Date | null) {
  if (value == null || value === '') {
    return undefined
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value
  }

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value)

  return Number.isNaN(date.getTime()) ? undefined : date
}

function formatOrFallback(
  value: string | Date | null | undefined,
  fallback: string,
  options: Intl.DateTimeFormatOptions,
) {
  const date = parseDate(value)

  if (!date) {
    return typeof value === 'string' && value.trim() ? value : fallback
  }

  return new Intl.DateTimeFormat(DATE_LOCALE, options).format(date)
}

export function formatDate(
  value?: string | Date | null,
  format: DateFormat = 'date',
  fallback = DATE_FALLBACKS[format],
) {
  return formatOrFallback(value, fallback, DATE_FORMATS[format])
}

export function formatMonth(month: number, year: number, fallback = EMPTY) {
  if (!month || !year) {
    return fallback
  }

  return formatOrFallback(new Date(year, month - 1, 1), fallback, {
    month: 'long',
    year: 'numeric',
  })
}

export function formatQueryDate(value?: string | Date | null) {
  const date = parseDate(value)

  if (!date) {
    return ''
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
