import { Color } from '@/types/color'

export function generateRandomColorHex() {
  const hex = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')

  const color: Color = `#${hex}`

  return color
}
