import { fireEvent, render, screen } from '@testing-library/react'
import { useTheme } from '../../hooks/useTheme/index'
import { LocalStorageMock } from '../../mocks/localStorage'
import { describe, beforeEach, afterEach, expect, vi, test } from 'vitest'
import { ThemeProvider } from '@/providers/theme'

function CustomTestComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button data-testid="light-button" onClick={() => setTheme('light')}>
        Light theme
      </button>
      <button data-testid="dark-button" onClick={() => setTheme('dark')}>
        Dark theme
      </button>
      <button data-testid="system-button" onClick={() => setTheme('system')}>
        System theme
      </button>
    </div>
  )
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Theme provider', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  render(
    <ThemeProvider>
      <CustomTestComponent />
    </ThemeProvider>,
  )

  test('Initial state is in the returned state', () => {
    const showThemeElement = screen.getByTestId('theme')

    expect(showThemeElement.textContent).not.toBe('light')
    expect(showThemeElement.textContent).not.toBe('dark')
    expect(showThemeElement.textContent).toBe('system')
  })

  test('Update the theme to light', () => {
    const lightThemeButton = screen.getByTestId('light-button')

    fireEvent.click(lightThemeButton)

    const showThemeElement = screen.getByTestId('theme')

    expect(showThemeElement.textContent).toBe('light')
    expect(showThemeElement.textContent).not.toBe('dark')
    expect(showThemeElement.textContent).not.toBe('system')
  })

  test('Update the theme to dark', () => {
    const lightThemeButton = screen.getByTestId('dark-button')

    fireEvent.click(lightThemeButton)

    const showThemeElement = screen.getByTestId('theme')

    expect(showThemeElement.textContent).not.toBe('light')
    expect(showThemeElement.textContent).toBe('dark')
    expect(showThemeElement.textContent).not.toBe('system')
  })
})
