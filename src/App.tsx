import React, { useState, useEffect } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import ElevatorButton from "./components/ElevatorButton";
import "./App.css";

export enum Direction {
  Up = "up",
  Down = "down",
}

interface FloorButton {
  floor: number;
  direction: Direction | null;
}

const ElevatorApp: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [destinationFloors, setDestinationFloors] = useState<FloorButton[]>([]);

  useEffect(() => {
    processQueue();
  }, [destinationFloors]);

  const handleFloorButtonClick = (floor: number, floorDirection: Direction) => {
    const direction = floor > currentFloor ? Direction.Up : Direction.Down;
    setDestinationFloors((prevFloors) => [...prevFloors, { floor, direction }]);
  };

  const processQueue = async () => {
    if (destinationFloors.length === 0) {
      setDirection(null);
      return;
    }

    const nextFloor = destinationFloors[0].floor;
    const nextDirection = destinationFloors[0].direction;
    setDirection(nextDirection);
    await moveElevator(nextFloor);
    setDestinationFloors((prevFloors) => prevFloors.slice(1));
    setCurrentFloor(nextFloor);
  };

  const moveElevator = async (targetFloor: number) => {
    const travelTime = Math.abs(targetFloor - currentFloor) * 1000;
    const delayStep = travelTime / 10;

    const direction = targetFloor > currentFloor ? 1 : -1;

    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, delayStep));
      setCurrentFloor((prevFloor) => {
        const nextFloor = prevFloor + direction;
        return direction > 0
          ? Math.min(nextFloor, targetFloor)
          : Math.max(nextFloor, targetFloor);
      });
    }
  };

  return (
    <div className="App">
      <h1>Elevator App</h1>
      <div className="elevator">
        <div className="floor-buttons">
          {Array.from({ length: 10 }, (_, index) => index + 1).map((floor) => (
            <ElevatorButton
              key={floor}
              floor={floor}
              currentFloor={currentFloor}
              direction={direction}
              onClick={handleFloorButtonClick}
            />
          ))}
        </div>
        <div className="elevator-cabin-container">
          <span className="direction-container">
            {direction === Direction.Up && <ArrowUpward />}
            <p className="current-floor-label">Current Floor: {currentFloor}</p>
            {direction === Direction.Down && <ArrowDownward />}
          </span>

          <div className="elevator-cabin">
            <div
              className="elevator-position"
              style={{ top: `${(10 - currentFloor) * 10}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorApp;
