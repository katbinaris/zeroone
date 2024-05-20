import Color from 'color'

export const colorToLED = (color: Color) => {
  if (!color) return null
  const l = color.lightness()
  if (l < 0.5) return color.lightness(0)
  const nl = 1 - Math.pow(l / 50 - 1, 4)
  return color.lightness(nl * 35 + 20)
}
