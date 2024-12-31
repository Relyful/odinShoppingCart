import { vi, describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react'
import Shop from './Shop'

const mockData = { products: [
  { id: 1, title: 'Product 1', price: 19.99 }, 
  { id: 2, title: 'Product 2', price: 19.99 },
  { id: 3, title: 'Product 3', price: 19.99 },
  { id: 4, title: 'Product 4', price: 19.99 },
  { id: 5, title: 'Product 5', price: 19.99 },
  { id: 6, title: 'Product 6', price: 19.99 },
  { id: 7, title: 'Product 7', price: 19.99 },
  { id: 8, title: 'Product 8', price: 19.99 },
  { id: 9, title: 'Product 9', price: 19.99 },
  { id: 10, title: 'Product 10', price: 19.99 }
]};

describe('Shop.jsx', () => {

  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  ));


  it('Should render 10 inputs 1 for each item', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Shop />
        </MemoryRouter>
        );
    })

    await waitFor(() => {
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs.length).toBe(10);
    }) 
  });
})