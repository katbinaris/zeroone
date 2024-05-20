import Color from 'color'

export const colorToLED = (color: Color) => {
  if (!color) return null
  const l = color.value()
  if (l < 1) return color
  const nl = 1 - Math.pow(l / 100 - 1, 2)
  return color.value(nl * 70 + 30)
}
