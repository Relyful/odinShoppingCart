import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import Shop from "./Shop";

const mockData10 = {
  products: [
    { id: 1, title: "Product 1", price: 19.99 },
    { id: 2, title: "Product 2", price: 19.99 },
    { id: 3, title: "Product 3", price: 19.99 },
    { id: 4, title: "Product 4", price: 19.99 },
    { id: 5, title: "Product 5", price: 19.99 },
    { id: 6, title: "Product 6", price: 19.99 },
    { id: 7, title: "Product 7", price: 19.99 },
    { id: 8, title: "Product 8", price: 19.99 },
    { id: 9, title: "Product 9", price: 19.99 },
    { id: 10, title: "Product 10", price: 19.99 },
  ],
};

const mockData = {
  products: [
    {
      id: 1,
      title: "Product 1",
      price: 24.0,
    },
  ],
};

describe("Shop.jsx", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      )
    );
  });

  //Restore mocks after tests
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Render 10 inputs 1 for each fetched item", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData10),
        })
      )
    );

    act(() => {
      render(
        <MemoryRouter>
          <Shop />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const inputs = screen.getAllByRole("spinbutton");
      expect(inputs.length).toBe(10);
    });
  });

  it("Show loading before fetching data", () => {
    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );
    const errText = screen.getByText("Loading...");

    expect(errText).toBeInTheDocument();
  });

  it("Show error when error fetching", async () => {
    //Mock error fetch for thsi test
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      )
    );

    act(() => {
      render(
        <MemoryRouter>
          <Shop />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const errText = screen.getByText(/Error/i);
      expect(errText).toBeInTheDocument();
    });
  });

  it("Raise cart ammount when clicking + button", async () => {
    const user = userEvent.setup();

    act(() => {
      render(
        <MemoryRouter>
          <Shop />
        </MemoryRouter>
      );
    });

    const plus = await waitFor(() => screen.getByRole("button", { name: "+" }));
    const input = await waitFor(() => screen.getByRole("spinbutton"));

    await user.click(plus);
    expect(input.value).toBe("2");
  });

  it('Change cart ammount to typed value', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    const input = await waitFor(() => screen.getByRole('spinbutton'));
    await user.click(input);
    await user.keyboard('{backspace}{5}')
    expect(input.value).toBe('5');
  })
});
