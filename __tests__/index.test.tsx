import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import "@testing-library/jest-dom";
const axios = require("axios");

jest.mock("axios");

const data = {
  count: 10450,
  Message: "Response returned successfully",
  Results: [
    { Make_ID: 1, Make_Name: " BMW" },
    { Make_ID: 2, Make_Name: "Scoda" },
  ],
  SearchCriteria: null,
};

describe("Home", () => {
  it("Should render models for the selected make", async () => {
    render(<Home data={data} />);

    //to select a particular option
    const user = userEvent.setup();

    const select: HTMLElement = screen.getByTestId("select");
    const option: HTMLOptionElement = screen.getByRole("option", {
      name: "BMW",
    });

    const option2: HTMLOptionElement = screen.getByRole("option", {
      name: "Scoda",
    });

    const fetchModelsButton = screen.getByRole("button", {
      name: /Fetch Models/i,
    });

    // select BMW option
    await user.selectOptions(select, option);
    expect(option.selected).toBeTruthy();
    expect(option2.selected).toBeFalsy();

    axios.get.mockResolvedValue({ data: data });

    // Click fetch models button
    user.click(fetchModelsButton);

    // Call API
    const result = await axios.get(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsdormake/bmw?format=json"
    );

    expect(axios.get).toHaveBeenCalled();
    expect(result.data).toBe(data);
  });
});
