import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("Appointment", () => {
  xit("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    // ...
  });

  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
   });

   it("uses the mock implementation", () => {
     const fn = jest.fn((a, b) => 69);
     fn(1, 2);
     expect(fn).toHaveReturnedWith(69)
   })
});
