import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeProvider', () => {

  it('applies pink theme initially', async () => {

    render(
      <ThemeProvider
        attribute="class"
        defaultTheme="pink"
      >
        <div>Test Content</div>
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('pink')
    })

  })

})