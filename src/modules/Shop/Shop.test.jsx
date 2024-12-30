import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react'
import Shop from './Shop'

describe('Shop.jsx', () => {
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