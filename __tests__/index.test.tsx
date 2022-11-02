import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

const data = {
  count: 0,
  Message: "Response returned successfully",
  Results: [],
};

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home data={data} />);

    const heading = screen.getByRole("button", {
      name: /Refresh/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
