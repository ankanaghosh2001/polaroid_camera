import React, { JSX } from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Page from '@/app/page'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  }),
}))

jest.mock('framer-motion', () => ({
    motion: new Proxy(
    {},
    {
      get: (_, tag) => {
        return ({ children, ...props }: any) => {
          const Component = tag as keyof JSX.IntrinsicElements

          const filteredProps = { ...props }

          delete filteredProps.initial
          delete filteredProps.animate
          delete filteredProps.transition
          delete filteredProps.whileHover
          delete filteredProps.whileTap
          delete filteredProps.exit

          return (
            <Component {...filteredProps}>
              {children}
            </Component>
          )
        }
      },
    }
  ),
}))

jest.mock('@/components/ShotsDropdown', () => {
  return function MockDropdown({ value, onChange }: any) {
    return (
      <select
        data-testid="shots-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        <option value="4">4</option>
      </select>
    )
  }
})

describe('Page', () => {

  it('Form is visible', () => {
    render(<Page />)
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })

  it('Submit button is initially disabled', () => {
    render(<Page />)
    const submitButton = screen.getByRole('button', { name: /Let's Take Photos!/i })
    expect(submitButton).toBeDisabled()
  })

})