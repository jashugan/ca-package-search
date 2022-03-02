import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders search box", () => {
  render(<App />);
  expect(screen.getByLabelText("Enter kit label ID")).toBeInTheDocument();
});

test("renders empty results on load", () => {
  render(<App />);
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});
