import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CartItem from '../CartItem'

const mockItem = {
  id: 1,
  cartId: 'test-123',
  name: 'Wireless Headphones',
  price: 99.99,
  quantity: 2
}

describe('CartItem Component', () => {

  it('renders without crashing', () => {
    render(
      <CartItem item={mockItem} onRemove={vi.fn()} />
    )
  })

  it('displays item name and price', () => {
    render(
      <CartItem item={mockItem} onRemove={vi.fn()} />
    )

    expect(
      screen.getByText('Wireless Headphones')
    ).toBeInTheDocument()

    expect(
      screen.getByText('$99.99')
    ).toBeInTheDocument()
  })

  it('displays the Remove button', () => {
    render(
      <CartItem item={mockItem} onRemove={vi.fn()} />
    )

    expect(
      screen.getByRole('button', { name: /remove/i })
    ).toBeInTheDocument()
  })

  it('calls onRemove when Remove button is clicked', () => {
    const mockRemove = vi.fn()

    render(
      <CartItem item={mockItem} onRemove={mockRemove} />
    )

    fireEvent.click(
      screen.getByRole('button', { name: /remove/i })
    )

    expect(mockRemove).toHaveBeenCalledTimes(1)
  })

})