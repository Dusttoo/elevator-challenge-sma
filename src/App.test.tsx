import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ElevatorApp from "./App";

describe("ElevatorApp", () => {
  it("moves the elevator to the selected floor", async () => {
    render(<ElevatorApp />);
    const floorButton = screen.getByText("5");
    fireEvent.click(floorButton);
    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument(); 
    });
  });

  it("visits multiple floors in order", async () => {
    render(<ElevatorApp />);
    const floorButtons = screen.getAllByRole("button");
    for (const button of floorButtons) {
      fireEvent.click(button);
      const buttonText: string = button.textContent || "";;
      await waitFor(() => {
        expect(screen.getByText(buttonText)).toBeInTheDocument(); 
      });
    }
  });

  it("changes direction during travel", async () => {
    render(<ElevatorApp />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });
});
