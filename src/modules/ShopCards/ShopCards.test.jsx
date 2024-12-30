import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopCards from "./ShopCards";

describe('ShopCards', () => {
  it('Should render 2 cards', () => {
    const data = [{title: 'wow', image: '#', id: 0, cartAmmount: 1, price: 10,}, {title: 'wow', image: '#', id: 1, cartAmmount: 1, price: 10,}];

    render(<ShopCards data={data} />);
    const cards = screen.getAllByRole("heading");
    expect(cards.length).toBe(2);
  });

  it('should call onclick when clicked + or -', async () => {
    const data = [{title: 'wow', image: '#', id: 0, cartAmmount: 1, price: 10,}];
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<ShopCards data={data} dataOnChange={onClick}/>);

    const button = screen.getByRole('button',{ name: '+' });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  })
})