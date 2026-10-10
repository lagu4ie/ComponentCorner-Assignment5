import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('App State Management and Hooks', () => {

  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
    vi.restoreAllMocks();
  });

  it('renders the App component', () => {
   render(<App />);

    expect(
     screen.getAllByText('ComponentCorner').length
   ).toBeGreaterThan(0);
  });

  it('loads saved cart data from localStorage', async () => {
    const savedCart = [
      {
        id: 1,
        cartId: 'test-123',
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://placehold.co/600x400',
        description: 'Premium noise-cancelling headphones'
      }
    ];

    localStorage.setItem('cart', JSON.stringify(savedCart));

    window.history.pushState({}, '', '/cart');

    render(<App />);

    expect(
      await screen.findByText('Wireless Headphones')
    ).toBeInTheDocument();
  });

  it('saves cart changes to localStorage', async () => {
    window.history.pushState({}, '', '/products');

    render(<App />);

    const addButtons = screen.getAllByRole('button', {
      name: /add to cart/i
    });

    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const savedCart = JSON.parse(
        localStorage.getItem('cart')
      );

      expect(savedCart).toHaveLength(1);
      expect(savedCart[0].name).toBe('Wireless Headphones');
    });
  });

  it('uses useEffect to save initial cart state', async () => {
    const setItemSpy = vi.spyOn(
      Storage.prototype,
      'setItem'
    );

    render(<App />);

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([])
      );
    });
  });

});