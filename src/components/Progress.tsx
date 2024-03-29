import { LinearProgress } from "@mui/material";
import { FC } from "react";

export interface ProgressProps {
  answerCount: number;
  count: number;
}
export const Progress: FC<ProgressProps> = ({ answerCount, count }) => {
  const value = (100 / count) * answerCount;

  const getColor = ():
    | "primary"
    | "error"
    | "warning"
    | "inherit"
    | "success" => {
    if (value === 0) {
      return "inherit";
    }
    if (value < 50) {
      return "error";
    }
    if (value < 80) {
      return "warning";
    }
    if (value === 100) {
      return "success";
    }

    return "primary";
  };
  return (
    <LinearProgress color={getColor()} variant="determinate" value={value} />
  );
};
