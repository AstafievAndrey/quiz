import { Grid } from "@mui/material";
import { FC } from "react";
import { Progress as LinearProgress, ProgressProps } from "@/components";

export const Progress: FC<ProgressProps> = (props) => {
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <LinearProgress {...props} />
      </Grid>
    </Grid>
  );
};
