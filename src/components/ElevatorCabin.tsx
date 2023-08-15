import React from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

interface ElevatorCabinProps {
  currentFloor: number;
  direction: "up" | "down" | null;
}

const ElevatorCabin: React.FC<ElevatorCabinProps> = ({
  currentFloor,
  direction,
}) => {
  return (
    <div className="elevator-cabin-container">
      <span className="direction-container">
        {direction === "up" && <ArrowUpward />}
        <p className="current-floor-label">Current Floor: {currentFloor}</p>
        {direction === "down" && <ArrowDownward />}
      </span>

      <div className="elevator-cabin">
        <div
          className="elevator-position"
          style={{ top: `${(10 - currentFloor) * 10}%` }}
        />
      </div>
    </div>
  );
};

export default ElevatorCabin;
