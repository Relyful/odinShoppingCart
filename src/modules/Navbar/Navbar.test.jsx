import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe('Navbar', () => {
  it('Render cart ammount when given value', () => {
    render(
      <MemoryRouter>
        <Navbar cartAmmount={5}/>
      </MemoryRouter>
    );
    const cartAmm = screen.getByText('5');
    expect(cartAmm.textContent).toBe('5');
  });

  it("Doesn't render cart ammount element when prop missing", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const cartAmm = screen.queryByTestId('cartAmmount');

    expect(cartAmm).not.toBeInTheDocument();
  });
})