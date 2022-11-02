import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlertMessage from "../AlertMessage";

describe("Alert Messages", () => {
  it("Proper alert messages should be displayed on the screen according to props passed to the component", async () => {
    render(<AlertMessage error="Please select a make" warning={null}/>);

    expect(screen.getByRole("heading").textContent).toEqual("Please select a make");
    
  });
});
