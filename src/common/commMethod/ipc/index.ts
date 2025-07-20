export function generateChannel(category, commMethod): string {
  if (!category || !commMethod) {
    throw new Error('Category and CommMethod must be provided')
  }

  const firstChar = commMethod.charAt(0)
  const rest = commMethod.slice(1)
  return category + (firstChar.toUpperCase() + rest)
}
