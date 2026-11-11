export function formatName(value?: string | null, fallback = 'N/A') {
  const text = String(value ?? '').trim()

  if (!text) {
    return fallback
  }

  return text
    .replace(/[_-]+/g, ' ')
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
