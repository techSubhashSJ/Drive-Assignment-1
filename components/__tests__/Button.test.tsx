import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button", () => {
  it("Proper label should be displayed on the button", async () => {
    const { getByRole } = render(
      <Button label="Click Me" classes="" onclick={() => {}} />
    );

    expect(getByRole("button")).toBeInTheDocument();
  });
});
