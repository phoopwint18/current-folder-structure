export function formatCurrency(
  amount: number,
  currency = 'SGD',
  locale = 'en-SG',
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
