import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '../HomePage'

describe('HomePage Component', () => {
  it('renders without crashing', () => {
    render(<HomePage />)
  })

  it('displays the main page content', () => {
    render(<HomePage />)

    expect(screen.getByText(/products/i)).toBeInTheDocument()
  })
})