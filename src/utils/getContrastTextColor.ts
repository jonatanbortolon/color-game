import { Color } from '@/types/color'

export function getContrastTextColor(backgroundColor: Color) {
  const color = backgroundColor.substring(1, 7)

  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'text-black' : 'text-white'
}
