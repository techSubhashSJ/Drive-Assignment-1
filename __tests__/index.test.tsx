import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import "@testing-library/jest-dom";
const axios = require("axios");

jest.mock("axios");

describe("Home", () => {
  //Test case 1
  it("Home should recieve non-empty data object", async () => {
    axios.get.mockResolvedValue({
      data: {
        Count: 10450,
        Message: "Response returned successfully",
        Results: [
          { Make_ID: 1, Make_Name: " BMW" },
          { Make_ID: 2, Make_Name: "Scoda" },
        ],
        SearchCriteria: null,
      },
    });
    const res = await axios.get(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    );

    expect(res.data).toEqual({
      Count: 10450,
      Message: "Response returned successfully",
      Results: [
        { Make_ID: 1, Make_Name: " BMW" },
        { Make_ID: 2, Make_Name: "Scoda" },
      ],
      SearchCriteria: null,
    });
  });

  //Test case 2
  it("Render a make list in dropdown list", async () => {
    axios.get.mockResolvedValue({
      data: {
        Count: 10450,
        Message: "Response returned successfully",
        Results: [
          { Make_ID: 1, Make_Name: " BMW" },
          { Make_ID: 2, Make_Name: "Scoda" },
        ],
        SearchCriteria: null,
      },
    });
    const res = await axios.get(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    );

    render(<Home data={res.data} />);

    userEvent.click(screen.getByTestId("select"));

    expect(screen.getAllByTestId("select-option")).toBeTruthy;
  });
});
