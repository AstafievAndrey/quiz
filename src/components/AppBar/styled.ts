import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledLogoText = styled(Typography)(({ theme }) => {
  return {
    marginRight: theme.spacing(2),
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };
});
