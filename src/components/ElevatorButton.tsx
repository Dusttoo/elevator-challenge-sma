import React from "react";
import { Direction } from "../App";

interface ElevatorButtonProps {
  floor: number;
  currentFloor: number;
  direction: Direction | null;
  onClick: (floor: number, floorDirection: Direction) => void;
}

const ElevatorButton: React.FC<ElevatorButtonProps> = ({
  floor,
  currentFloor,
  direction,
  onClick,
}) => {
  const isDisabled = direction !== null || currentFloor === floor;
  const isActive = currentFloor === floor ? "active-button" : "";

  return (
    <button
      onClick={() => onClick(floor, Direction.Up)}
      disabled={isDisabled}
      className={isActive}
    >
      {floor}
    </button>
  );
};

export default ElevatorButton;
