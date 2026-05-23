import '@testing-library/jest-dom'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'
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

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => (
    <div>{children}</div>
  ),

  DropdownMenuTrigger: ({ children }: any) => (
    <div>{children}</div>
  ),

  DropdownMenuContent: ({ children }: any) => (
    <div>{children}</div>
  ),

  DropdownMenuItem: ({
    children,
    onClick,
  }: any) => (
    <button onClick={onClick}>
      {children}
    </button>
  ),
}))

describe ('ThemeToggle', () => {
    it('changes theme on click', async () => {
        render(
            <ThemeProvider attribute="class" defaultTheme="pink">
                <ThemeToggle />
            </ThemeProvider>
        )
        
        const vintageButton = screen.getByText('Vintage')

        fireEvent.click(vintageButton)

        await waitFor(() => {
        expect(document.documentElement)
            .toHaveClass('vintage')
        })

        const pinkButton = screen.getByText('Pink')

        fireEvent.click(pinkButton)

        await waitFor(() => {
        expect(document.documentElement)
            .toHaveClass('pink')
        })
    })
})