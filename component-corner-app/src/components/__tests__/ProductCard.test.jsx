import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '../ProductCard'

const mockProduct = {
  id: 1,
  name: 'Gaming Laptop',
  price: 999,
  image: '/laptop.jpg',
  description: 'Powerful gaming laptop',
}

const renderProductCard = () => {
  return render(
    <MemoryRouter>
      <ProductCard
        {...mockProduct}
        onAddToCart={vi.fn()}
      />
    </MemoryRouter>
  )
}

describe('ProductCard Component', () => {
  it('renders without crashing', () => {
    renderProductCard()
  })

  it('displays product name and price', () => {
    renderProductCard()

    expect(screen.getByText('Gaming Laptop')).toBeInTheDocument()
    expect(screen.getByText('$999.00')).toBeInTheDocument()
  })

  it('displays the Add to Cart button', () => {
    renderProductCard()

    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument()
  })
it('calls onAddToCart when button is clicked', () => {
  const mockAddToCart = vi.fn()

  render(
    <MemoryRouter>
      <ProductCard
        {...mockProduct}
        onAddToCart={mockAddToCart}
      />
    </MemoryRouter>
  )

  fireEvent.click(
    screen.getByRole('button', { name: /add to cart/i })
  )

  expect(mockAddToCart).toHaveBeenCalledTimes(1)
 })
 
})