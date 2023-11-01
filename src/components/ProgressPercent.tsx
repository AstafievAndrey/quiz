import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Progress, ProgressProps } from ".";

export const ProgressPercent: FC<ProgressProps> = ({ count, answerCount }) => {
  return (
    <Box sx={{ display: "block", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <Progress count={count} answerCount={answerCount} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
          >{`${Math.round((100 / count) * answerCount)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
