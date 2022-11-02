import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../Card";

describe("Card", () => {
  it("Props passed to card should be displayed on the card", async () => {
    render(<Card Make_ID={23} Model_Name="BMW" Model_ID={12} />);

    expect(screen.getByTitle("heading1").textContent).toEqual("ID: 23");
    expect(screen.getByTitle("heading2").textContent).toEqual("Make: BMW");
    expect(screen.getByTitle("heading3").textContent).toEqual("Model: 12");
  });
});
