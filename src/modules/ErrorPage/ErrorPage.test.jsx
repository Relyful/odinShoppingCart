import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ErrorPage from "./ErrorPage";

describe("ErrorPage component", () => {
  it("Renders correct text", () => {
    render(<ErrorPage />);
    expect(screen.getByRole("paragraph").textContent).toMatch(/Oops you're not supposed to be here/i);
  });
});